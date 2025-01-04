import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TextInput } from '../shared/form/TextInput';
import { LoadingSpinner } from '../shared/feedback/LoadingSpinner';
import { ErrorMessage } from '../shared/feedback/ErrorMessage';
import { supabase } from '../../lib/supabase';

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    avatar: null as File | null
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      
      let avatar_url = user?.user_metadata?.avatar_url;

      if (formData.avatar) {
        const fileExt = formData.avatar.name.split('.').pop();
        const filePath = `${user?.id}/${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, formData.avatar);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        avatar_url = publicUrl;
      }

      await updateProfile({
        fullName: formData.fullName,
        avatar_url
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          <img
            src={user?.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <TextInput
        label="Full Name"
        type="text"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />

      {error && <ErrorMessage message={error} />}

      <div className="flex justify-between">
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
            transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="sm" /> : 'Update Profile'}
        </button>

        <button
          type="button"
          onClick={() => {/* Handle account deletion */}}
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 
            transition-colors"
        >
          Delete Account
        </button>
      </div>
    </form>
  );
}