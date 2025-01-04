import React from 'react';
import { Database } from 'lucide-react';
import { APIConnectionList } from '../components/api/APIConnectionList';
import { APIConnectionForm } from '../components/api/APIConnectionForm';

export function APIConfig() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          API Configuration
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Active Connections
          </h2>
          <APIConnectionList />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Add New Connection
          </h2>
          <APIConnectionForm />
        </div>
      </div>
    </div>
  );
}