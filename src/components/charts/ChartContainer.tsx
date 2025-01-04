import React from 'react';
import { Settings } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onSettings?: () => void;
  className?: string;
}

export function ChartContainer({
  title,
  subtitle,
  children,
  onSettings,
  className = ''
}: ChartContainerProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        {onSettings && (
          <button
            onClick={onSettings}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}