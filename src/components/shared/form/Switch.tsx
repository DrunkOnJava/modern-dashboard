import React from 'react';

interface SwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Switch({ label, description, checked, onChange }: SwitchProps) {
  return (
    <label className="flex items-start cursor-pointer">
      <div className="relative inline-block w-10 mr-4 align-middle select-none mt-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-10 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 
          peer-checked:after:translate-x-full peer-checked:bg-blue-600
          after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
          after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" 
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </span>
        {description && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}