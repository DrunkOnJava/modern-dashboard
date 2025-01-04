import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle
};

const styles = {
  success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
};

export function Alert({ type, title, message, onClose }: AlertProps) {
  const Icon = icons[type];

  return (
    <div className={`rounded-lg p-4 ${styles[type]}`}>
      <div className="flex items-start">
        <Icon className="w-5 h-5 mt-0.5 mr-3" />
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 -mr-1.5 -mt-1.5 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          >
            <span className="sr-only">Dismiss</span>
            <AlertCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}