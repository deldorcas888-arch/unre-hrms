# UNRE HR backend deployment

## Local development

1. Copy `.env.example` to `.env` and set a long random `SESSION_SECRET` and a
   non-demo `ADMIN_PASSWORD`.
2. Start PostgreSQL and ClamAV with `docker compose up -d postgres clamav`. The
  schema is applied on the first database volume initialisation; ClamAV may
  take several minutes on first start to download virus signatures. Keep
  `CLAMAV_HOST=127.0.0.1` and `CLAMAV_PORT=3310` for an app process running on
  the host.
3. Run `npm install`, then `npm start`. The existing prototype is served at
   `http://localhost:3000`.

For an existing database, apply `db/schema.sql` (or
`psql "$DATABASE_URL" -f db/migrations/001_initial.sql`) during a maintenance
window. This idempotent schema adds payroll processing fields and recruitment
fields, including vacancy details, candidate stages, and interview scheduling,
as well as the employee task-management table.
For databases already on migration 001, apply
`psql "$DATABASE_URL" -f db/migrations/002_contracts_roles_reports.sql` to add
contract records, optional workforce reporting fields, and leadership roles.
Apply `psql "$DATABASE_URL" -f db/migrations/003_roster_overtime.sql` to add
persistent roster shifts, overtime entries, and loan categories. Loan approval
policy is enforced transactionally by the API.
Apply `psql "$DATABASE_URL" -f db/migrations/004_employment_history.sql` to
preserve previous and new appointment details when an internal candidate signs
an offer. Existing employees' prior appointments are not inferred; this table
records signed appointment changes from the migration onward.
Apply `psql "$DATABASE_URL" -f db/migrations/005_hr_chat.sql` to add private
staff-to-HR message conversations.
Back up PostgreSQL before migrations.

## Production

Run behind TLS-terminating reverse proxy (nginx, a managed ingress, or a
platform load balancer). Set `NODE_ENV=production`, `COOKIE_SECURE=true`,
`TRUST_PROXY=true` only when the proxy overwrites client IP headers, and keep
`DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_PASSWORD` in the platform secret
store. Production startup rejects the published example secrets and requires a
unique session secret of at least 32 characters and an admin password of at
least 12 characters. Use randomly generated values; do not copy the development
values from `.env.example`. Set `CLAMAV_HOST` and `CLAMAV_PORT` to a private,
reachable ClamAV `clamd` service; production startup refuses to run without
these scanner settings.

PostgreSQL TLS certificate verification is enabled in production. Use a
certificate signed by a system-trusted CA, or set `DATABASE_SSL_CA` to the CA
certificate PEM supplied by your database provider. Do not disable certificate
verification.

Do not expose PostgreSQL publicly. The supplied Compose service is for local
development only: its port binds to loopback, and it requires an explicit
`POSTGRES_PASSWORD` from `.env`. For production, use a managed database or a
private-network database service with encrypted backups.

The process is stateless apart from PostgreSQL, but the default rate limiter
stores counters in process memory. Run one API instance unless a shared rate
limit store is configured. Horizontal scaling also requires `STORAGE_DIR` to
point to shared private storage (or an object-storage adapter). The local disk adapter stores files outside the application
directory and rejects paths inside the public web root; never mount that
directory through nginx or Express static content.
Health checks should call `GET /api/health`; graceful shutdown should be
handled by the process manager. Set `STORAGE_DIR` to a private persistent
volume and restrict it to the service account. Uploads are limited by
`MAX_UPLOAD_BYTES` (1 MiB by default) to PDF, PNG, JPEG, WebP, DOC, and DOCX.
Uploads are first written with restrictive permissions under the private
`STORAGE_DIR/.quarantine` directory and scanned using ClamAV's `INSTREAM`
protocol. Only clean files are moved into document storage; infected files are
rejected and scanner errors/timeouts fail closed. Keep the scanner on a private
network, allow its signature database to update, monitor its health, and back
up `STORAGE_DIR` separately. Document bytes are never publicly served: use the
authenticated `/api/documents/:id/download` endpoint, which enforces HR or
employee ownership checks and records an audit event.

## Security notes

- Login uses bcrypt hashes, signed `HttpOnly`/`SameSite=Lax` cookies, short
  sessions, rate limiting, Helmet headers, parameterised SQL, and CSRF tokens
  (`X-CSRF-Token` from `/api/auth/login` or `/api/auth/me`).
- All mutating API requests except login require the CSRF header. Keep the
  frontend and API same-origin where possible.
- HR-only resources are enforced server-side; staff queries are restricted to
  their employee record, including assigned tasks. Staff can update only their
  own task status and valid progress transitions. Audit events are append-only
  to application users.
- Rotate secrets, monitor audit logs, and apply least-privilege database
  credentials. HR termination automatically deactivates the linked account;
  account status can also be managed from Roles & audit. The API checks account
  activity and current role on authenticated requests, so deactivation and role
  changes take effect on the next request.

## Verification

Run `npm test` for the Node security and scanner protocol regression tests and
`npm run check` for the server syntax check. Tests cover output escaping,
production configuration, PostgreSQL TLS, session revocation, and scanner
clean/infected/unavailable responses.
Add database-backed integration tests before changes to payroll, authorization,
or migrations are released.
