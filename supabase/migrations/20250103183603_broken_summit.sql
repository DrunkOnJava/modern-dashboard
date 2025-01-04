/*
  # Update profiles and user creation
  
  1. Changes
    - Make full_name required in profiles table
    - Add default name handling in user creation trigger
  
  2. Security
    - Maintains existing RLS policies
*/

-- Update profiles table to make full_name required
ALTER TABLE profiles 
ALTER COLUMN full_name SET NOT NULL;

-- Update user creation function with default name handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_name text;
BEGIN
  -- Set default name if not provided
  default_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    'User ' || substr(new.id::text, 1, 8)
  );

  INSERT INTO profiles (id, full_name)
  VALUES (
    new.id,
    default_name
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;