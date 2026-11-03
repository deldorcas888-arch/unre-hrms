const bcrypt = require("bcryptjs");

async function seedAdminAccount(pool, email, password) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const department = await client.query(
      `INSERT INTO departments(name,code,description,location)
       VALUES('Administration','ADMIN','Central university administration and HR.','Administration Block')
       ON CONFLICT(code) DO UPDATE SET name=EXCLUDED.name RETURNING id`
    );
    const employee = await client.query(
      `INSERT INTO employees(employee_number,name,email,role,employee_type,department_id,status,annual_salary)
       VALUES('UNRE-HR-001','HR Administrator',$1,'HR Administrator','Staff',$2,'Active',0)
       ON CONFLICT(email) DO UPDATE SET department_id=EXCLUDED.department_id RETURNING id`,
      [email, department.rows[0].id]
    );
    await client.query("UPDATE departments SET head_employee_id=$1 WHERE id=$2", [employee.rows[0].id, department.rows[0].id]);
    const hash = await bcrypt.hash(password, 12);
    await client.query(
      `INSERT INTO users(email,password_hash,role,employee_id) VALUES($1,$2,'hr',$3)
       ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash,role='hr',employee_id=EXCLUDED.employee_id`,
      [email, hash, employee.rows[0].id]
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { seedAdminAccount };