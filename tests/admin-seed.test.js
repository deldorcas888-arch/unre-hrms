const test = require("node:test");
const assert = require("node:assert/strict");
const { seedAdminAccount } = require("../db/seed-admin");

test("admin seed preserves employee and user deactivation on conflict", async () => {
  const statements = [];
  let released = false;
  const client = {
    async query(sql) {
      statements.push(sql);
      if (sql.includes("INSERT INTO departments")) return { rows: [{ id: "department-1" }] };
      if (sql.includes("INSERT INTO employees")) return { rows: [{ id: "employee-1" }] };
      if (sql.includes("INSERT INTO users")) return { rows: [{ id: "user-1" }] };
      return { rows: [] };
    },
    release() { released = true; }
  };
  await seedAdminAccount({ connect: async () => client }, "admin@example.org", "unique-admin-password");

  const employeeUpsert = statements.find((sql) => sql.includes("INSERT INTO employees"));
  const userUpsert = statements.find((sql) => sql.includes("INSERT INTO users"));
  const employeeConflict = employeeUpsert.match(/ON CONFLICT\(email\) DO UPDATE SET([\s\S]*)RETURNING id/i)?.[1] || "";
  const userConflict = userUpsert.match(/ON CONFLICT\(email\) DO UPDATE SET([\s\S]*)/i)?.[1] || "";
  assert.match(employeeConflict, /department_id=EXCLUDED\.department_id/i);
  assert.doesNotMatch(employeeConflict, /\bstatus\s*=/i);
  assert.doesNotMatch(userConflict, /\bactive\s*=/i);
  assert.ok(statements.includes("BEGIN"));
  assert.ok(statements.includes("COMMIT"));
  assert.equal(released, true);
});