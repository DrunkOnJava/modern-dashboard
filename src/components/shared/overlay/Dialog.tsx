import React from 'react';
import { Modal } from './Modal';

interface DialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'info' | 'warning' | 'danger';
  className?: string;
}

const variants = {
  info: 'bg-blue-500 hover:bg-blue-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600',
  danger: 'bg-red-500 hover:bg-red-600'
};

export function Dialog({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info',
  className = ''
}: DialogProps) {
  return (
    <Modal title={title} onClose={onCancel} size="sm" className={className}>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {message}
      </p>
      
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 
            dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 
            transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-white rounded-lg transition-colors ${variants[variant]}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}