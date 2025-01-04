/**
 * LoginForm Component
 *
 * A comprehensive login form that provides both email/password and Google authentication.
 * Features include:
 * - Email/password authentication
 * - Google Sign-In integration
 * - Remember me functionality
 * - Loading states
 * - Error handling
 * - Forgot password option
 */
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { TextInput } from "../shared/form/TextInput";
import { LoadingSpinner } from "../shared/feedback/LoadingSpinner";
import { GoogleSignIn } from "./GoogleSignIn";
import { ErrorMessage } from "../shared/feedback/ErrorMessage";

function LoginForm() {
  const { signIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await signIn(formData.email, formData.password, formData.remember);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to sign in with Google"
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <GoogleSignIn onSignIn={handleGoogleSignIn} loading={googleLoading} />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white dark:bg-gray-800">
            Or continue with
          </span>
        </div>
      </div>

      <TextInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <TextInput
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.remember}
            onChange={(e) =>
              setFormData({ ...formData, remember: e.target.checked })
            }
            className="text-blue-500 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Remember me
          </span>
        </label>

        <button
          type="button"
          onClick={() => {
            /* Handle forgot password */
          }}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
        >
          Forgot password?
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;
