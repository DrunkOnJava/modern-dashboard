/*
  # Admin System Enhancement
  
  1. Profile Updates
    - Add role and permissions management
    - Add user suspension tracking
    - Add deletion tracking
    - Add login tracking
  
  2. Audit System
    - Create audit logs table
    - Add secure logging function
    - Set up RLS policies
*/

-- Add admin-specific columns to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user',
ADD COLUMN IF NOT EXISTS permissions text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS suspended boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS suspended_at timestamptz,
ADD COLUMN IF NOT EXISTS suspended_by uuid REFERENCES auth.users,
ADD COLUMN IF NOT EXISTS deleted boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
ADD COLUMN IF NOT EXISTS deleted_by uuid REFERENCES auth.users,
ADD COLUMN IF NOT EXISTS last_login timestamptz;

-- Create admin audit log table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users NOT NULL,
  action text NOT NULL,
  target_id uuid REFERENCES auth.users,
  details jsonb DEFAULT '{}',
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for admin audit logs
CREATE POLICY "Admins can view audit logs"
  ON admin_audit_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can create audit logs"
  ON admin_audit_logs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'super_admin')
    )
  );

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
  action text,
  target_id uuid,
  details jsonb DEFAULT '{}'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO admin_audit_logs (admin_id, action, target_id, details, ip_address)
  VALUES (
    auth.uid(),
    action,
    target_id,
    details,
    current_setting('request.headers')::json->>'x-forwarded-for'
  );
END;
$$;