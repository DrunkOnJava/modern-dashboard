import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { TextInput } from "../shared/form/TextInput";
import { LoadingSpinner } from "../shared/feedback/LoadingSpinner";
import { ErrorMessage } from "../shared/feedback/ErrorMessage";

function RegistrationForm() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Validate password requirements
      if (
        formData.password.length < 8 ||
        !/[0-9]/.test(formData.password) ||
        !/[!@#$%^&*]/.test(formData.password)
      ) {
        throw new Error(
          "Password must be at least 8 characters and contain at least one number and one special character"
        );
      }

      setLoading(true);
      await signUp(formData.email, formData.password, formData.fullName);

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create account";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Full Name"
        type="text"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />

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

      <TextInput
        label="Confirm Password"
        type="password"
        value={formData.confirmPassword}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        required
      />

      {error && <ErrorMessage message={error} />}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? <LoadingSpinner size="sm" /> : "Create Account"}
      </button>
    </form>
  );
}

export default RegistrationForm;
