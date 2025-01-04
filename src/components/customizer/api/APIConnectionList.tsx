import React from 'react';
import { X } from 'lucide-react';
import type { APIConnection } from '../../../types/dashboard';
import { RefreshIntervalSelect } from './RefreshIntervalSelect';

interface APIConnectionListProps {
  connections: APIConnection[];
  onRemove: (id: string) => void;
  onUpdateInterval: (id: string, interval: number) => void;
}

export function APIConnectionList({ 
  connections, 
  onRemove, 
  onUpdateInterval 
}: APIConnectionListProps) {
  return (
    <div className="space-y-4">
      {connections.map(connection => (
        <div
          key={connection.id}
          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {connection.name}
            </span>
            <button
              onClick={() => onRemove(connection.id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {connection.endpoint}
          </div>
          
          <div className="flex items-center gap-4">
            <RefreshIntervalSelect
              value={connection.refreshInterval}
              onChange={(interval) => onUpdateInterval(connection.id, interval)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}