import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    avatar: null as File | null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile({
        fullName: formData.fullName,
        avatar_url: formData.avatar ? URL.createObjectURL(formData.avatar) : undefined
      });
      addToast('success', 'Profile updated successfully');
    } catch (error) {
      addToast('error', 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white 
            focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Profile Picture
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFormData({ ...formData, avatar: e.target.files?.[0] || null })}
          className="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
            file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
            dark:file:bg-blue-900 dark:file:text-blue-200
            hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </div>
    </form>
  );
}