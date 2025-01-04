import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Portal } from './Portal';

interface DrawerProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  showClose?: boolean;
  className?: string;
}

const sizes = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96'
};

export function Drawer({ 
  title, 
  children, 
  onClose, 
  position = 'right',
  size = 'md',
  showClose = true,
  className = '' 
}: DrawerProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const positionClasses = {
    left: '-translate-x-full left-0',
    right: 'translate-x-full right-0'
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
          
          <div className={`fixed inset-y-0 ${sizes[size]} overflow-hidden
            ${position === 'left' ? 'left-0' : 'right-0'}`}>
            <div className={`h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform
              ${className}`}>
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
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
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}