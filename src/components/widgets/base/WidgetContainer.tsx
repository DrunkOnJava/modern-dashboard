import React from 'react';
import { Settings } from 'lucide-react';
import { colorMappings } from '../../../utils/colors';

interface WidgetContainerProps {
  title: string;
  error?: string | null;
  loading?: boolean;
  onSettings?: () => void;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

export function WidgetContainer({
  title,
  error,
  loading,
  onSettings,
  children,
  className = "",
  color = "blue"
}: WidgetContainerProps) {
  const colorClasses = colorMappings[color] || colorMappings.blue;

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-blue-500"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</h3>
        {onSettings && (
          <button
            onClick={onSettings}
            className={`p-1.5 rounded-lg text-gray-400 hover:${colorClasses.light} dark:hover:${colorClasses.dark} 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            aria-label="Widget settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}