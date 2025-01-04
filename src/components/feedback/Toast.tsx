import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertCircle
};

const styles = {
  success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
};

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const Icon = icons[type];

  return (
    <div className={`flex items-center p-4 rounded-lg shadow-lg ${styles[type]}`}>
      <Icon className="w-5 h-5 mr-3" />
      <p className="mr-3 font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-300"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}