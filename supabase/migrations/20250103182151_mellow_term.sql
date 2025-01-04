/*
  # Create dashboard tables and API functions

  1. New Tables
    - `dashboards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `layout` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `dashboard_cards`
      - `id` (uuid, primary key)
      - `dashboard_id` (uuid, references dashboards)
      - `title` (text)
      - `type` (text)
      - `config` (jsonb)
      - `position` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations
*/

-- Create dashboards table
CREATE TABLE IF NOT EXISTS dashboards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  layout jsonb DEFAULT '{"type": "grid", "spacing": 4}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dashboard cards table
CREATE TABLE IF NOT EXISTS dashboard_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id uuid REFERENCES dashboards ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  type text NOT NULL,
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  position integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_cards ENABLE ROW LEVEL SECURITY;

-- Policies for dashboards
CREATE POLICY "Users can view own dashboards"
  ON dashboards
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create dashboards"
  ON dashboards
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dashboards"
  ON dashboards
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dashboards"
  ON dashboards
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for dashboard cards
CREATE POLICY "Users can view own dashboard cards"
  ON dashboard_cards
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM dashboards 
    WHERE id = dashboard_cards.dashboard_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create dashboard cards"
  ON dashboard_cards
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM dashboards 
    WHERE id = dashboard_cards.dashboard_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update own dashboard cards"
  ON dashboard_cards
  FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM dashboards 
    WHERE id = dashboard_cards.dashboard_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete own dashboard cards"
  ON dashboard_cards
  FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM dashboards 
    WHERE id = dashboard_cards.dashboard_id 
    AND user_id = auth.uid()
  ));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_dashboards_updated_at
  BEFORE UPDATE ON dashboards
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER update_dashboard_cards_updated_at
  BEFORE UPDATE ON dashboard_cards
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();