import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LayoutOptionProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function LayoutOption({ icon: Icon, label, selected, onClick }: LayoutOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-colors
        ${selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-200'}`}
    >
      <Icon className="w-6 h-6 mx-auto mb-2 text-gray-700 dark:text-gray-300" />
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
    </button>
  );
}