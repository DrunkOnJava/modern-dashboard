import React from 'react';
import { Settings } from 'lucide-react';
import { colorMappings } from '../../utils/colors';
import { LoadingSpinner } from '../shared/feedback/LoadingSpinner';
import { ErrorMessage } from '../shared/feedback/ErrorMessage';

interface BaseCardProps {
  title: string;
  error?: string | null;
  loading?: boolean;
  retrying?: boolean;
  retryCount?: number;
  onSettings?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function BaseCard({ 
  title, 
  error,
  loading,
  retrying,
  retryCount,
  onSettings,
  children,
  className = ""
}: BaseCardProps) {
  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <ErrorMessage message={error} />
          {retrying && (
            <p className="mt-2 text-sm text-gray-500">
              Retrying... (Attempt {retryCount} of 3)
            </p>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center ${className}`}>
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
        {onSettings && (
          <button
            onClick={onSettings}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Card settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}