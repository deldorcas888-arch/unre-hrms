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
- Contracts: maintain staff agreements, renewal status, permit and visa dates,
  expiry alerts, and links to personnel documents; signed recruitment offers
  create contract records automatically
- Reports: export headcount by department, gender and equity representation,
  hires, departures, and annual turnover measures as a Department of Higher
  Education CSV
- Roles & audit: assign HR, Dean, Head of Department, Vice-Chancellor, or Staff
  access to existing accounts and review recent changes; HoD reports are scoped
  to the linked employee's department

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
- After a signed internal offer, the staff profile shows the new appointment and retains the prior role, appointment type, department, and salary in appointment history.

Optional gender and equity-group fields are HR-maintained from an employee
record; workforce reports expose aggregate counts only. User accounts must be
provisioned separately. Terminating an employee automatically deactivates the
linked login; HR can explicitly reactivate the account after restoring the
employee record. Role changes and account deactivation take effect on the next
authenticated API request.

Approved loans deduct from the monthly payslip. Policy: one outstanding loan, maximum 40% of annual salary. Payroll is created per employee and month as Pending; HR can complete or reject each entry. Completed payroll is shown in staff self-service, with period totals and a downloadable payroll register for HR.

## Open the app

The static prototype is preserved and can still be opened directly in a browser.
For the production-oriented backend, copy `.env.example` to `.env`, start
PostgreSQL and ClamAV with `docker compose up -d postgres clamav`, then run
`npm ci` and `npm start`. Wait for ClamAV's initial signature download before
testing document uploads. The Express server serves the same frontend and exposes the
authenticated `/api` routes documented in `DEPLOYMENT.md`. The backend stores
records in PostgreSQL; it does not use the prototype's `localStorage` data.

Opening `index.html` directly from disk (`file://`) uses the browser-only demo
automatically because a local file has no backend API. GitHub Pages without a
configured API base also uses the browser demo; GitHub Pages cannot run the
Express `/api` backend. Other hosted copies require a reachable backend that
explicitly permits demo mode; `?demo=1` and saved demo preferences do not
override a production backend or enable the demo after a backend failure.
Demo data is saved only in that browser. For database-backed use,
deploy the Express app alongside PostgreSQL and open its application URL.
Backend login/session and core employee, leave, attendance, loan, and payroll
records are loaded through the API when demo mode is not enabled.

`npm run db:seed` creates (or safely updates) the HR administrator from
`ADMIN_EMAIL`/`ADMIN_PASSWORD`, plus an Administration department and linked
`UNRE-HR-001` employee. Startup also performs this idempotent seed after a
successful database connection. Available scripts are `npm start`,
`npm run dev`, `npm run check`, `npm test`, and `npm run db:seed`.

Backend document uploads use private local disk storage by default
(`STORAGE_DIR`), with authenticated downloads at
`/api/documents/:id/download`. Configure a persistent directory outside the
web root. Uploads are staged under `.quarantine` and scanned by ClamAV before
they are accepted; scanner outages and infections fail closed. Upload size and
permitted MIME types are controlled by `MAX_UPLOAD_BYTES`. Demo mode continues
to store demo files in localStorage.
