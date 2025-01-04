import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  label?: string;
}

export function Divider({ orientation = 'horizontal', className = '', label }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div className={`h-full w-px bg-gray-200 dark:bg-gray-700 ${className}`} />
    );
  }

  if (label) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <hr className={`border-gray-200 dark:border-gray-700 ${className}`} />
  );
}