import React from 'react';
import { FormGroup } from './FormGroup';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required
}: RadioGroupProps) {
  return (
    <FormGroup label={label} error={error} required={required}>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-start cursor-pointer">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="h-4 w-4 border-gray-300 text-blue-500 focus:ring-blue-500
                  dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {option.label}
              </span>
              {option.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </FormGroup>
  );
}