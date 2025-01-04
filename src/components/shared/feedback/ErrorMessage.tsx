import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div className={`flex items-center gap-2 text-sm text-red-500 ${className}`}>
      <AlertCircle className="w-4 h-4" />
      {message}
    </div>
  );
}