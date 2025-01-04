/*
  # API Configuration Schema

  1. New Tables
    - `api_configs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `provider` (text)
      - `endpoint` (text)
      - `api_key` (text, encrypted)
      - `refresh_interval` (integer)
      - `enabled` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `api_configs` table
    - Add policies for authenticated users to manage their API configurations
    - Encrypt API keys using pgcrypto

  3. Functions
    - Add function to encrypt API keys
    - Add function to decrypt API keys (restricted to owner)
*/

-- Enable pgcrypto extension for encryption
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create API configs table
CREATE TABLE IF NOT EXISTS api_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  provider text NOT NULL,
  endpoint text NOT NULL,
  api_key text NOT NULL,
  refresh_interval integer DEFAULT 60000,
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_refresh_interval CHECK (refresh_interval >= 1000)
);

-- Enable RLS
ALTER TABLE api_configs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own API configs"
  ON api_configs
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own API configs"
  ON api_configs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API configs"
  ON api_configs
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API configs"
  ON api_configs
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to encrypt API key
CREATE OR REPLACE FUNCTION encrypt_api_key()
RETURNS TRIGGER AS $$
BEGIN
  -- Encrypt API key using a secure key derived from the user_id
  NEW.api_key = encode(
    encrypt(
      NEW.api_key::bytea,
      digest(NEW.user_id::text, 'sha256'),
      'aes'
    ),
    'base64'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to decrypt API key
CREATE OR REPLACE FUNCTION decrypt_api_key(config_id uuid)
RETURNS text AS $$
DECLARE
  encrypted_key text;
  user_id uuid;
BEGIN
  -- Only allow decryption for the owner
  IF NOT EXISTS (
    SELECT 1 FROM api_configs 
    WHERE id = config_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  SELECT api_configs.api_key, api_configs.user_id 
  INTO encrypted_key, user_id
  FROM api_configs 
  WHERE id = config_id;

  RETURN convert_from(
    decrypt(
      decode(encrypted_key, 'base64'),
      digest(user_id::text, 'sha256'),
      'aes'
    ),
    'utf8'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to encrypt API key on insert/update
CREATE TRIGGER encrypt_api_key_trigger
  BEFORE INSERT OR UPDATE OF api_key ON api_configs
  FOR EACH ROW
  EXECUTE FUNCTION encrypt_api_key();

-- Create updated_at trigger
CREATE TRIGGER update_api_configs_updated_at
  BEFORE UPDATE ON api_configs
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better performance
CREATE INDEX api_configs_user_id_idx ON api_configs(user_id);
CREATE INDEX api_configs_provider_idx ON api_configs(provider);