# UNRE HR

University HR for the **Papua New Guinea University of Natural Resources and Environment**. Two portals share the same records.

## Two interfaces

**HR office** (`hr@unre.ac.pg` / `unre2026`)

- Workforce dashboard with payroll, recruitment, attendance, and leave summaries; HR analytics with workforce composition, department headcount, task delivery, attendance, recruitment, leave, and payroll trends plus annual CSV reports; employee directory with status, department, appointment, and search filters; employee and department records
- Task management: assign work with descriptions, assignees, priorities, and due dates; track New, In Progress, Pending, and Done tasks in a board, timeline, or calendar; export the register
- Monthly attendance calendar with daily status summaries, department and employee
  filters, editable employee records, attendance-rate metrics, and CSV export
- Leave management with active/upcoming/pending summaries, searchable and
  filterable request register, approval decisions, monthly absence calendar, and
  CSV export; approved leave continues to populate attendance automatically
- Recruitment: create a job draft with department, appointment band, salary,
  location, and closing date; publish or close vacancies; review the candidate
  pipeline, shortlist and interview applicants, schedule interviews, make
  selections, sign internal staff contracts, filter and export candidate
  records
- Payroll processing: create a dated employee payroll entry,
  calculate PNG PAYE, employee NASFUND (6%), approved loan recovery, overtime,
  allowances, bonus, and other deductions; save entries as Pending, then
  complete or reject them, search and filter by pay period, and export a CSV
  register

**Staff self-service** (sign in with your UNRE work email username and password; demo password: `unre2026`)

- Request leave and staff loans
- See status of those requests
- Monthly payslip with PNG-style deductions
- Apply for internal jobs
- Track internal job application decisions
- View own profile
- View assigned tasks and update task progress
- View personal attendance history
- Review personal monthly attendance summaries and filter attendance history by month
- HR can sign an accepted internal applicant's contract with an agreed annual salary; the employee's role, appointment, department, and payslip update after signing.

Approved loans deduct from the monthly payslip. Policy: one outstanding loan, maximum 40% of annual salary. Payroll is created per employee and month as Pending; HR can complete or reject each entry. Completed payroll is shown in staff self-service, with period totals and a downloadable payroll register for HR.

## Open the app

The static prototype is preserved and can still be opened directly in a browser.
For the production-oriented backend, copy `.env.example` to `.env`, start
PostgreSQL with `docker compose up -d postgres`, then run `npm install` and
`npm start`. The Express server serves the same frontend and exposes the
authenticated `/api` routes documented in `DEPLOYMENT.md`. The backend stores
records in PostgreSQL; it does not use the prototype's `localStorage` data.

The frontend uses the backend by default. To explicitly use the original
browser-only demo, open `index.html?demo=1` (or set
`localStorage.unre-demo-mode` to `"true"`). Backend login/session and core
employee, leave, attendance, loan, and payroll records are loaded through the
API when demo mode is not enabled.

`npm run db:seed` creates (or safely updates) the HR administrator from
`ADMIN_EMAIL`/`ADMIN_PASSWORD`, plus an Administration department and linked
`UNRE-HR-001` employee. Startup also performs this idempotent seed after a
successful database connection. Available scripts are `npm start`, `npm run
dev`, `npm run check`, and `npm run db:seed`.

Backend document uploads use private local disk storage by default
(`STORAGE_DIR`), with authenticated downloads at
`/api/documents/:id/download`. Configure a persistent directory outside the
web root; upload size and permitted MIME types are controlled by
`MAX_UPLOAD_BYTES`. Demo mode continues to store demo files in localStorage.
