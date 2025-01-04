import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Portal } from './Portal';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showClose?: boolean;
  className?: string;
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl'
};

export function Modal({ 
  title, 
  children, 
  onClose, 
  size = 'md',
  showClose = true,
  className = '' 
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <Portal>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
          
          <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-xl 
            ${sizes[size]} w-full p-6 transform transition-all ${className}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h2>
              {showClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}