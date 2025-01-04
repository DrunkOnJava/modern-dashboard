import React from 'react';
import { Database, Download, Upload } from 'lucide-react';
import { useBackups } from '../../hooks/useBackups';

export function BackupSettings() {
  const { createBackup, restoreBackup, loading, error } = useBackups();

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      restoreBackup(file);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Backup & Restore
        </h2>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">{error}</p>
      )}

      <div className="space-y-4">
        <button
          onClick={createBackup}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          Create Backup
        </button>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Restore from Backup
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".json"
              onChange={handleRestore}
              disabled={loading}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                dark:file:bg-blue-900 dark:file:text-blue-200
                hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
            />
            <Upload className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}