require("dotenv").config();
const { Pool } = require("pg");
const { postgresSslOptions, validateProductionConfig } = require("../security");
const { seedAdminAccount } = require("./seed-admin");

const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = String(process.env.ADMIN_PASSWORD || "");
if (!email || !password || password.length < 12) {
  console.error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters before seeding.");
  process.exit(1);
}
try { validateProductionConfig(process.env); }
catch (error) { console.error("Invalid production configuration:", error.message); process.exit(1); }

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: postgresSslOptions(process.env) });
seedAdminAccount(pool, email, password)
  .then(() => console.log(`Seeded HR administrator ${email} and the Administration department.`))
  .catch((error) => { console.error("Database seed failed:", error.message); process.exitCode = 1; })
  .finally(() => pool.end());
