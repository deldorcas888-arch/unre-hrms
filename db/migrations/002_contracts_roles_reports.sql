ALTER TABLE employees ADD COLUMN IF NOT EXISTS gender text;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS equity_group text;
ALTER TABLE employees ADD COLUMN IF NOT EXISTS terminated_on date;

ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check
  CHECK (role IN ('hr','dean','hod','vice_chancellor','staff'));

CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  contract_type text NOT NULL,
  starts_on date NOT NULL,
  ends_on date,
  status text NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Renewing','Ended')),
  work_permit_number text,
  work_permit_expires_on date,
  visa_type text,
  visa_expires_on date,
  document_id uuid REFERENCES documents(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (ends_on IS NULL OR ends_on >= starts_on)
);

CREATE INDEX IF NOT EXISTS contracts_employee_end_idx ON contracts(employee_id,ends_on);
CREATE INDEX IF NOT EXISTS contracts_permit_expiry_idx ON contracts(work_permit_expires_on,visa_expires_on);