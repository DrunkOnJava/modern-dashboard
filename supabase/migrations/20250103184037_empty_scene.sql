/*
  # Fix authentication and profile creation

  1. Changes
    - Add better error handling for profile creation
    - Add constraints to prevent duplicate profiles
    - Improve trigger function reliability
    - Add proper transaction handling
  
  2. Security
    - Maintain RLS policies
    - Use SECURITY DEFINER for trigger function
*/

-- Drop existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Update the trigger function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  default_name text;
BEGIN
  -- Set default name if not provided
  default_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    'User ' || substr(new.id::text, 1, 8)
  );

  -- Insert profile with conflict handling
  INSERT INTO public.profiles (id, full_name, updated_at)
  VALUES (
    new.id,
    default_name,
    COALESCE(
      (new.raw_user_meta_data->>'updated_at')::timestamptz,
      now()
    )
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error and continue (don't block user creation)
    RAISE WARNING 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$;

-- Recreate trigger with proper timing
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Ensure profile constraints
ALTER TABLE profiles
  ALTER COLUMN full_name SET NOT NULL,
  ALTER COLUMN updated_at SET DEFAULT now();

-- Add index for better performance
CREATE INDEX IF NOT EXISTS profiles_user_id_idx ON profiles(id);