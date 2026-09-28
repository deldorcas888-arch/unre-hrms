CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, code text NOT NULL UNIQUE,
  description text, location text, head_employee_id uuid, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_number text UNIQUE, name text NOT NULL,
  email text NOT NULL UNIQUE, role text NOT NULL, employee_type text, department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','On Leave','Inactive')),
  annual_salary numeric(12,2) NOT NULL DEFAULT 0 CHECK (annual_salary >= 0), phone text, hired_on date,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'departments_head_fk') THEN
    ALTER TABLE departments ADD CONSTRAINT departments_head_fk FOREIGN KEY (head_employee_id) REFERENCES employees(id) ON DELETE SET NULL;
  END IF;
END $$;
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('hr','staff')), employee_id uuid UNIQUE REFERENCES employees(id) ON DELETE SET NULL,
  active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type text NOT NULL, starts_on date NOT NULL, ends_on date NOT NULL, note text,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Approved','Rejected')),
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL, reviewed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_on >= starts_on)
);
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  attendance_date date NOT NULL, status text NOT NULL CHECK (status IN ('Present','Absent','On Leave','Remote')),
  note text, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(employee_id, attendance_date)
);
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, description text NOT NULL,
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  start_date date NOT NULL, due_date date NOT NULL,
  status text NOT NULL DEFAULT 'New' CHECK (status IN ('New','In Progress','Pending','Done')),
  priority text NOT NULL DEFAULT 'Normal' CHECK (priority IN ('Low','Normal','High')),
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (due_date >= start_date)
);
CREATE TABLE IF NOT EXISTS loans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  amount numeric(12,2) NOT NULL CHECK (amount > 0), term_months integer NOT NULL CHECK (term_months > 0),
  purpose text, repaid numeric(12,2) NOT NULL DEFAULT 0 CHECK (repaid >= 0), status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Approved','Rejected','Paid')),
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL, reviewed_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS payroll (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  period date NOT NULL, gross numeric(12,2) NOT NULL, nasfund numeric(12,2) NOT NULL DEFAULT 0,
  paye numeric(12,2) NOT NULL DEFAULT 0, loan_recovery numeric(12,2) NOT NULL DEFAULT 0,
  net numeric(12,2) NOT NULL, basic_salary numeric(12,2) NOT NULL DEFAULT 0,
  housing_allowance numeric(12,2) NOT NULL DEFAULT 0, bonus numeric(12,2) NOT NULL DEFAULT 0,
  overtime numeric(12,2) NOT NULL DEFAULT 0, other_deductions numeric(12,2) NOT NULL DEFAULT 0,
  total_days integer NOT NULL DEFAULT 0, working_days integer NOT NULL DEFAULT 0,
  pay_date date, status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS basic_salary numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS housing_allowance numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS bonus numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS overtime numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS other_deductions numeric(12,2) NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS total_days integer NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS working_days integer NOT NULL DEFAULT 0;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS pay_date date;
ALTER TABLE payroll ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'Pending';
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'payroll_status_check') THEN
    ALTER TABLE payroll ADD CONSTRAINT payroll_status_check CHECK (status IN ('Pending','Completed','Rejected'));
  END IF;
END $$;
ALTER TABLE payroll DROP CONSTRAINT IF EXISTS payroll_employee_id_period_key;
CREATE UNIQUE INDEX IF NOT EXISTS payroll_employee_period_active_idx
  ON payroll(employee_id, period) WHERE status <> 'Rejected';
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  description text NOT NULL, salary_range text, closes_on date, status text NOT NULL DEFAULT 'Open' CHECK (status IN ('Draft','Open','Closed')),
  appointment_type text NOT NULL DEFAULT 'Full-Time', employee_type text NOT NULL DEFAULT 'Staff', location text,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS appointment_type text NOT NULL DEFAULT 'Full-Time';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS employee_type text NOT NULL DEFAULT 'Staff';
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS location text;
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  employee_id uuid REFERENCES employees(id) ON DELETE SET NULL, applicant_name text NOT NULL, applicant_email text NOT NULL,
  education text, experience text, statement text, status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Shortlisted','Interviewed','Accepted','Declined','Contract signed')),
  interview_at timestamptz,
  agreed_salary numeric(12,2), created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(job_id, applicant_email)
);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS interview_at timestamptz;
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_status_check;
ALTER TABLE applications ADD CONSTRAINT applications_status_check
  CHECK (status IN ('Pending','Shortlisted','Interviewed','Accepted','Declined','Contract signed'));
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE, kind text NOT NULL, filename text NOT NULL,
  content_type text, size_bytes integer, storage_key text, created_by uuid REFERENCES users(id) ON DELETE SET NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL, body text NOT NULL, read_at timestamptz, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS audit_logs (
  id bigserial PRIMARY KEY, actor_id uuid REFERENCES users(id) ON DELETE SET NULL, action text NOT NULL,
  resource text NOT NULL, resource_id text, metadata jsonb NOT NULL DEFAULT '{}', ip inet, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS leave_employee_idx ON leave_requests(employee_id);
CREATE INDEX IF NOT EXISTS attendance_date_idx ON attendance(attendance_date);
CREATE INDEX IF NOT EXISTS tasks_employee_status_due_idx ON tasks(employee_id,status,due_date);
CREATE INDEX IF NOT EXISTS audit_created_idx ON audit_logs(created_at);
