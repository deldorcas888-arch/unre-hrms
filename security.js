function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function validateProductionConfig(env) {
  if (env.NODE_ENV !== "production") return;

  const sessionSecret = String(env.SESSION_SECRET || "");
  const adminPassword = String(env.ADMIN_PASSWORD || "");
  const databaseUrl = String(env.DATABASE_URL || "");
  const clamavHost = String(env.CLAMAV_HOST || "").trim();
  const clamavPort = Number(env.CLAMAV_PORT || 3310);
  if (sessionSecret.length < 32 || ["replace-with-at-least-32-random-characters", "development-only-change-me"].includes(sessionSecret)) {
    throw new Error("Set a unique SESSION_SECRET of at least 32 characters in production");
  }
  if (adminPassword.length < 12 || ["change-me-before-production", "change-me"].includes(adminPassword) || adminPassword === sessionSecret) {
    throw new Error("Set a unique ADMIN_PASSWORD of at least 12 characters in production");
  }

  let database;
  try {
    database = new URL(databaseUrl);
  } catch (_) {
    throw new Error("Set a valid DATABASE_URL in production");
  }
  if (!['postgres:', 'postgresql:'].includes(database.protocol) || !database.hostname || database.pathname.length < 2 ||
      ["change-me", "local-dev-only-change-me"].includes(database.password)) {
    throw new Error("Set a production DATABASE_URL with real credentials");
  }
  if (!clamavHost || !Number.isInteger(clamavPort) || clamavPort < 1 || clamavPort > 65535) {
    throw new Error("Set CLAMAV_HOST and a valid CLAMAV_PORT for production document scanning");
  }
}

function postgresSslOptions(env) {
  if (env.NODE_ENV !== "production") return undefined;
  return { rejectUnauthorized: true, ...(env.DATABASE_SSL_CA ? { ca: env.DATABASE_SSL_CA } : {}) };
}

async function refreshSessionUser(pool, session) {
  if (!session?.user?.id) return false;
  const result = await pool.query("SELECT id,email,role,employee_id,active FROM users WHERE id=$1", [session.user.id]);
  const user = result.rows[0];
  if (!user || !user.active) return false;
  session.user = { id: user.id, email: user.email, role: user.role, employeeId: user.employee_id };
  return true;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { escapeHtml, validateProductionConfig, postgresSslOptions, refreshSessionUser };
}
