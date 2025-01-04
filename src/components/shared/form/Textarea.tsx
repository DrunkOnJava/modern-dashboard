import React from 'react';
import { FormGroup } from './FormGroup';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  required?: boolean;
}

export function Textarea({
  label,
  error,
  helper,
  required,
  className = '',
  ...props
}: TextareaProps) {
  return (
    <FormGroup label={label} error={error} helper={helper} required={required}>
      <textarea
        className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 
          dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...props}
      />
    </FormGroup>
  );
}