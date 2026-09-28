require("dotenv").config();
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const express = require("express");
const helmet = require("helmet");
const cookieSession = require("cookie-session");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 3000);
const appRoot = path.resolve(__dirname);
const storageDir = path.resolve(process.env.STORAGE_DIR || path.join(__dirname, "..", "unre-hr-private-storage"));
if (storageDir === appRoot || storageDir.startsWith(`${appRoot}${path.sep}`)) throw new Error("STORAGE_DIR must not be inside the public application directory");
const maxUploadBytes = Number(process.env.MAX_UPLOAD_BYTES || 1048576);
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxUploadBytes, files: 1 },
  fileFilter: (req, file, cb) => cb(null, /^(application\/pdf|image\/(png|jpeg|webp)|application\/(msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))$/i.test(file.mimetype)) });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: isProduction ? { rejectUnauthorized: false } : undefined });
pool.on("error", (err) => console.error("postgres pool error", err));
if (isProduction && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) throw new Error("SESSION_SECRET must be at least 32 characters in production");
if (process.env.TRUST_PROXY === "true") app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "50kb" }));
app.use(cookieSession({
  name: "unre_session", keys: [process.env.SESSION_SECRET || "development-only-change-me"],
  httpOnly: true, sameSite: "lax", secure: process.env.COOKIE_SECURE === "true" || isProduction, maxAge: 8 * 60 * 60 * 1000
}));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
if (process.env.CORS_ORIGIN) app.use((req, res, next) => { res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN); res.setHeader("Access-Control-Allow-Credentials", "true"); res.setHeader("Vary", "Origin"); next(); });

const asyncRoute = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const fail = (status, message) => { const e = new Error(message); e.status = status; return e; };
const clean = (value, max = 5000) => typeof value === "string" ? value.trim().slice(0, max) : value;
const allowed = (value, values) => values.includes(value) ? value : undefined;
async function audit(req, action, resource, resourceId, metadata = {}) {
  if (!req.session.user) return;
  await pool.query("INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,$2,$3,$4,$5,$6)", [req.session.user.id, action, resource, resourceId || null, metadata, req.ip]);
}
function auth(req, res, next) { if (!req.session.user) return next(fail(401, "Authentication required")); next(); }
function roles(...roles) { return (req, res, next) => req.session.user && roles.includes(req.session.user.role) ? next() : next(fail(403, "Insufficient permissions")); }
function csrf(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  // Mounted at /api, so req.path is relative to that prefix.
  if (req.path === "/auth/login") return next();
  if (!req.session.csrf || req.get("x-csrf-token") !== req.session.csrf) return next(fail(403, "Invalid CSRF token"));
  next();
}
app.use("/api", csrf);

app.get("/api/health", asyncRoute(async (req, res) => {
  await pool.query("SELECT 1"); res.json({ ok: true, service: "unre-hr" });
}));
app.post("/api/auth/login", rateLimit({ windowMs: 10 * 60 * 1000, limit: 10, message: { error: "Too many login attempts" } }), asyncRoute(async (req, res) => {
  const email = clean(req.body.email, 320)?.toLowerCase(); const password = String(req.body.password || "");
  if (!email || !password) throw fail(400, "Email and password are required");
  const result = await pool.query("SELECT id,email,password_hash,role,employee_id FROM users WHERE lower(email)=lower($1) AND active=true", [email]);
  const user = result.rows[0]; if (!user || !(await bcrypt.compare(password, user.password_hash))) throw fail(401, "Invalid credentials");
  req.session.user = { id: user.id, email: user.email, role: user.role, employeeId: user.employee_id };
  req.session.csrf = require("crypto").randomBytes(24).toString("hex");
  await audit(req, "login", "user", user.id);
  res.json({ user: req.session.user, csrfToken: req.session.csrf });
}));
app.post("/api/auth/logout", auth, asyncRoute(async (req, res) => { await audit(req, "logout", "user", req.session.user.id); req.session = null; res.status(204).end(); }));
app.get("/api/auth/me", auth, asyncRoute(async (req, res) => res.json({ user: req.session.user, csrfToken: req.session.csrf })));

