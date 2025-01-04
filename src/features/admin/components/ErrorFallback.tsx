import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  componentName?: string;
  resetError?: () => void;
}

export function ErrorFallback({ error, componentName, resetError }: ErrorFallbackProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex items-center gap-3 text-red-500 mb-4">
        <AlertTriangle className="w-6 h-6" />
        <h3 className="text-lg font-medium">
          {componentName ? `${componentName} Error` : 'Something went wrong'}
        </h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {error.message}
      </p>
      {resetError && (
        <button
          onClick={resetError}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}