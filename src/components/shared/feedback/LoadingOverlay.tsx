import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  transparent?: boolean;
}

export function LoadingOverlay({ message = 'Loading...', transparent = false }: LoadingOverlayProps) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 
      ${transparent ? 'bg-black/25' : 'bg-white dark:bg-gray-900'}`}>
      <div className="text-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}