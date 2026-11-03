const test = require("node:test");
const assert = require("node:assert/strict");
const { escapeHtml, validateProductionConfig, postgresSslOptions, refreshSessionUser } = require("../security");

const productionEnv = () => ({
  NODE_ENV: "production",
  SESSION_SECRET: "a-unique-random-session-secret-with-more-than-32-characters",
  ADMIN_PASSWORD: "a-unique-long-admin-password",
  DATABASE_URL: "postgres://unre:unique-db-password@db.internal:5432/unre_hr",
  CLAMAV_HOST: "clamav.internal",
  CLAMAV_PORT: "3310"
});

test("escapeHtml encodes markup and quotes", () => {
  assert.equal(escapeHtml(`<img src="x" onerror='run()'>&`), "&lt;img src=&quot;x&quot; onerror=&#39;run()&#39;&gt;&amp;");
});

test("production config accepts unique secrets and a PostgreSQL URL", () => {
  assert.doesNotThrow(() => validateProductionConfig(productionEnv()));
});

test("production config rejects the published example session secret", () => {
  const env = productionEnv();
  env.SESSION_SECRET = "replace-with-at-least-32-random-characters";
  assert.throws(() => validateProductionConfig(env), /SESSION_SECRET/);
});

test("production config rejects the published example admin password", () => {
  const env = productionEnv();
  env.ADMIN_PASSWORD = "change-me-before-production";
  assert.throws(() => validateProductionConfig(env), /ADMIN_PASSWORD/);
});

test("production config rejects the published example database password", () => {
  const env = productionEnv();
  env.DATABASE_URL = "postgres://unre:local-dev-only-change-me@localhost:5432/unre_hr";
  assert.throws(() => validateProductionConfig(env), /DATABASE_URL/);
});

test("production config requires a configured malware scanner", () => {
  const env = productionEnv();
  delete env.CLAMAV_HOST;
  assert.throws(() => validateProductionConfig(env), /CLAMAV_HOST/);
});

test("production config rejects reused session and admin secrets", () => {
  const env = productionEnv();
  env.ADMIN_PASSWORD = env.SESSION_SECRET;
  assert.throws(() => validateProductionConfig(env), /ADMIN_PASSWORD/);
});

test("database TLS verifies certificates in production and is off in development", () => {
  assert.deepEqual(postgresSslOptions({ NODE_ENV: "development" }), undefined);
  assert.deepEqual(postgresSslOptions({ NODE_ENV: "production" }), { rejectUnauthorized: true });
  assert.deepEqual(postgresSslOptions({ NODE_ENV: "production", DATABASE_SSL_CA: "trusted-ca" }), {
    rejectUnauthorized: true,
    ca: "trusted-ca"
  });
});

test("session refresh revokes disabled users", async () => {
  const session = { user: { id: "u1", role: "hr" } };
  const pool = { query: async () => ({ rows: [{ id: "u1", active: false }] }) };
  assert.equal(await refreshSessionUser(pool, session), false);
});

test("session refresh applies current account role and identity", async () => {
  const session = { user: { id: "u1", role: "hr", email: "old@example.org" } };
  const pool = { query: async () => ({ rows: [{ id: "u1", email: "staff@example.org", role: "staff", employee_id: "e1", active: true }] }) };
  assert.equal(await refreshSessionUser(pool, session), true);
  assert.deepEqual(session.user, { id: "u1", email: "staff@example.org", role: "staff", employeeId: "e1" });
});
