import React, { forwardRef } from 'react';
import { FormField } from './FormField';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <FormField label={label} error={error}>
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 
            dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
            ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
          {...props}
        />
      </FormField>
    );
  }
);