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
const { validateProductionConfig, postgresSslOptions, refreshSessionUser } = require("./security");
const { scanBuffer } = require("./malware-scanner");
const { seedAdminAccount } = require("./db/seed-admin");

const app = express();
const isProduction = process.env.NODE_ENV === "production";
validateProductionConfig(process.env);
const port = Number(process.env.PORT || 3000);
const appRoot = path.resolve(__dirname);
const storageDir = path.resolve(process.env.STORAGE_DIR || path.join(__dirname, "..", "unre-hr-private-storage"));
if (storageDir === appRoot || storageDir.startsWith(`${appRoot}${path.sep}`)) throw new Error("STORAGE_DIR must not be inside the public application directory");
const maxUploadBytes = Number(process.env.MAX_UPLOAD_BYTES || 1048576);
const clamavConfig = { host: process.env.CLAMAV_HOST || "127.0.0.1", port: Number(process.env.CLAMAV_PORT || 3310) };
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxUploadBytes, files: 1 },
  fileFilter: (req, file, cb) => cb(null, /^(application\/pdf|image\/(png|jpeg|webp)|application\/(msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))$/i.test(file.mimetype)) });
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: postgresSslOptions(process.env) });
pool.on("error", (err) => console.error("postgres pool error", err));
if (isProduction && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) throw new Error("SESSION_SECRET must be at least 32 characters in production");
if (process.env.TRUST_PROXY === "true") app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: { directives: {
  defaultSrc: ["'self'"], scriptSrc: ["'self'"], styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"], imgSrc: ["'self'", "data:", "blob:"],
  connectSrc: ["'self'"], frameSrc: ["'self'", "blob:"], objectSrc: ["'none'"], baseUri: ["'self'"],
  formAction: ["'self'"], upgradeInsecureRequests: isProduction ? [] : null
} } }));
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
async function notifyEmployee(db, employeeId, title, body) {
  if (!employeeId) return;
  await db.query(
    "INSERT INTO notifications(user_id,title,body) SELECT id,$2,$3 FROM users WHERE employee_id=$1 AND active=true",
    [employeeId, title, body]
  );
}
async function notifyHr(db, title, body) {
  await db.query(
    "INSERT INTO notifications(user_id,title,body) SELECT id,$1,$2 FROM users WHERE role='hr' AND active=true",
    [title, body]
  );
}
async function auth(req, res, next) {
  if (!req.session.user) return next(fail(401, "Authentication required"));
  try {
    if (!await refreshSessionUser(pool, req.session)) {
      req.session = null;
      return next(fail(401, "Authentication required"));
    }
    next();
  } catch (error) { next(error); }
}
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
  await pool.query("SELECT 1"); res.json({ ok: true, service: "unre-hr", demoAllowed: !isProduction });
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

