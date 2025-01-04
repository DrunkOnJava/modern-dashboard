/*
  # Configure OAuth Redirect URLs
  
  1. Changes
    - Create a table to store allowed redirect URLs
    - Add initial redirect URLs for local development and production
*/

-- Create a table to store allowed redirect URLs
CREATE TABLE IF NOT EXISTS public.allowed_redirect_urls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.allowed_redirect_urls ENABLE ROW LEVEL SECURITY;

-- Create policy for reading redirect URLs
CREATE POLICY "Allow public read access to redirect URLs"
  ON public.allowed_redirect_urls
  FOR SELECT
  TO public
  USING (true);

-- Create policy for managing redirect URLs (admin only)
CREATE POLICY "Allow admin to manage redirect URLs"
  ON public.allowed_redirect_urls
  USING (auth.role() = 'service_role');

-- Add initial redirect URLs
INSERT INTO public.allowed_redirect_urls (url)
VALUES 
  ('http://localhost:5173/auth/callback'),
  ('https://clinquant-custard-ea9541.netlify.app/auth/callback')
ON CONFLICT (url) DO NOTHING;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to the table
CREATE TRIGGER update_allowed_redirect_urls_updated_at
  BEFORE UPDATE ON public.allowed_redirect_urls
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();