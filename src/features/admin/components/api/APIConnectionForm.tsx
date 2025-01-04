import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface APIConnectionFormProps {
  onSubmit: (connection: {
    name: string;
    endpoint: string;
    key: string;
  }) => void;
  isValidating?: boolean;
  error?: string | null;
}

export function APIConnectionForm({ onSubmit, isValidating, error }: APIConnectionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    endpoint: '',
    key: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', endpoint: '', key: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Connection Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          API Endpoint
        </label>
        <input
          type="url"
          value={formData.endpoint}
          onChange={(e) => setFormData(prev => ({ ...prev, endpoint: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          API Key
        </label>
        <input
          type="password"
          value={formData.key}
          onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={isValidating}
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          <Check className="w-5 h-5" />
          Add Connection
        </span>
      </button>
    </form>
  );
}