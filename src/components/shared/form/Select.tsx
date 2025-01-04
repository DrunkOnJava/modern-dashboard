import React, { forwardRef } from 'react';
import { FormField } from './FormField';

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: SelectOption[];
  error?: string;
  onChange: (value: string | number) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, value, onChange, className = '', ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 
            dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </FormField>
    );
  }
);