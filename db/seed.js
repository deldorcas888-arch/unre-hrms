require("dotenv").config();
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = String(process.env.ADMIN_PASSWORD || "");
if (!email || !password || password.length < 12) {
  console.error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters before seeding.");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const department = await client.query(
      `INSERT INTO departments(name, code, description, location)
       VALUES ('Administration', 'ADMIN', 'Central university administration and HR.', 'Administration Block')
       ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`
    );
    const employee = await client.query(
      `INSERT INTO employees(employee_number, name, email, role, employee_type, department_id, status, annual_salary)
       VALUES ('UNRE-HR-001', 'HR Administrator', $1, 'HR Administrator', 'Staff', $2, 'Active', 0)
       ON CONFLICT (email) DO UPDATE SET department_id = EXCLUDED.department_id, status = 'Active'
       RETURNING id`,
      [email, department.rows[0].id]
    );
    await client.query("UPDATE departments SET head_employee_id = $1 WHERE id = $2", [employee.rows[0].id, department.rows[0].id]);
    const hash = await bcrypt.hash(password, 12);
    await client.query(
      `INSERT INTO users(email, password_hash, role, employee_id)
       VALUES ($1, $2, 'hr', $3)
       ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'hr', employee_id = EXCLUDED.employee_id, active = true`,
      [email, hash, employee.rows[0].id]
    );
    await client.query("COMMIT");
    console.log(`Seeded HR administrator ${email} and the Administration department.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
seed().catch((error) => { console.error("Database seed failed:", error.message); process.exitCode = 1; }).finally(() => pool.end());