const accessRoles = ["hr", "dean", "hod", "vice_chancellor", "staff"];
app.get("/api/users", auth, roles("hr"), asyncRoute(async (req, res) => {
  const result = await pool.query(
    `SELECT u.id,u.email,u.role,u.active,u.employee_id,u.created_at,e.name AS employee_name,e.status AS employee_status
     FROM users u LEFT JOIN employees e ON e.id=u.employee_id ORDER BY u.email`
  );
  res.json({ data: result.rows });
}));
app.patch("/api/users/:id/role", auth, roles("hr"), asyncRoute(async (req, res) => {
  if (!uuidPattern.test(req.params.id) || !accessRoles.includes(req.body.role)) throw fail(400, "Choose a valid user and access role");
  if (req.params.id === req.session.user.id && req.body.role !== "hr") throw fail(409, "You cannot remove your own HR access");
  const updated = await pool.query("UPDATE users SET role=$1 WHERE id=$2 RETURNING id,email,role,active,employee_id", [req.body.role, req.params.id]);
  if (!updated.rows[0]) throw fail(404, "User not found");
  await audit(req, "update", "user", req.params.id, { role: req.body.role });
  res.json(updated.rows[0]);
}));
app.patch("/api/users/:id/active", auth, roles("hr"), asyncRoute(async (req, res) => {
  if (!uuidPattern.test(req.params.id) || typeof req.body.active !== "boolean") throw fail(400, "Choose a valid user and account status");
  if (req.params.id === req.session.user.id && req.body.active === false) throw fail(409, "You cannot deactivate your own account");
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const current = await client.query(
      `SELECT u.id,u.email,u.role,u.active,u.employee_id,e.status AS employee_status
       FROM users u LEFT JOIN employees e ON e.id=u.employee_id WHERE u.id=$1 FOR UPDATE OF u`,
      [req.params.id]
    );
    if (!current.rows[0]) throw fail(404, "User not found");
    if (req.body.active && current.rows[0].employee_status === "Inactive") {
      throw fail(409, "Restore the employee record before reactivating this account");
    }
    const updated = await client.query("UPDATE users SET active=$1 WHERE id=$2 RETURNING id,email,role,active,employee_id", [req.body.active, req.params.id]);
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','user',$2,$3,$4)",
      [req.session.user.id, req.params.id, { active: req.body.active }, req.ip]
    );
    await client.query("COMMIT");
    res.json(updated.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
app.get("/api/reports/workforce", auth, roles("hr", "dean", "hod", "vice_chancellor"), asyncRoute(async (req, res) => {
  const year = String(req.query.year || new Date().getFullYear());
  if (!/^\d{4}$/.test(year) || Number(year) < 1900 || Number(year) > 2200) throw fail(400, "Choose a valid reporting year");
  const start = `${year}-01-01`;
  const end = `${year}-12-31`;
  let departmentId = null;
  if (req.session.user.role === "hod") {
    const linked = await pool.query("SELECT department_id FROM employees WHERE id=$1", [req.session.user.employeeId]);
    departmentId = linked.rows[0]?.department_id;
    if (!departmentId) throw fail(403, "A Head of Department account must be linked to an employee department");
  }
  const demographicFilter = departmentId ? " AND department_id=$1" : "";
  const demographicParams = departmentId ? [departmentId] : [];
  const departmentFilter = departmentId ? " AND e.department_id=$1" : "";
  const turnoverFilter = departmentId ? " AND department_id=$3" : "";
  const turnoverParams = departmentId ? [start, end, departmentId] : [start, end];
  const [gender, equity, departments, turnover] = await Promise.all([
    pool.query(`SELECT COALESCE(NULLIF(BTRIM(gender),''),'Not recorded') AS label,COUNT(*)::int AS count FROM employees WHERE status<>'Inactive' AND terminated_on IS NULL${demographicFilter} GROUP BY 1 ORDER BY 1`, demographicParams),
    pool.query(`SELECT COALESCE(NULLIF(BTRIM(equity_group),''),'Not recorded') AS label,COUNT(*)::int AS count FROM employees WHERE status<>'Inactive' AND terminated_on IS NULL${demographicFilter} GROUP BY 1 ORDER BY 1`, demographicParams),
    pool.query(`SELECT COALESCE(d.name,'Unassigned') AS label,COUNT(*)::int AS count FROM employees e LEFT JOIN departments d ON d.id=e.department_id WHERE e.status<>'Inactive' AND e.terminated_on IS NULL${departmentFilter} GROUP BY 1 ORDER BY 1`, departmentId ? [departmentId] : []),
    pool.query(
      `SELECT
        COUNT(*) FILTER (WHERE (hired_on IS NULL OR hired_on<=$1::date) AND (terminated_on IS NULL OR terminated_on>$1::date))::int AS opening_headcount,
        COUNT(*) FILTER (WHERE (hired_on IS NULL OR hired_on<=$2::date) AND (terminated_on IS NULL OR terminated_on>$2::date))::int AS closing_headcount,
        COUNT(*) FILTER (WHERE hired_on BETWEEN $1::date AND $2::date)::int AS hires,
        COUNT(*) FILTER (WHERE terminated_on BETWEEN $1::date AND $2::date)::int AS departures
      FROM employees WHERE true${turnoverFilter}`, turnoverParams
    )
  ]);
  const snapshot = turnover.rows[0];
  const averageHeadcount = (Number(snapshot.opening_headcount) + Number(snapshot.closing_headcount)) / 2;
  res.json({ year: Number(year), scope: departmentId ? "Department" : "University", gender: gender.rows, equity: equity.rows, departments: departments.rows,
    turnover: { ...snapshot, average_headcount: averageHeadcount,
      rate: averageHeadcount ? Number((Number(snapshot.departures) / averageHeadcount * 100).toFixed(1)) : 0 } });
}));

const resources = {
  employees: { table: "employees", select: "e.*, d.name AS department_name", from: "employees e LEFT JOIN departments d ON d.id=e.department_id", hr: true, owner: "e.id", fields: ["employee_number","name","email","role","employee_type","department_id","status","annual_salary","phone","hired_on","gender","equity_group","terminated_on"] },
  departments: { table: "departments", select: "d.*", from: "departments d", hr: true, fields: ["name","code","description","location","head_employee_id"] },
  leave: { table: "leave_requests", select: "l.*, e.name AS employee_name, e.email AS employee_email", from: "leave_requests l JOIN employees e ON e.id=l.employee_id", hr: true, owner: "l.employee_id", fields: ["employee_id","leave_type","starts_on","ends_on","note","status"] },
  attendance: { table: "attendance", select: "a.*, e.name AS employee_name", from: "attendance a JOIN employees e ON e.id=a.employee_id", hr: true, owner: "a.employee_id", fields: ["employee_id","attendance_date","status","note"] },
  tasks: { table: "tasks", select: "t.*, e.name AS employee_name, e.department_id", from: "tasks t JOIN employees e ON e.id=t.employee_id", hr: false, owner: "employee_id", fields: ["title","description","employee_id","start_date","due_date","status","priority"] },
  loans: { table: "loans", select: "l.*, e.name AS employee_name", from: "loans l JOIN employees e ON e.id=l.employee_id", hr: true, owner: "l.employee_id", fields: ["employee_id","loan_type","amount","term_months","purpose","repaid","status"] },
  payroll: { table: "payroll", select: "p.*, e.name AS employee_name, d.name AS department_name", from: "payroll p JOIN employees e ON e.id=p.employee_id LEFT JOIN departments d ON d.id=e.department_id", hr: true, owner: "p.employee_id", fields: ["employee_id","period","pay_date","basic_salary","housing_allowance","bonus","overtime","other_deductions","total_days","working_days","gross","nasfund","paye","loan_recovery","net","status"] },
  jobs: { table: "jobs", select: "j.*, d.name AS department_name", from: "jobs j LEFT JOIN departments d ON d.id=j.department_id", hr: false, fields: ["title","department_id","description","salary_range","closes_on","status","appointment_type","employee_type","location"] },
  applications: { table: "applications", select: "a.*, j.title AS job_title", from: "applications a JOIN jobs j ON j.id=a.job_id", hr: false, owner: "a.employee_id", fields: ["job_id","employee_id","applicant_name","applicant_email","education","experience","statement","status","interview_at","agreed_salary"] },
  documents: { table: "documents", select: "d.*", from: "documents d", hr: false, owner: "d.employee_id", fields: ["employee_id","application_id","kind","filename","content_type","size_bytes"] },
  notifications: { table: "notifications", select: "n.*", from: "notifications n", hr: false, owner: "n.user_id", fields: ["user_id","title","body","read_at"] },
  "audit-logs": { table: "audit_logs", select: "a.*,u.email AS actor_email", from: "audit_logs a LEFT JOIN users u ON u.id=a.actor_id", hr: true, fields: ["actor_id","action","resource","resource_id","metadata","ip"] },
  contracts: { table: "contracts", select: "c.*,e.name AS employee_name,d.name AS department_name,doc.filename AS document_name", from: "contracts c JOIN employees e ON e.id=c.employee_id LEFT JOIN departments d ON d.id=e.department_id LEFT JOIN documents doc ON doc.id=c.document_id", hr: true, fields: ["employee_id","contract_type","starts_on","ends_on","status","work_permit_number","work_permit_expires_on","visa_type","visa_expires_on","document_id","notes"] },
  roster: { table: "roster_shifts", select: "r.*,e.name AS employee_name", from: "roster_shifts r JOIN employees e ON e.id=r.employee_id", hr: true, fields: ["employee_id","starts_on","ends_on","start_time","end_time","break_minutes"] },
  overtime: { table: "overtime_entries", select: "o.*,e.name AS employee_name", from: "overtime_entries o JOIN employees e ON e.id=o.employee_id", hr: true, fields: ["employee_id","overtime_date","hours","multiplier","reason"] }
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
  const employeeResult = await pool.query("SELECT id,annual_salary FROM employees WHERE id=$1", [employeeId]);
  if (!employeeResult.rows[0]) throw fail(404, "Employee not found");
  const overtimeEntries = await pool.query(
    "SELECT hours,multiplier FROM overtime_entries WHERE employee_id=$1 AND overtime_date >= $2::date AND overtime_date < ($2::date + INTERVAL '1 month')",
    [employeeId, period]
  );
  const hourlyRate = Number(employeeResult.rows[0].annual_salary) / 12 / 173.33;
  const calculatedOvertime = Math.round((overtimeEntries.rows.reduce((sum, entry) =>
    sum + Number(entry.hours) * hourlyRate * Number(entry.multiplier), 0) + Number.EPSILON) * 100) / 100;
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
  const gross = Math.round((basicSalary + housingAllowance + bonus + calculatedOvertime + Number.EPSILON) * 100) / 100;
  const nasfund = Math.round((basicSalary * 0.06 + Number.EPSILON) * 100) / 100;
  const paye = calculatePaye(basicSalary + housingAllowance + bonus + calculatedOvertime);
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
      [employeeId, period, payDate, basicSalary, housingAllowance, bonus, calculatedOvertime, otherDeductions,
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
    if (req.body.status === "Completed" && Number(result.rows[0].loan_recovery) > 0) {
      const loans = await client.query(
        "SELECT id,amount,repaid,term_months FROM loans WHERE employee_id=$1 AND status='Approved' AND amount>repaid ORDER BY created_at,id FOR UPDATE",
        [result.rows[0].employee_id]
      );
      let remainingRecovery = Number(result.rows[0].loan_recovery);
      for (const loan of loans.rows) {
        if (remainingRecovery <= 0) break;
        const amount = Number(loan.amount);
        const repaid = Number(loan.repaid || 0);
        const balance = amount - repaid;
        const paidMonths = Math.floor(repaid / (amount / Number(loan.term_months)));
        const monthsLeft = Math.max(1, Number(loan.term_months) - paidMonths);
        const installment = Math.round((balance / monthsLeft + Number.EPSILON) * 100) / 100;
        const applied = Math.min(balance, installment, remainingRecovery);
        const nextRepaid = Math.round((repaid + applied + Number.EPSILON) * 100) / 100;
        await client.query("UPDATE loans SET repaid=$1,status=$2 WHERE id=$3", [
          nextRepaid, nextRepaid >= amount ? "Paid" : "Approved", loan.id
        ]);
        remainingRecovery = Math.max(0, Math.round((remainingRecovery - applied + Number.EPSILON) * 100) / 100);
      }
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
  if (!req.file || !documentMimeTypes.has(req.file.mimetype) || req.file.size === 0) throw fail(400, "Unsupported, empty, or missing document file");
  const employeeId = req.body.employee_id || req.session.user.employeeId;
  if (!employeeId || (req.session.user.role !== "hr" && employeeId !== req.session.user.employeeId)) throw fail(403, "You may only upload your own documents");
  const kind = clean(req.body.kind || "Other", 100);
  const filename = path.basename(req.file.originalname).slice(0, 255);
  const extension = {
    "application/pdf": ".pdf", "image/png": ".png", "image/jpeg": ".jpg", "image/webp": ".webp",
    "application/msword": ".doc", "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
  }[req.file.mimetype];
  let previousDocument;
  if (req.body.replace_id) {
    if (!idPattern.test(req.body.replace_id)) throw fail(400, "Invalid document id");
    const existing = await pool.query("SELECT * FROM documents WHERE id=$1", [req.body.replace_id]);
    previousDocument = existing.rows[0];
    if (!previousDocument) throw fail(404, "Document not found");
    if (!canAccessDocument(req.session.user, previousDocument)) throw fail(403, "You may only replace your own documents");
  }

  const quarantineDir = path.join(storageDir, ".quarantine");
  const quarantinePath = path.join(quarantineDir, `${crypto.randomUUID()}.upload`);
  let storageKey;
  let storagePath;
  let promoted = false;
  let committed = false;
  let client;
  try {
    await fs.promises.mkdir(quarantineDir, { recursive: true, mode: 0o700 });
    await fs.promises.writeFile(quarantinePath, req.file.buffer, { flag: "wx", mode: 0o600 });
    let scan;
    try { scan = await scanBuffer(req.file.buffer, clamavConfig); }
    catch (error) {
      console.error("ClamAV scan failed", error.message);
      throw fail(503, "Document scanner unavailable; upload was not accepted");
    }
    if (!scan.clean) throw fail(422, "Malware detected; document was rejected");

    await fs.promises.mkdir(storageDir, { recursive: true, mode: 0o700 });
    storageKey = `${crypto.randomUUID()}${extension}`;
    storagePath = path.join(storageDir, storageKey);
    await fs.promises.rename(quarantinePath, storagePath);
    promoted = true;

    client = await pool.connect();
    await client.query("BEGIN");
    let result;
    if (req.body.replace_id) {
      const current = await client.query("SELECT * FROM documents WHERE id=$1 FOR UPDATE", [req.body.replace_id]);
      if (!current.rows[0]) throw fail(404, "Document not found");
      if (!canAccessDocument(req.session.user, current.rows[0])) throw fail(403, "You may only replace your own documents");
      previousDocument = current.rows[0];
      result = await client.query(
        `UPDATE documents SET employee_id=$1,kind=$2,filename=$3,content_type=$4,size_bytes=$5,storage_key=$6,created_by=$7 WHERE id=$8 RETURNING *`,
        [employeeId, kind, filename, req.file.mimetype, req.file.size, storageKey, req.session.user.id, req.body.replace_id]
      );
    } else {
      result = await client.query(
        `INSERT INTO documents(employee_id,application_id,kind,filename,content_type,size_bytes,storage_key,created_by)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [employeeId, req.body.application_id || null, kind, filename, req.file.mimetype, req.file.size, storageKey, req.session.user.id]
      );
    }
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'upload','document',$2,$3,$4)",
      [req.session.user.id, result.rows[0].id, { filename, size: req.file.size }, req.ip]
    );
    await client.query("COMMIT");
    committed = true;
    if (previousDocument?.storage_key) {
      const previousPath = path.resolve(storageDir, previousDocument.storage_key);
      if (path.dirname(previousPath) === storageDir) await fs.promises.unlink(previousPath).catch(() => {});
    }
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (client) await client.query("ROLLBACK").catch(() => {});
    if (promoted && !committed) await fs.promises.unlink(storagePath).catch(() => {});
    throw error;
  } finally {
    if (client) client.release();
    await fs.promises.unlink(quarantinePath).catch(() => {});
  }
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
    if (!isHrUser) throw fail(403, "Only HR can update a submitted leave request");
    const fields = ["status"];
    const keys = fields.filter((key) => req.body[key] !== undefined);
    if (!keys.length) throw fail(400, "At least one permitted field is required");
    if (leave.status !== "Pending" || !["Approved", "Rejected"].includes(req.body.status)) {
      throw fail(409, "Only pending leave requests can be approved or rejected");
    }
    const values = keys.map((key) => clean(req.body[key]));
    const set = keys.map((key, index) => `${key}=$${index + 1}`).join(",");
    const params = [...values, req.params.id];
    params.push(req.session.user.id);
    const updated = await client.query(
      `UPDATE leave_requests SET ${set},reviewed_by=$${params.length},reviewed_at=now() WHERE id=$${values.length + 1} AND status='Pending' RETURNING *`,
      params
    );
    const result = updated.rows[0];
    if (!result) throw fail(409, "Leave request was already reviewed; reload and try again");
    if (result.status === "Approved") {
      await client.query(
        `UPDATE employees SET status=CASE WHEN EXISTS (
           SELECT 1 FROM leave_requests WHERE employee_id=$1 AND status='Approved' AND starts_on<=current_date AND ends_on>=current_date
         ) THEN 'On Leave' ELSE 'Active' END, updated_at=now()
         WHERE id=$1 AND status<>'Inactive'`,
        [result.employee_id]
      );
      await client.query("DELETE FROM attendance WHERE employee_id=$1 AND attendance_date BETWEEN $2 AND $3 AND note LIKE 'Approved % leave'", [result.employee_id, result.starts_on, result.ends_on]);
      await client.query(
        `INSERT INTO attendance(employee_id,attendance_date,status,note)
         SELECT $1, days::date, 'On Leave', $4
         FROM generate_series($2::date,$3::date,'1 day') AS days
         ON CONFLICT(employee_id,attendance_date) DO NOTHING`,
        [result.employee_id, result.starts_on, result.ends_on, `Approved ${result.leave_type.toLowerCase()} leave`]
      );
    } else if (result.status === "Rejected") {
      const active = await client.query(
        "SELECT 1 FROM leave_requests WHERE employee_id=$1 AND status='Approved' AND starts_on<=current_date AND ends_on>=current_date AND id<>$2 LIMIT 1",
        [result.employee_id, result.id]
      );
      if (!active.rows.length) await client.query("UPDATE employees SET status='Active', updated_at=now() WHERE id=$1 AND status='On Leave'", [result.employee_id]);
      await client.query("DELETE FROM attendance WHERE employee_id=$1 AND attendance_date BETWEEN $2 AND $3 AND note LIKE 'Approved % leave'", [result.employee_id, result.starts_on, result.ends_on]);
    }
    if (result.status === "Approved" || result.status === "Rejected") {
      const user = await client.query("SELECT id FROM users WHERE employee_id=$1 AND active=true", [result.employee_id]);
      if (user.rows[0]) await client.query(
        "INSERT INTO notifications(user_id,title,body) VALUES($1,$2,$3)",
        [user.rows[0].id, `Leave ${result.status.toLowerCase()}`, `Your ${result.leave_type.toLowerCase()} leave request was ${result.status.toLowerCase()}.`]
      );
    }
    await client.query("COMMIT");
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','leave',$2,$3,$4)",
      [req.session.user.id, result.id, { fields: keys, status: result.status }, req.ip]
    );
    res.json(result);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
for (const [name, spec] of Object.entries(resources)) {
  if (name === "payroll") continue;
  const hrOnly = ["employees", "departments", "payroll", "audit-logs", "contracts", "roster", "overtime"];
  app.get(`/api/${name}`, auth, asyncRoute(async (req, res) => {
    if (hrOnly.includes(name) && req.session.user.role !== "hr" && !["employees", "payroll"].includes(name)) throw fail(403, "HR access required");
    if (name === "employees" && req.session.user.role === "hr") {
      await pool.query(
        `UPDATE employees e SET status=CASE WHEN EXISTS (
           SELECT 1 FROM leave_requests l WHERE l.employee_id=e.id AND l.status='Approved' AND l.starts_on<=current_date AND l.ends_on>=current_date
         ) THEN 'On Leave' ELSE 'Active' END, updated_at=now()
         WHERE e.status<>'Inactive' AND (e.status='On Leave' OR EXISTS (
           SELECT 1 FROM leave_requests l WHERE l.employee_id=e.id AND l.status='Approved' AND l.starts_on<=current_date AND l.ends_on>=current_date
         ))`
      );
    }
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
    if (name === "leave") {
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      const employeeId = req.session.user.role === "hr" ? clean(req.body.employee_id, 64) : req.session.user.employeeId;
      if (!uuidPattern.test(employeeId || "") || !["Annual", "Sick", "Personal", "Emergency", "Research"].includes(req.body.leave_type) ||
          !validDate(req.body.starts_on) || !validDate(req.body.ends_on) || req.body.ends_on < req.body.starts_on) {
        throw fail(400, "A leave request needs an employee, leave type, and valid date range");
      }
      const employee = await pool.query("SELECT id FROM employees WHERE id=$1 AND status<>'Inactive'", [employeeId]);
      if (!employee.rows[0]) throw fail(404, "Active employee not found");
      req.body.employee_id = employeeId;
      req.body.loan_type = ["Education", "Housing", "Emergency", "Salary advance"].includes(req.body.loan_type) ? req.body.loan_type : "Staff loan";
      req.body.status = "Pending";
    }
    if (name === "loans") {
      const employeeId = req.session.user.role === "hr" ? clean(req.body.employee_id, 64) : req.session.user.employeeId;
      const amount = moneyValue(req.body.amount, "Loan amount", { required: true, allowZero: false });
      const termMonths = Number(req.body.term_months);
      if (!uuidPattern.test(employeeId || "") || amount < 500 || !Number.isInteger(termMonths) || termMonths < 1 || termMonths > 36) {
        throw fail(400, "A loan needs a valid employee, amount of at least K500, and a term from 1 to 36 months");
      }
      const employee = await pool.query("SELECT annual_salary FROM employees WHERE id=$1 AND status<>'Inactive'", [employeeId]);
      if (!employee.rows[0]) throw fail(404, "Active employee not found");
      const active = await pool.query("SELECT COALESCE(SUM(amount-repaid),0) AS outstanding FROM loans WHERE employee_id=$1 AND status='Approved' AND amount>repaid", [employeeId]);
      if (Number(active.rows[0].outstanding) > 0) throw fail(409, "Employee already has an outstanding staff loan");
      if (amount > Number(employee.rows[0].annual_salary) * 0.4) throw fail(400, "Loan exceeds 40% of annual salary");
      req.body.employee_id = employeeId;
      req.body.status = "Pending";
      req.body.repaid = 0;
    }
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
    if (name === "jobs") {
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      const title = clean(req.body.title, 180);
      const description = clean(req.body.description, 5000);
      const closesOn = clean(req.body.closes_on, 10);
      if (!title || !description || !parseSalaryRange(req.body.salary_range) || !validDate(closesOn) || closesOn < new Date().toISOString().slice(0, 10) ||
          (req.body.appointment_type !== undefined && !["Full-Time", "Part-Time", "Contract", "Tenure-Track"].includes(req.body.appointment_type)) ||
          (req.body.employee_type !== undefined && !["Faculty", "Staff", "Adjunct", "Research"].includes(req.body.employee_type))) {
        throw fail(400, "A job draft needs a title, description, salary range, closing date, and valid appointment details");
      }
      req.body.title = title;
      req.body.description = description;
      req.body.closes_on = closesOn;
      req.body.status = "Draft";
    }
    if (name === "roster") {
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      const validTime = (value) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value || "");
      const employeeId = clean(req.body.employee_id, 64);
      if (!uuidPattern.test(employeeId || "") || !validDate(req.body.starts_on) || !validDate(req.body.ends_on) ||
          req.body.ends_on < req.body.starts_on || !validTime(req.body.start_time) || !validTime(req.body.end_time) ||
          req.body.start_time === req.body.end_time || !Number.isInteger(Number(req.body.break_minutes)) || Number(req.body.break_minutes) < 0) {
        throw fail(400, "A roster shift needs a valid employee, dates, times, and break length");
      }
      const employee = await pool.query("SELECT employee_type,role,status FROM employees WHERE id=$1", [employeeId]);
      if (!employee.rows[0] || employee.rows[0].status === "Inactive") throw fail(404, "Active employee not found");
      const teaching = employee.rows[0].employee_type === "Faculty" || /lecturer|tutor|professor|academic/i.test(employee.rows[0].role || "");
      let expectedEnd;
      if (teaching) {
        const [year, month, day] = req.body.starts_on.split("-").map(Number);
        const targetMonth = new Date(Date.UTC(year, month - 1 + 6, 1));
        const lastDay = new Date(Date.UTC(targetMonth.getUTCFullYear(), targetMonth.getUTCMonth() + 1, 0)).getUTCDate();
        const anniversary = new Date(Date.UTC(targetMonth.getUTCFullYear(), targetMonth.getUTCMonth(), Math.min(day, lastDay)));
        anniversary.setUTCDate(anniversary.getUTCDate() - 1);
        expectedEnd = anniversary.toISOString().slice(0, 10);
      } else {
        const end = new Date(`${req.body.starts_on}T00:00:00.000Z`);
        end.setUTCDate(end.getUTCDate() + 13);
        expectedEnd = end.toISOString().slice(0, 10);
      }
      if (req.body.ends_on !== expectedEnd) throw fail(400, teaching
        ? "Teaching rosters must cover six calendar months."
        : "This employee's roster must cover exactly two weeks.");
    }
    if (name === "overtime") {
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      const hours = Number(req.body.hours);
      if (!uuidPattern.test(clean(req.body.employee_id, 64) || "") || !validDate(req.body.overtime_date) ||
          !Number.isFinite(hours) || hours <= 0 || hours > 24 || Math.round(hours * 4) !== hours * 4 ||
          ![1.5, 2].includes(Number(req.body.multiplier)) || !clean(req.body.reason, 500)) {
        throw fail(400, "Overtime needs a valid employee, date, quarter-hour amount, multiplier, and reason");
      }
    }
    if (name === "contracts") {
      const dateIsValid = (value) => value === null || value === undefined || value === "" ||
        (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value);
        if (!uuidPattern.test(clean(req.body.employee_id, 64) || "") || !clean(req.body.contract_type, 120) ||
          !/^\d{4}-\d{2}-\d{2}$/.test(req.body.starts_on || "") || !dateIsValid(req.body.starts_on) || !dateIsValid(req.body.ends_on) ||
          !dateIsValid(req.body.work_permit_expires_on) || !dateIsValid(req.body.visa_expires_on) ||
          (req.body.ends_on && req.body.ends_on < req.body.starts_on) ||
          (req.body.status !== undefined && !["Active", "Renewing", "Ended"].includes(req.body.status))) {
        throw fail(400, "A contract needs a valid employee, type, dates, and status");
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
    if (name === "overtime") { keys.push("created_by"); values.push(req.session.user.id); }
    if (name === "contracts") keys.forEach((key, index) => {
      if (values[index] === "" && ["ends_on", "work_permit_number", "work_permit_expires_on", "visa_type", "visa_expires_on", "document_id", "notes"].includes(key)) values[index] = null;
    });
    if (spec.owner && req.session.user.role !== "hr") { const i = keys.indexOf("employee_id"); if (i >= 0) values[i] = req.session.user.employeeId; else { keys.push("employee_id"); values.push(req.session.user.employeeId); } }
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(",");
    if (name === "applications" && req.session.user.role !== "hr") {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await client.query(`INSERT INTO ${spec.table}(${keys.join(",")}) VALUES(${placeholders}) RETURNING *`, values);
        const job = await client.query("SELECT title FROM jobs WHERE id=$1", [result.rows[0].job_id]);
        await notifyHr(client, "New job application", `${result.rows[0].applicant_name} applied for ${job.rows[0]?.title || "an internal job"}.`);
        await client.query("INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'create',$2,$3,$4,$5)",
          [req.session.user.id, name, result.rows[0].id, { fields: keys }, req.ip]);
        await client.query("COMMIT");
        res.status(201).json(result.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        if (error.code === "23505") throw fail(409, "You have already applied for this job");
        throw error;
      } finally { client.release(); }
      return;
    }
    const result = await pool.query(`INSERT INTO ${spec.table}(${keys.join(",")}) VALUES(${placeholders}) RETURNING *`, values);
    await audit(req, "create", name, result.rows[0].id, { fields: keys }); res.status(201).json(result.rows[0]);
  }));
  app.patch(`/api/${name}/:id`, auth, asyncRoute(async (req, res) => {
    if (!idPattern.test(req.params.id)) throw fail(400, "Invalid id");
    if (hrOnly.includes(name) && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if (["applications", "jobs"].includes(name) && req.session.user.role !== "hr") throw fail(403, "HR access required");
    if (name === "loans") {
      if (req.session.user.role !== "hr") throw fail(403, "Only HR can review loans");
      if (Object.keys(req.body).some((field) => field !== "status") || !["Approved", "Rejected"].includes(req.body.status)) {
        throw fail(400, "A loan review can only approve or reject an application");
      }
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const found = await client.query("SELECT id,employee_id,amount,status FROM loans WHERE id=$1 FOR UPDATE", [req.params.id]);
        const loan = found.rows[0];
        if (!loan) throw fail(404, "Loan application not found");
        if (loan.status !== "Pending") throw fail(409, "Only pending loan applications can be reviewed");
        if (req.body.status === "Approved") {
          const employee = await client.query("SELECT annual_salary,status FROM employees WHERE id=$1 FOR UPDATE", [loan.employee_id]);
          if (!employee.rows[0] || employee.rows[0].status === "Inactive") throw fail(409, "Inactive employees cannot receive a loan");
          const active = await client.query("SELECT COALESCE(SUM(amount-repaid),0) AS outstanding FROM loans WHERE employee_id=$1 AND status='Approved' AND amount>repaid", [loan.employee_id]);
          if (Number(active.rows[0].outstanding) > 0) throw fail(409, "Employee already has an outstanding staff loan");
          if (Number(loan.amount) > Number(employee.rows[0].annual_salary) * 0.4) throw fail(409, "Loan exceeds 40% of annual salary");
        }
        const result = await client.query(
          "UPDATE loans SET status=$1,reviewed_by=$2,reviewed_at=now() WHERE id=$3 AND status='Pending' RETURNING *",
          [req.body.status, req.session.user.id, req.params.id]
        );
        await client.query(
          "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','loans',$2,$3,$4)",
          [req.session.user.id, req.params.id, { status: req.body.status }, req.ip]
        );
        await client.query("COMMIT");
        res.json(result.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        throw error;
      } finally { client.release(); }
      return;
    }
    if (name === "applications" && req.body.status !== undefined &&
        !["Pending", "Shortlisted", "Interviewed", "Accepted", "Declined", "Contract signed"].includes(req.body.status)) {
      throw fail(400, "Invalid application status");
    }
    if (name === "applications" && req.body.agreed_salary !== undefined) {
      throw fail(400, "Agreed salary can only be set when signing a contract");
    }
    let statusGuard = "";
    let expectedStatus;
    let applicationNotification;
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
      const current = await pool.query(
        "SELECT a.status,a.employee_id,j.title AS job_title FROM applications a JOIN jobs j ON j.id=a.job_id WHERE a.id=$1",
        [req.params.id]
      );
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
      applicationNotification = {
        employeeId: current.rows[0].employee_id,
        title: `Job application ${req.body.status.toLowerCase()}`,
        body: `Your application for ${current.rows[0].job_title} was ${req.body.status.toLowerCase()}.`
      };
      expectedStatus = previousStatus;
    }
    if (name === "jobs" && (req.body.status !== undefined || req.body.closes_on !== undefined)) {
      const current = await pool.query("SELECT status,closes_on FROM jobs WHERE id=$1", [req.params.id]);
      if (!current.rows[0]) throw fail(404, "Job posting not found");
      const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || "") &&
        !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) &&
        new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value;
      const closesOn = req.body.closes_on ?? current.rows[0].closes_on?.toISOString?.().slice(0, 10) ?? current.rows[0].closes_on;
      if (req.body.status !== undefined) {
        const transitions = { Draft: ["Open"], Open: ["Closed"], Closed: ["Open"] };
        if (!transitions[current.rows[0].status]?.includes(req.body.status)) throw fail(409, "Job posting cannot move from its current status to that status");
      }
      if (req.body.closes_on !== undefined && !validDate(req.body.closes_on)) throw fail(400, "Closing date must be a valid calendar date");
      if ((req.body.status === "Open" || current.rows[0].status === "Open") && closesOn && closesOn < new Date().toISOString().slice(0, 10)) {
        throw fail(409, "A posting with a past closing date cannot accept applications");
      }
    }
    if (name === "contracts") {
      const dateIsValid = (value) => value === null || value === undefined || value === "" ||
        (/^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)) && new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10) === value);
      const current = await pool.query("SELECT starts_on,ends_on FROM contracts WHERE id=$1", [req.params.id]);
      if (!current.rows[0]) throw fail(404, "Contract not found");
      const startsOn = req.body.starts_on ?? current.rows[0].starts_on?.toISOString?.().slice(0, 10) ?? current.rows[0].starts_on;
      const endsOn = req.body.ends_on ?? current.rows[0].ends_on?.toISOString?.().slice(0, 10) ?? current.rows[0].ends_on;
      if (["starts_on", "ends_on", "work_permit_expires_on", "visa_expires_on"].some((field) => req.body[field] !== undefined && !dateIsValid(req.body[field])) ||
          (endsOn && startsOn && endsOn < startsOn) ||
          (req.body.status !== undefined && !["Active", "Renewing", "Ended"].includes(req.body.status))) {
        throw fail(400, "Contract dates or status are invalid");
      }
    }
    if (name === "employees" && req.body.status === "Inactive" && !req.body.terminated_on) {
      throw fail(400, "A termination date is required when marking an employee inactive");
    }
    if (name === "employees" && req.body.terminated_on !== undefined && req.body.terminated_on !== null &&
        !(/^\d{4}-\d{2}-\d{2}$/.test(req.body.terminated_on) && !Number.isNaN(Date.parse(`${req.body.terminated_on}T00:00:00.000Z`)) && new Date(`${req.body.terminated_on}T00:00:00.000Z`).toISOString().slice(0, 10) === req.body.terminated_on)) {
      throw fail(400, "Termination date must be a valid calendar date");
    }
    if (name === "attendance" && req.session.user.role !== "hr") throw fail(403, "Only HR can edit attendance");
    if (name === "loans" && req.session.user.role !== "hr") throw fail(403, "Only HR can edit loans");
    const { keys, values } = valuesFor(req, spec);
    if (name === "contracts") keys.forEach((key, index) => {
      if (values[index] === "" && ["ends_on", "work_permit_number", "work_permit_expires_on", "visa_type", "visa_expires_on", "document_id", "notes"].includes(key)) values[index] = null;
    });
    const params = [...values, req.params.id];
    if (expectedStatus !== undefined) statusGuard = ` AND status=$${values.length + 2}`;
    let guard = ""; if (req.session.user.role !== "hr" && spec.owner) { params.push(req.session.user.employeeId); guard = ` AND ${spec.owner}=$${params.length}`; }
    const set = keys.map((key, i) => `${key}=$${i + 1}`).join(",") + (["tasks", "contracts", "employees"].includes(name) ? ",updated_at=now()" : "");
    if (statusGuard) params.push(expectedStatus);
    const updateSql = `UPDATE ${spec.table} SET ${set} WHERE id=$${values.length + 1}${guard}${statusGuard} RETURNING *`;
    if (name === "employees" && req.body.status === "Inactive") {
      if (req.params.id === req.session.user.employeeId) throw fail(409, "You cannot terminate your own employee record while signed in");
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await client.query(updateSql, params);
        if (!result.rows[0]) throw fail(404, "Record not found");
        const disabled = await client.query("UPDATE users SET active=false WHERE employee_id=$1 AND active=true RETURNING id", [req.params.id]);
        await client.query(
          "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','employee',$2,$3,$4)",
          [req.session.user.id, req.params.id, { fields: keys, status: "Inactive" }, req.ip]
        );
        for (const user of disabled.rows) {
          await client.query(
            "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','user',$2,$3,$4)",
            [req.session.user.id, user.id, { active: false, reason: "employee-inactive" }, req.ip]
          );
        }
        await client.query("COMMIT");
        res.json(result.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        throw error;
      } finally { client.release(); }
      return;
    }
    if (name === "applications" && applicationNotification) {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const result = await client.query(updateSql, params);
        if (!result.rows[0]) throw fail(409, "Application stage changed; reload and try again");
        await notifyEmployee(client, applicationNotification.employeeId, applicationNotification.title, applicationNotification.body);
        await client.query("INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update',$2,$3,$4,$5)",
          [req.session.user.id, name, req.params.id, { fields: keys }, req.ip]);
        await client.query("COMMIT");
        res.json(result.rows[0]);
      } catch (error) {
        await client.query("ROLLBACK").catch(() => {});
        throw error;
      } finally { client.release(); }
      return;
    }
    const result = await pool.query(updateSql, params);
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
    const employeeResult = await client.query(
      `SELECT e.id,e.role,e.employee_type,e.annual_salary,e.status,d.name AS department_name
       FROM employees e LEFT JOIN departments d ON d.id=e.department_id
       WHERE e.id=$1 FOR UPDATE OF e`,
      [app.employee_id]
    );
    const previous = employeeResult.rows[0];
    if (!previous || previous.status === "Inactive") throw fail(409, "The selected employee is no longer active");
    await client.query(
      `INSERT INTO employment_history(
        employee_id,application_id,previous_role,previous_employee_type,previous_department,previous_annual_salary,
        new_role,new_employee_type,new_department,new_annual_salary,effective_on,recorded_by
      ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,CURRENT_DATE,$11)`,
      [app.employee_id, app.id, previous.role, previous.employee_type, previous.department_name,
        previous.annual_salary, app.title, app.employee_type || "Staff", app.department_id
          ? (await client.query("SELECT name FROM departments WHERE id=$1", [app.department_id])).rows[0]?.name || null
          : null,
        salary, req.session.user.id]
    );
    await client.query(
      "UPDATE employees SET role=$1,annual_salary=$2,department_id=$3,employee_type=$4,updated_at=now() WHERE id=$5",
      [app.title, salary, app.department_id, app.employee_type || "Staff", app.employee_id]
    );
    const result = await client.query(
      "UPDATE applications SET status='Contract signed',agreed_salary=$1 WHERE id=$2 RETURNING *",
      [salary, app.id]
    );
    const contract = await client.query(
      `INSERT INTO contracts(employee_id,contract_type,starts_on,status,notes)
       VALUES($1,$2,CURRENT_DATE,'Active',$3) RETURNING id`,
      [app.employee_id, `${app.employee_type || "Staff"} · ${app.title}`, `Created from signed recruitment offer ${app.id}`]
    );
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'update','application',$2,$3,$4)",
      [req.session.user.id, app.id, { status: "Contract signed", agreed_salary: salary }, req.ip]
    );
    await client.query(
      "INSERT INTO audit_logs(actor_id,action,resource,resource_id,metadata,ip) VALUES($1,'create','contract',$2,$3,$4)",
      [req.session.user.id, contract.rows[0].id, { employee_id: app.employee_id, contract_type: `${app.employee_type || "Staff"} · ${app.title}` }, req.ip]
    );
    await notifyEmployee(client, app.employee_id, "Employment contract signed", `Your contract for ${app.title} is signed.`);
    await client.query("COMMIT");
    res.json({ application: result.rows[0] });
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally { client.release(); }
}));
app.get("/api/employees/:id/employment-history", auth, asyncRoute(async (req, res) => {
  if (!uuidPattern.test(req.params.id)) throw fail(400, "Invalid employee id");
  if (req.session.user.role !== "hr" && req.session.user.employeeId !== req.params.id) {
    throw fail(403, "You may only view your own employment history");
  }
  const result = await pool.query(
    `SELECT id,employee_id,application_id,previous_role,previous_employee_type,previous_department,previous_annual_salary,
       new_role,new_employee_type,new_department,new_annual_salary,effective_on,created_at
     FROM employment_history WHERE employee_id=$1 ORDER BY effective_on DESC,created_at DESC`,
    [req.params.id]
  );
  res.json({ data: result.rows });
}));
// The public API uses the more explicit plural name while keeping /api/leave for the prototype.
app.get("/api/leave-requests", auth, (req, res, next) => { req.url = "/api/leave"; app._router.handle(req, res, next); });
app.post("/api/leave-requests", auth, (req, res, next) => { req.url = "/api/leave"; app._router.handle(req, res, next); });
app.patch("/api/leave-requests/:id", auth, (req, res, next) => { req.url = `/api/leave/${req.params.id}`; app._router.handle(req, res, next); });
app.get("/api/notifications", auth, asyncRoute(async (req, res) => { const r = await pool.query("SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100", [req.session.user.id]); res.json({ data: r.rows }); }));
app.post("/api/notifications/:id/read", auth, asyncRoute(async (req, res) => { const r = await pool.query("UPDATE notifications SET read_at=now() WHERE id=$1 AND user_id=$2 RETURNING *", [req.params.id, req.session.user.id]); if (!r.rows[0]) throw fail(404, "Notification not found"); res.json(r.rows[0]); }));

app.get(["/app.js", "/security.js", "/styles.css"], (req, res, next) =>
  res.sendFile(path.join(appRoot, path.basename(req.path)), next));
app.use("/assets", express.static(path.join(appRoot, "assets"), { dotfiles: "ignore", index: false }));
app.use((req, res, next) => {
  if (req.path === "/api" || req.path.startsWith("/api/")) return next(fail(404, "API route not found"));
  if (path.extname(req.path)) return next(fail(404, "Not found"));
  res.sendFile(path.join(appRoot, "index.html"));
});
app.use((err, req, res, next) => {
  const status = err.code === "LIMIT_FILE_SIZE" ? 413 : err.code === "LIMIT_UNEXPECTED_FILE" ? 400 : (err.status || 500);
  if (status >= 500) console.error(err);
  const message = err.code === "LIMIT_FILE_SIZE" ? "Document exceeds the upload size limit" : err.code === "LIMIT_UNEXPECTED_FILE" ? "Unsupported document type" : (err.status ? err.message : "Internal server error");
  res.status(status).json({ error: message });
});

async function seedAdmin() {
  if (!process.env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is required; set it before starting the service");
  const email = (process.env.ADMIN_EMAIL || "hr@unre.ac.pg").trim().toLowerCase();
  if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  await seedAdminAccount(pool, email, process.env.ADMIN_PASSWORD);
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
