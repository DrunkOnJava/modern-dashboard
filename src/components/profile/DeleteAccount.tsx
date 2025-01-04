import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';

export function DeleteAccount() {
  const { signOut } = useAuth();
  const { addToast } = useToast();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Implement account deletion logic
      await signOut();
      addToast('success', 'Account deleted successfully');
    } catch (error) {
      addToast('error', 'Failed to delete account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Trash2 className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Account</h3>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
          Warning: This action cannot be undone
        </h4>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          Deleting your account will permanently remove all your data, including dashboards,
          settings, and preferences.
        </p>

        {!showConfirm ? (
          <button
            onClick={() => setShowConfirm(true)}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              Are you absolutely sure you want to delete your account?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
                  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 
                  dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}