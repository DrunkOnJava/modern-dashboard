import React from 'react';
import { Database, Trash2 } from 'lucide-react';
import { useAPIConnections } from '../../hooks/useAPIConnections';
import { APIStatusBadge } from './APIStatusBadge';

export function APIConnectionList() {
  const { connections, loading, error, deleteConnection } = useAPIConnections();

  if (loading) {
    return <div className="animate-pulse">Loading API connections...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {connection.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {connection.endpoint}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <APIStatusBadge enabled={connection.enabled} />
              <button
                onClick={() => deleteConnection(connection.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}