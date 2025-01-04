import React, { useState } from 'react';
import { Shield, Key, Smartphone } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export function SecuritySettings() {
  const { addToast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Implement password change logic
      addToast('success', 'Password updated successfully');
    } catch (error) {
      addToast('error', 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Shield className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Security Settings</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={twoFactorEnabled}
                onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
          </label>
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Smartphone className="w-4 h-4" />
                <span>Scan QR code with your authenticator app</span>
              </div>
              {/* Add QR code component here */}
            </div>
          )}
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
                focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}