const resources = {
  employees: { table: "employees", select: "e.*, d.name AS department_name", from: "employees e LEFT JOIN departments d ON d.id=e.department_id", hr: true, owner: "e.id", fields: ["employee_number","name","email","role","employee_type","department_id","status","annual_salary","phone","hired_on"] },
  departments: { table: "departments", select: "d.*", from: "departments d", hr: true, fields: ["name","code","description","location","head_employee_id"] },
  leave: { table: "leave_requests", select: "l.*, e.name AS employee_name, e.email AS employee_email", from: "leave_requests l JOIN employees e ON e.id=l.employee_id", hr: true, owner: "l.employee_id", fields: ["employee_id","leave_type","starts_on","ends_on","note","status"] },
  attendance: { table: "attendance", select: "a.*, e.name AS employee_name", from: "attendance a JOIN employees e ON e.id=a.employee_id", hr: true, owner: "a.employee_id", fields: ["employee_id","attendance_date","status","note"] },
  tasks: { table: "tasks", select: "t.*, e.name AS employee_name, e.department_id", from: "tasks t JOIN employees e ON e.id=t.employee_id", hr: false, owner: "employee_id", fields: ["title","description","employee_id","start_date","due_date","status","priority"] },
  loans: { table: "loans", select: "l.*, e.name AS employee_name", from: "loans l JOIN employees e ON e.id=l.employee_id", hr: true, owner: "l.employee_id", fields: ["employee_id","amount","term_months","purpose","repaid","status"] },
  payroll: { table: "payroll", select: "p.*, e.name AS employee_name, d.name AS department_name", from: "payroll p JOIN employees e ON e.id=p.employee_id LEFT JOIN departments d ON d.id=e.department_id", hr: true, owner: "p.employee_id", fields: ["employee_id","period","pay_date","basic_salary","housing_allowance","bonus","overtime","other_deductions","total_days","working_days","gross","nasfund","paye","loan_recovery","net","status"] },
  jobs: { table: "jobs", select: "j.*, d.name AS department_name", from: "jobs j LEFT JOIN departments d ON d.id=j.department_id", hr: false, fields: ["title","department_id","description","salary_range","closes_on","status","appointment_type","employee_type","location"] },
  applications: { table: "applications", select: "a.*, j.title AS job_title", from: "applications a JOIN jobs j ON j.id=a.job_id", hr: false, owner: "a.employee_id", fields: ["job_id","employee_id","applicant_name","applicant_email","education","experience","statement","status","interview_at","agreed_salary"] },
  documents: { table: "documents", select: "d.*", from: "documents d", hr: false, owner: "d.employee_id", fields: ["employee_id","application_id","kind","filename","content_type","size_bytes"] },
  notifications: { table: "notifications", select: "n.*", from: "notifications n", hr: false, owner: "n.user_id", fields: ["user_id","title","body","read_at"] },
  "audit-logs": { table: "audit_logs", select: "a.*", from: "audit_logs a", hr: true, fields: ["actor_id","action","resource","resource_id","metadata","ip"] }
};
const idPattern = /^[0-9a-f-]{20,}$/i;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const documentMimeTypes = new Set(["application/pdf", "image/png", "image/jpeg", "image/webp", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
const moneyValue = (value, field, { required = false, allowZero = true } = {}) => {
  if (value === undefined && !required) return 0;
  const number = Number(value);
  if (!Number.isFinite(number) || number > 99999999.99 || number < 0 || (!allowZero && number === 0)) {
    throw fail(400, `${field} must be a valid ${allowZero ? "non-negative" : "positive"} amount`);
  }
  return Math.round((number + Number.EPSILON) * 100) / 100;
};
function calculatePaye(monthlySalary) {
  const annual = monthlySalary * 12;
  if (annual <= 17500) return 0;
  const taxable = annual - 17500;
  let annualTax;
  if (taxable <= 25000) annualTax = taxable * 0.22;
  else if (taxable <= 82500) annualTax = 25000 * 0.22 + (taxable - 25000) * 0.3;
  else annualTax = 25000 * 0.22 + 57500 * 0.3 + (taxable - 82500) * 0.35;
  return Math.round((annualTax / 12 + Number.EPSILON) * 100) / 100;
}
function parseSalaryRange(value) {
  const amounts = [...String(value || "").matchAll(/K\s*([\d,.]+)\s*([km]?)/gi)]
    .map((match) => Number(match[1].replace(/,/g, "")) *
      (match[2].toLowerCase() === "m" ? 1000000 : match[2].toLowerCase() === "k" ? 1000 : 1))
    .filter((amount) => Number.isFinite(amount) && amount > 0);
  return amounts.length ? { min: Math.min(...amounts), max: Math.max(...amounts) } : null;
}
app.get("/api/payroll", auth, asyncRoute(async (req, res) => {
  const employeeId = req.session.user.employeeId;
  if (req.session.user.role !== "hr" && !employeeId) throw fail(403, "Staff account is not linked to an employee");
  const params = req.session.user.role === "hr" ? [] : [employeeId];
  const result = await pool.query(
    `SELECT p.*, e.name AS employee_name, d.name AS department_name
     FROM payroll p JOIN employees e ON e.id=p.employee_id
     LEFT JOIN departments d ON d.id=e.department_id
     ${params.length ? "WHERE p.employee_id=$1" : ""}
     ORDER BY p.period DESC, e.name ASC`,
    params
  );
  res.json({ data: result.rows });
}));
app.post("/api/payroll", auth, asyncRoute(async (req, res) => {
  if (req.session.user.role !== "hr") throw fail(403, "HR access required");
  const employeeId = clean(req.body.employee_id, 64);
  const period = clean(req.body.period, 10);
  const payDate = clean(req.body.pay_date, 10);
  const validPayDate = /^\d{4}-\d{2}-\d{2}$/.test(payDate || "") &&
    !Number.isNaN(Date.parse(`${payDate}T00:00:00.000Z`)) &&
    new Date(`${payDate}T00:00:00.000Z`).toISOString().slice(0, 10) === payDate;
  if (!uuidPattern.test(employeeId || "")) throw fail(400, "Choose a valid employee");
  if (!/^\d{4}-\d{2}-01$/.test(period || "") || !validPayDate) {
    throw fail(400, "A valid payroll period and pay date are required");
  }
  const [year, month] = period.slice(0, 7).split("-").map(Number);
  if (month < 1 || month > 12) throw fail(400, "Choose a valid payroll period");
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const basicSalary = moneyValue(req.body.basic_salary, "Basic salary", { required: true, allowZero: false });
  const housingAllowance = moneyValue(req.body.housing_allowance, "Housing allowance");
  const bonus = moneyValue(req.body.bonus, "Bonus");
  const overtime = moneyValue(req.body.overtime, "Overtime");
  const otherDeductions = moneyValue(req.body.other_deductions, "Other deductions");
  const totalDays = Number(req.body.total_days);
  const workingDays = Number(req.body.working_days);
  if (!Number.isInteger(totalDays) || totalDays !== daysInMonth ||
      !Number.isInteger(workingDays) || workingDays < 0 || workingDays > totalDays) {
    throw fail(400, "Payroll day counts do not match the selected period");
  }
  const employeeResult = await pool.query("SELECT id FROM employees WHERE id=$1", [employeeId]);
  if (!employeeResult.rows[0]) throw fail(404, "Employee not found");
  const loans = await pool.query(
    "SELECT amount,repaid,term_months FROM loans WHERE employee_id=$1 AND status='Approved' AND amount>repaid",
    [employeeId]
  );
  const loanRecovery = loans.rows.reduce((sum, item) => {
    const amount = Number(item.amount);
    const remaining = amount - Number(item.repaid || 0);
    const paidMonths = amount ? Math.floor(Number(item.repaid || 0) / (amount / Number(item.term_months))) : 0;
    const monthsLeft = Math.max(1, Number(item.term_months) - paidMonths);
    return sum + remaining / monthsLeft;
  }, 0);
  const gross = Math.round((basicSalary + housingAllowance + bonus + overtime + Number.EPSILON) * 100) / 100;
  const nasfund = Math.round((basicSalary * 0.06 + Number.EPSILON) * 100) / 100;
  const paye = calculatePaye(basicSalary + housingAllowance + bonus + overtime);
  const roundedLoanRecovery = Math.round((loanRecovery + Number.EPSILON) * 100) / 100;
  const net = Math.round((gross - nasfund - paye - roundedLoanRecovery - otherDeductions + Number.EPSILON) * 100) / 100;
  if (net < 0) throw fail(400, "Deductions exceed gross pay");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      `INSERT INTO payroll(employee_id,period,pay_date,basic_salary,housing_allowance,bonus,overtime,other_deductions,
        total_days,working_days,gross,nasfund,paye,loan_recovery,net,status)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'Pending')
       RETURNING *`,
      [employeeId, period, payDate, basicSalary, housingAllowance, bonus, overtime, otherDeductions,
        totalDays, workingDays, gross, nasfund, paye, roundedLoanRecovery, net]
    );
    const payroll = result.rows[0];
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'create','payroll',$2,$3,$4)",
      [req.session.user.id, payroll.id, { employee_id: employeeId, period, status: payroll.status }, req.ip]
    );
    await client.query("COMMIT");
    res.status(201).json(payroll);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    if (error.code === "23505") throw fail(409, "An active payroll entry already exists for this employee and period");
    throw error;
  } finally { client.release(); }
}));
app.patch("/api/payroll/:id", auth, asyncRoute(async (req, res) => {
  if (req.session.user.role !== "hr") throw fail(403, "HR access required");
  if (!idPattern.test(req.params.id)) throw fail(400, "Invalid payroll id");
  if (!["Completed", "Rejected"].includes(req.body.status)) throw fail(400, "Payroll status must be Completed or Rejected");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await client.query(
      "UPDATE payroll SET status=$1 WHERE id=$2 AND status='Pending' RETURNING *",
      [req.body.status, req.params.id]
    );
    if (!result.rows[0]) {
      const current = await client.query("SELECT id FROM payroll WHERE id=$1", [req.params.id]);
      if (!current.rows[0]) throw fail(404, "Payroll entry not found");
      throw fail(409, "Payroll entry has already been finalised");
    }
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','payroll',$2,$3,$4)",
      [req.session.user.id, req.params.id, { status: req.body.status }, req.ip]
    );
    await client.query("COMMIT");
    res.json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
function canAccessDocument(user, document) {
  return user.role === "hr" || (document.employee_id && document.employee_id === user.employeeId);
}
app.post("/api/documents/upload", auth, upload.single("file"), asyncRoute(async (req, res) => {
  if (!req.file || !documentMimeTypes.has(req.file.mimetype)) throw fail(400, "Unsupported or missing document file");
  const employeeId = req.body.employee_id || req.session.user.employeeId;
  if (!employeeId || (req.session.user.role !== "hr" && employeeId !== req.session.user.employeeId)) throw fail(403, "You may only upload your own documents");
  const kind = clean(req.body.kind || "Other", 100);
  await fs.promises.mkdir(storageDir, { recursive: true });
  const storageKey = `${crypto.randomUUID()}${path.extname(req.file.originalname).toLowerCase()}`;
  await fs.promises.writeFile(path.join(storageDir, storageKey), req.file.buffer, { flag: "wx", mode: 0o600 });
  let result;
  if (req.body.replace_id) {
    const existing = await pool.query("SELECT * FROM documents WHERE id=$1", [req.body.replace_id]);
    if (!existing.rows[0] || !canAccessDocument(req.session.user, existing.rows[0])) {
      await fs.promises.unlink(path.join(storageDir, storageKey)).catch(() => {});
      throw fail(403, "You may only replace your own documents");
    }
    result = await pool.query(
      `UPDATE documents SET employee_id=$1,kind=$2,filename=$3,content_type=$4,size_bytes=$5,storage_key=$6,created_by=$7 WHERE id=$8 RETURNING *`,
      [employeeId, kind, path.basename(req.file.originalname), req.file.mimetype, req.file.size, storageKey, req.session.user.id, req.body.replace_id]
    );
    if (existing.rows[0].storage_key) await fs.promises.unlink(path.join(storageDir, existing.rows[0].storage_key)).catch(() => {});
  } else {
    result = await pool.query(
      `INSERT INTO documents(employee_id,application_id,kind,filename,content_type,size_bytes,storage_key,created_by)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [employeeId, req.body.application_id || null, kind, path.basename(req.file.originalname), req.file.mimetype, req.file.size, storageKey, req.session.user.id]
    );
  }
  await audit(req, "upload", "document", result.rows[0].id, { filename: result.rows[0].filename, size: req.file.size });
  res.status(201).json(result.rows[0]);
}));
app.get("/api/documents/:id/download", auth, asyncRoute(async (req, res) => {
  if (!idPattern.test(req.params.id)) throw fail(400, "Invalid id");
  const result = await pool.query("SELECT * FROM documents WHERE id=$1", [req.params.id]);
  const document = result.rows[0];
  if (!document) throw fail(404, "Document not found");
  if (!canAccessDocument(req.session.user, document)) throw fail(403, "You may only access your own documents");
  if (!document.storage_key) throw fail(404, "Document content is unavailable");
  const filePath = path.resolve(storageDir, document.storage_key);
  if (path.dirname(filePath) !== storageDir) throw fail(400, "Invalid storage key");
  try { await fs.promises.access(filePath, fs.constants.R_OK); } catch (_) { throw fail(404, "Document content is unavailable"); }
  await audit(req, "download", "document", document.id);
  res.type(document.content_type || "application/octet-stream");
  res.setHeader("Content-Disposition", `inline; filename="${document.filename.replace(/["\\\r\n]/g, "_")}"`);
  res.sendFile(filePath);
}));
function valuesFor(req, spec) {
  const keys = spec.fields.filter((key) => req.body[key] !== undefined);
  if (!keys.length) throw fail(400, "At least one valid field is required");
  return { keys, values: keys.map((key) => req.body[key] === null ? null : clean(req.body[key])) };
}
// Leave decisions are transactional: the request, employment status, attendance
// markers, and staff notification must never be partially applied.
app.patch("/api/leave/:id", auth, asyncRoute(async (req, res) => {
  if (!idPattern.test(req.params.id)) throw fail(400, "Invalid id");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const current = await client.query(
      "SELECT l.*, e.name AS employee_name FROM leave_requests l JOIN employees e ON e.id=l.employee_id WHERE l.id=$1 FOR UPDATE",
      [req.params.id]
    );
    const leave = current.rows[0];
    if (!leave) throw fail(404, "Leave request not found");
    const isHrUser = req.session.user.role === "hr";
    if (!isHrUser && leave.employee_id !== req.session.user.employeeId) throw fail(403, "You may only update your own leave");
    const fields = isHrUser ? ["leave_type", "starts_on", "ends_on", "note", "status"] : ["leave_type", "starts_on", "ends_on", "note"];
    const keys = fields.filter((key) => req.body[key] !== undefined);
    if (!keys.length) throw fail(400, "At least one permitted field is required");
    if (!isHrUser && req.body.status !== undefined) throw fail(403, "Only HR can approve or reject leave");
    const values = keys.map((key) => clean(req.body[key]));
    const set = keys.map((key, index) => `${key}=$${index + 1}`).join(",");
    const params = [...values, req.params.id];
    if (isHrUser) params.push(req.session.user.id);
    const updated = await client.query(
      `UPDATE leave_requests SET ${set}${isHrUser ? ",reviewed_by=$" + params.length + ",reviewed_at=now()" : ""} WHERE id=$${values.length + 1} RETURNING *`,
      params
    );
    const result = updated.rows[0];
    if (isHrUser && result.status === "Approved") {
      await client.query("UPDATE employees SET status='On Leave', updated_at=now() WHERE id=$1", [result.employee_id]);
      await client.query("DELETE FROM attendance WHERE employee_id=$1 AND attendance_date BETWEEN $2 AND $3 AND (note LIKE 'Approved % leave' OR status='On Leave')", [result.employee_id, result.starts_on, result.ends_on]);
      await client.query(
        `INSERT INTO attendance(employee_id,attendance_date,status,note)
         SELECT $1, days::date, 'On Leave', $4
         FROM generate_series($2::date,$3::date,'1 day') AS days
         ON CONFLICT(employee_id,attendance_date) DO UPDATE SET status='On Leave', note=EXCLUDED.note`,
        [result.employee_id, result.starts_on, result.ends_on, `Approved ${result.leave_type.toLowerCase()} leave`]
      );
    } else if (isHrUser && result.status === "Rejected") {
      const active = await client.query(
        "SELECT 1 FROM leave_requests WHERE employee_id=$1 AND status='Approved' AND starts_on<=current_date AND ends_on>=current_date AND id<>$2 LIMIT 1",
        [result.employee_id, result.id]
      );
      if (!active.rows.length) await client.query("UPDATE employees SET status='Active', updated_at=now() WHERE id=$1 AND status='On Leave'", [result.employee_id]);
      await client.query("DELETE FROM attendance WHERE employee_id=$1 AND attendance_date BETWEEN $2 AND $3 AND note LIKE 'Approved % leave'", [result.employee_id, result.starts_on, result.ends_on]);
    }
    if (isHrUser && (result.status === "Approved" || result.status === "Rejected")) {
      const user = await client.query("SELECT id FROM users WHERE employee_id=$1 AND active=true", [result.employee_id]);
      if (user.rows[0]) await client.query(
        "INSERT INTO notifications(user_id,title,body) VALUES($1,$2,$3)",
        [user.rows[0].id, `Leave ${result.status.toLowerCase()}`, `Your ${result.leave_type.toLowerCase()} leave request was ${result.status.toLowerCase()}.`]
      );
    }
    await client.query("COMMIT");
    await audit(req, "update", "leave", result.id, { fields: keys, status: result.status });
    res.json(result);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
for (const [name, spec] of Object.entries(resources)) {
  if (name === "payroll") continue;
  const hrOnly = ["employees", "departments", "payroll", "audit-logs"];
  app.get(`/api/${name}`, auth, asyncRoute(async (req, res) => {
    if (hrOnly.includes(name) && req.session.user.role !== "hr" && !["employees", "payroll"].includes(name)) throw fail(403, "HR access required");
    const params = []; let where = "";
    if (name === "notifications") {
      params.push(req.session.user.id);
      where = " WHERE n.user_id=$1";
    } else if (req.session.user.role !== "hr" && spec.owner) {
      params.push(name === "notifications" ? req.session.user.id : (req.session.user.employeeId || "00000000-0000-0000-0000-000000000000"));
      where = ` WHERE ${spec.owner}=$1`;
    }
    const limit = Math.min(Number(req.query.limit) || 100, 250); params.push(limit);
    const result = await pool.query(`SELECT ${spec.select} FROM ${spec.from}${where} ORDER BY 1 DESC LIMIT $${params.length}`, params);
    res.json({ data: result.rows });
  }));
  app.post(`/api/${name}`, auth, asyncRoute(async (req, res) => {
    if (hrOnly.includes(name) && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if ((name === "jobs" || name === "notifications" || name === "tasks") && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if (name === "tasks") {
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      if (!uuidPattern.test(clean(req.body.employee_id, 64) || "") ||
          typeof req.body.title !== "string" || !req.body.title.trim() || req.body.title.trim().length > 180 ||
          typeof req.body.description !== "string" || !req.body.description.trim() || req.body.description.trim().length > 2000 ||
          !validDate(clean(req.body.start_date, 10)) || !validDate(clean(req.body.due_date, 10)) ||
          req.body.due_date < req.body.start_date ||
          (req.body.priority !== undefined && !["Low", "Normal", "High"].includes(req.body.priority)) ||
          (req.body.status !== undefined && req.body.status !== "New")) {
        throw fail(400, "A task needs an assignee, title, description, valid dates, and an allowed priority");
      }
    }
    if (name === "applications" && req.session.user.role !== "hr") {
      const jobId = clean(req.body.job_id, 64);
      if (!uuidPattern.test(jobId || "")) throw fail(400, "Choose a valid job posting");
      const job = await pool.query("SELECT id FROM jobs WHERE id=$1 AND status='Open' AND (closes_on IS NULL OR closes_on >= CURRENT_DATE)", [jobId]);
      if (!job.rows[0]) throw fail(409, "This job posting is no longer accepting applications");
      const employee = await pool.query("SELECT name,email FROM employees WHERE id=$1", [req.session.user.employeeId]);
      if (!employee.rows[0]) throw fail(403, "Staff account is not linked to an employee");
      req.body.employee_id = req.session.user.employeeId;
      req.body.applicant_name = employee.rows[0].name;
      req.body.applicant_email = employee.rows[0].email;
      req.body.status = "Pending";
      req.body.agreed_salary = null;
    }
    const { keys, values } = valuesFor(req, spec);
    if (spec.owner && req.session.user.role !== "hr") { const i = keys.indexOf("employee_id"); if (i >= 0) values[i] = req.session.user.employeeId; else { keys.push("employee_id"); values.push(req.session.user.employeeId); } }
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
    const result = await pool.query(`INSERT INTO ${spec.table}(${keys.join(",")}) VALUES(${placeholders}) RETURNING *`, values);
    await audit(req, "create", name, result.rows[0].id, { fields: keys }); res.status(201).json(result.rows[0]);
  }));
  app.patch(`/api/${name}/:id`, auth, asyncRoute(async (req, res) => {
    if (!idPattern.test(req.params.id)) throw fail(400, "Invalid id");
    if (hrOnly.includes(name) && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if (["applications", "jobs"].includes(name) && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if (name === "applications" && req.body.status !== undefined &&
        !["Pending", "Shortlisted", "Interviewed", "Accepted", "Declined", "Contract signed"].includes(req.body.status)) {
      throw fail(400, "Invalid application status");
    }
    if (name === "applications" && req.body.agreed_salary !== undefined) {
      throw fail(400, "Agreed salary can only be set when signing a contract");
    }
    let statusGuard = "";
    let expectedStatus;
    if (name === "tasks") {
      const user = req.session.user;
      if (req.body.status !== undefined && !["New", "In Progress", "Pending", "Done"].includes(req.body.status)) {
        throw fail(400, "Invalid task status");
      }
      if (user.role !== "hr") {
        if (Object.keys(req.body).some((field) => field !== "status") || !req.body.status) {
          throw fail(403, "Staff may only update the status of their assigned tasks");
        }
        const current = await pool.query("SELECT status FROM tasks WHERE id=$1 AND employee_id=$2", [req.params.id, user.employeeId]);
        if (!current.rows[0]) throw fail(404, "Task not found");
        const allowed = {
          New: ["In Progress"], "In Progress": ["Pending", "Done"],
          Pending: ["In Progress", "Done"], Done: []
        };
        if (!allowed[current.rows[0].status]?.includes(req.body.status)) {
          throw fail(409, "Task cannot move from its current status to that status");
        }
        expectedStatus = current.rows[0].status;
      }
    }
    if (name === "applications" && req.body.status !== undefined) {
      if (req.body.status === "Contract signed") throw fail(400, "Sign the employment contract to complete hiring");
      const current = await pool.query("SELECT status FROM applications WHERE id=$1", [req.params.id]);
      if (!current.rows[0]) throw fail(404, "Application not found");
      const transitions = {
        Pending: ["Shortlisted", "Declined"],
        Shortlisted: ["Interviewed", "Declined"],
        Interviewed: ["Accepted", "Declined"]
      };
      const previousStatus = current.rows[0].status;
      if (!transitions[previousStatus]?.includes(req.body.status)) {
        throw fail(409, "Application cannot move from its current stage to that status");
      }
      expectedStatus = previousStatus;
    }
    if (name === "jobs" && req.body.status !== undefined && !["Draft", "Open", "Closed"].includes(req.body.status)) {
      throw fail(400, "Invalid job posting status");
    }
    if (name === "attendance" && req.session.user.role !== "hr") throw fail(403, "Only HR can edit attendance");
    if (name === "loans" && req.session.user.role !== "hr") throw fail(403, "Only HR can edit loans");
    const { keys, values } = valuesFor(req, spec); const params = [...values, req.params.id];
    if (expectedStatus !== undefined) statusGuard = ` AND status=$${values.length + 2}`;
    let guard = ""; if (req.session.user.role !== "hr" && spec.owner) { params.push(req.session.user.employeeId); guard = ` AND ${spec.owner}=$${params.length}`; }
    const set = keys.map((key, i) => `${key}=$${i + 1}`).join(",") + (name === "tasks" ? ",updated_at=now()" : "");
    if (statusGuard) params.push(expectedStatus);
    const result = await pool.query(`UPDATE ${spec.table} SET ${set} WHERE id=$${values.length + 1}${guard}${statusGuard} RETURNING *`, params);
    if (!result.rows[0]) {
      if (name === "applications" && statusGuard) throw fail(409, "Application stage changed; reload and try again");
      if (name === "tasks" && statusGuard) throw fail(409, "Task status changed; reload and try again");
      throw fail(404, "Record not found");
    }
    await audit(req, "update", name, req.params.id, { fields: keys }); res.json(result.rows[0]);
  }));
}
app.post("/api/applications/:id/sign", auth, asyncRoute(async (req, res) => {
  if (req.session.user.role !== "hr") throw fail(403, "HR access required");
  if (!idPattern.test(req.params.id)) throw fail(400, "Invalid application id");
  const salary = moneyValue(req.body.agreed_salary, "Agreed salary", { required: true, allowZero: false });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const found = await client.query(
      `SELECT a.id,a.job_id,a.employee_id,a.status,j.title,j.department_id,j.employee_type,j.salary_range
       FROM applications a JOIN jobs j ON j.id=a.job_id
       WHERE a.id=$1 FOR UPDATE OF a`,
      [req.params.id]
    );
    const app = found.rows[0];
    if (!app) throw fail(404, "Application not found");
    if (app.status !== "Accepted" || !app.employee_id) throw fail(409, "Only an accepted internal applicant can sign a contract");
    const salaryRange = parseSalaryRange(app.salary_range);
    if (salaryRange && (salary < salaryRange.min || salary > salaryRange.max)) {
      throw fail(400, "Agreed salary must be within the advertised salary range");
    }
    await client.query(
      "UPDATE employees SET role=$1,annual_salary=$2,department_id=$3,employee_type=$4,updated_at=now() WHERE id=$5",
      [app.title, salary, app.department_id, app.employee_type || "Staff", app.employee_id]
    );
    const result = await client.query(
      "UPDATE applications SET status='Contract signed',agreed_salary=$1 WHERE id=$2 RETURNING *",
      [salary, app.id]
    );
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','application',$2,$3,$4)",
      [req.session.user.id, app.id, { status: "Contract signed", agreed_salary: salary }, req.ip]
    );
    await client.query("COMMIT");
    res.json({ application: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
// The public API uses the more explicit plural name while keeping /api/leave for the prototype.
app.get("/api/leave-requests", auth, (req, res, next) => { req.url = "/api/leave"; app._router.handle(req, res, next); });
app.post("/api/leave-requests", auth, (req, res, next) => { req.url = "/api/leave"; app._router.handle(req, res, next); });
app.patch("/api/leave-requests/:id", auth, (req, res, next) => { req.url = `/api/leave/${req.params.id}`; app._router.handle(req, res, next); });
app.get("/api/notifications", auth, asyncRoute(async (req, res) => { const r = await pool.query("SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100", [req.session.user.id]); res.json({ data: r.rows }); }));
app.post("/api/notifications/:id/read", auth, asyncRoute(async (req, res) => { const r = await pool.query("UPDATE notifications SET read_at=now() WHERE id=$1 AND user_id=$2 RETURNING *", [req.params.id, req.session.user.id]); if (!r.rows[0]) throw fail(404, "Notification not found"); res.json(r.rows[0]); }));

app.use(express.static(path.join(__dirname)));
app.use((req, res, next) => req.path.startsWith("/api/") ? next(fail(404, "API route not found")) : res.sendFile(path.join(__dirname, "index.html")));
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.code === "LIMIT_FILE_SIZE" ? 413 : err.code === "LIMIT_UNEXPECTED_FILE" ? 400 : (err.status || 500);
  const message = err.code === "LIMIT_FILE_SIZE" ? "Document exceeds the upload size limit" : err.code === "LIMIT_UNEXPECTED_FILE" ? "Unsupported document type" : (err.status ? err.message : "Internal server error");
  res.status(status).json({ error: message });
});

async function seedAdmin() {
  if (!process.env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is required; set it before starting the service");
  const email = (process.env.ADMIN_EMAIL || "hr@unre.ac.pg").trim().toLowerCase();
  if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const department = await client.query(
      `INSERT INTO departments(name,code,description,location) VALUES('Administration','ADMIN','Central university administration and HR.','Administration Block')
       ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const employee = await client.query(
      `INSERT INTO employees(employee_number,name,email,role,employee_type,department_id,status,annual_salary)
       VALUES('UNRE-HR-001','HR Administrator',$1,'HR Administrator','Staff',$2,'Active',0)
       ON CONFLICT(email) DO UPDATE SET department_id=EXCLUDED.department_id,status='Active' RETURNING id`,
      [email, department.rows[0].id]
    );
    await client.query("UPDATE departments SET head_employee_id=$1 WHERE id=$2", [employee.rows[0].id, department.rows[0].id]);
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await client.query(
      `INSERT INTO users(email,password_hash,role,employee_id) VALUES($1,$2,'hr',$3)
       ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash,role='hr',employee_id=EXCLUDED.employee_id,active=true`,
      [email, hash, employee.rows[0].id]
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
if (require.main === module) {
  let server;
  (async () => {
    try {
      await pool.query("SELECT 1");
      await seedAdmin();
      server = app.listen(port, () => console.log(`UNRE HR listening on http://localhost:${port}`));
    } catch (error) {
      console.error(`UNRE HR could not connect to PostgreSQL. Check DATABASE_URL and that migrations are applied: ${error.message}`);
      process.exitCode = 1;
    }
  })();
  const shutdown = async (signal) => {
    if (server) await new Promise((resolve) => server.close(resolve));
    await pool.end();
    console.log(`Received ${signal}; database pool closed.`);
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}
module.exports = { app, pool };
