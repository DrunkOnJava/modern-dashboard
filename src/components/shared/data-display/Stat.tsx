import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: number;
  className?: string;
}

export function Stat({ label, value, icon: Icon, trend, className = '' }: StatProps) {
  return (
    <div className={`p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center">
        {Icon && (
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {trend !== undefined && (
            <p className={`mt-1 text-sm ${
              trend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            }`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}