import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TextInput } from '../shared/form/TextInput';
import { LoadingSpinner } from '../shared/feedback/LoadingSpinner';
import { ErrorMessage } from '../shared/feedback/ErrorMessage';

export function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      setLoading(true);
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {error && <ErrorMessage message={error} />}
      
      {success && (
        <p className="text-sm text-green-500">
          Password reset instructions have been sent to your email
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          transition-colors disabled:opacity-50"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Reset Password'}
      </button>
    </form>
  );
}