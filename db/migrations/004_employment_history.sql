CREATE TABLE IF NOT EXISTS employment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE SET NULL,
  previous_role text,
  previous_employee_type text,
  previous_department text,
  previous_annual_salary numeric(12,2) CHECK (previous_annual_salary IS NULL OR previous_annual_salary >= 0),
  new_role text NOT NULL,
  new_employee_type text,
  new_department text,
  new_annual_salary numeric(12,2) NOT NULL CHECK (new_annual_salary >= 0),
  effective_on date NOT NULL DEFAULT CURRENT_DATE,
  recorded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS employment_history_employee_date_idx
  ON employment_history(employee_id,effective_on DESC);
