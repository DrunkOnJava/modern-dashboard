import React from 'react';
import { FormGroup } from './FormGroup';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export function Checkbox({ label, description, error, className = '', ...props }: CheckboxProps) {
  return (
    <FormGroup error={error}>
      <label className="flex items-start cursor-pointer">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={`h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 
              dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800 ${className}`}
            {...props}
          />
        </div>
        <div className="ml-3">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </label>
    </FormGroup>
  );
}