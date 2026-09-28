# UNRE HR backend deployment

## Local development

1. Copy `.env.example` to `.env` and set a long random `SESSION_SECRET` and a
   non-demo `ADMIN_PASSWORD`.
2. Start PostgreSQL with `docker compose up -d postgres`. The schema is applied
   automatically on the first volume initialisation.
3. Run `npm install`, then `npm start`. The existing prototype is served at
   `http://localhost:3000`.

For an existing database, apply `db/schema.sql` (or
`psql "$DATABASE_URL" -f db/migrations/001_initial.sql`) during a maintenance
window. This idempotent schema adds payroll processing fields and recruitment
fields, including vacancy details, candidate stages, and interview scheduling,
as well as the employee task-management table.
Back up PostgreSQL before migrations.

## Production

Run behind TLS-terminating reverse proxy (nginx, a managed ingress, or a
platform load balancer). Set `NODE_ENV=production`, `COOKIE_SECURE=true`,
`TRUST_PROXY=true` only when the proxy overwrites client IP headers, and keep
`DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_PASSWORD` in the platform secret
store. Do not expose PostgreSQL publicly. Use a managed database or a
private-network Docker volume with encrypted backups.

The process is stateless apart from PostgreSQL and can be horizontally scaled
when `STORAGE_DIR` points to shared private storage (or an object-storage
adapter is added). The local disk adapter stores files outside the application
directory and rejects paths inside the public web root; never mount that
directory through nginx or Express static content.
Health checks should call `GET /api/health`; graceful shutdown should be
handled by the process manager. Set `STORAGE_DIR` to a private persistent
volume and restrict it to the service account. Uploads are limited by
`MAX_UPLOAD_BYTES` (1 MiB by default) to PDF, PNG, JPEG, WebP, DOC, and DOCX.
Document bytes are never publicly served: use the authenticated
`/api/documents/:id/download` endpoint, which enforces HR or employee
ownership checks and records an audit event.

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
- Rotate secrets, revoke accounts by setting `users.active=false`, monitor
  audit logs, and apply least-privilege database credentials.
