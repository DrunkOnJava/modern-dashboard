/*
  # API Connections Schema

  1. New Tables
    - `api_connections`
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
    - Enable RLS on api_connections table
    - Add policies for authenticated users
    - Encrypt API keys using pgcrypto
*/

-- Create api_connections table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS public.api_connections (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    name text NOT NULL,
    provider text NOT NULL,
    endpoint text NOT NULL,
    api_key text NOT NULL,
    refresh_interval integer DEFAULT 30000 CHECK (refresh_interval >= 1000),
    enabled boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Enable RLS
ALTER TABLE api_connections ENABLE ROW LEVEL SECURITY;

-- Create policies for api_connections
DO $$ BEGIN
  CREATE POLICY "Users can view own API connections"
    ON api_connections FOR SELECT
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can create API connections"
    ON api_connections FOR INSERT
    WITH CHECK (auth.uid() = user_id);

  CREATE POLICY "Users can update own API connections"
    ON api_connections FOR UPDATE
    USING (auth.uid() = user_id);

  CREATE POLICY "Users can delete own API connections"
    ON api_connections FOR DELETE
    USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create function to encrypt API key if it doesn't exist
CREATE OR REPLACE FUNCTION encrypt_api_key()
RETURNS TRIGGER AS $$
BEGIN
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

-- Create function to decrypt API key if it doesn't exist
CREATE OR REPLACE FUNCTION decrypt_api_key(config_id uuid)
RETURNS text AS $$
DECLARE
  encrypted_key text;
  user_id uuid;
BEGIN
  -- Only allow decryption for the owner
  IF NOT EXISTS (
    SELECT 1 FROM api_connections 
    WHERE id = config_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  SELECT api_connections.api_key, api_connections.user_id 
  INTO encrypted_key, user_id
  FROM api_connections 
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

-- Create trigger to encrypt API key on insert/update if it doesn't exist
DO $$ BEGIN
  CREATE TRIGGER encrypt_api_key_trigger
    BEFORE INSERT OR UPDATE OF api_key ON api_connections
    FOR EACH ROW
    EXECUTE FUNCTION encrypt_api_key();
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create updated_at trigger if it doesn't exist
DO $$ BEGIN
  CREATE TRIGGER update_api_connections_updated_at
    BEFORE UPDATE ON api_connections
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create indexes for better performance if they don't exist
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS api_connections_user_id_idx ON api_connections(user_id);
  CREATE INDEX IF NOT EXISTS api_connections_provider_idx ON api_connections(provider);
END $$;