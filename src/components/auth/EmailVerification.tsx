import React from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../shared/feedback/LoadingSpinner';
import { ErrorMessage } from '../shared/feedback/ErrorMessage';

export function EmailVerification() {
  const { user, resendVerificationEmail } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await resendVerificationEmail();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <Mail className="mx-auto h-12 w-12 text-blue-500" />
      <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
        Verify your email
      </h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        We sent a verification email to {user?.email}.<br />
        Please check your email to continue.
      </p>

      {error && <ErrorMessage message={error} className="mt-4" />}
      
      {success && (
        <p className="mt-4 text-sm text-green-500">
          Verification email sent successfully
        </p>
      )}

      <button
        onClick={handleResend}
        disabled={loading}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent 
          text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? <LoadingSpinner size="sm" /> : 'Resend verification email'}
      </button>
    </div>
  );
}