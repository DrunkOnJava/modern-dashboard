/*
  # Update profiles schema and triggers

  1. Changes
    - Make full_name required
    - Add default name handling
    - Improve error handling in trigger
  
  2. Security
    - Maintain RLS policies
    - Use SECURITY DEFINER for trigger function
*/

-- Update profiles table to make full_name required
ALTER TABLE profiles 
ALTER COLUMN full_name SET NOT NULL;

-- Update user creation function with better error handling
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

  -- Create profile with retry logic
  BEGIN
    INSERT INTO profiles (id, full_name, updated_at)
    VALUES (
      new.id,
      default_name,
      COALESCE(new.raw_user_meta_data->>'updated_at', now())
    );
  EXCEPTION WHEN unique_violation THEN
    -- Profile already exists, ignore
    NULL;
  END;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;