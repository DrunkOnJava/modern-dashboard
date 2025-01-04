```typescript
import React, { useState } from 'react';
import { Shield, Plus, X } from 'lucide-react';
import { useWhitelist } from '../../hooks/useWhitelist';

export function WhitelistManager() {
  const { whitelist, addIp, removeIp, loading, error } = useWhitelist();
  const [newIp, setNewIp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIp) {
      addIp(newIp);
      setNewIp('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          IP Whitelist
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newIp}
            onChange={(e) => setNewIp(e.target.value)}
            placeholder="Enter IP address"
            className="flex-1 rounded-md border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 
              transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add IP
          </button>
        </div>
      </form>

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      <div className="space-y-2">
        {whitelist.map((ip) => (
          <div
            key={ip}
            className="flex items-center justify-between p-2 bg-gray-50 
              dark:bg-gray-700 rounded-md"
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">{ip}</span>
            <button
              onClick={() => removeIp(ip)}
              className="p-1 text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```