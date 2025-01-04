/*
  # Create webhook logs table

  1. New Tables
    - `webhook_logs`
      - `id` (uuid, primary key)
      - `type` (text)
      - `payload` (jsonb)
      - `processed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admins
*/

-- Create webhook_logs table
CREATE TABLE IF NOT EXISTS webhook_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  payload jsonb NOT NULL,
  processed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Create admin role if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
    CREATE ROLE admin;
  END IF;
END
$$;

-- Policies for webhook_logs
CREATE POLICY "Admins can view webhook logs"
  ON webhook_logs
  FOR SELECT
  TO admin
  USING (true);

CREATE POLICY "Admins can insert webhook logs"
  ON webhook_logs
  FOR INSERT
  TO admin
  WITH CHECK (true);