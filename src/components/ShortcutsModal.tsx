import React from 'react';
import { X, Command } from 'lucide-react';

interface ShortcutsModalProps {
  onClose: () => void;
}

const shortcuts = [
  { keys: ['⌘/Ctrl', 'N'], description: 'Add new card' },
  { keys: ['⌘/Ctrl', 'S'], description: 'Toggle sort' },
  { keys: ['⌘/Ctrl', 'D'], description: 'Toggle dark mode' },
  { keys: ['⌘/Ctrl', 'E'], description: 'Export dashboard' },
  { keys: ['⌘/Ctrl', 'I'], description: 'Import dashboard' },
  { keys: ['?'], description: 'Show keyboard shortcuts' }
];

export function ShortcutsModal({ onClose }: ShortcutsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map(({ keys, description }) => (
            <div
              key={description}
              className="flex items-center justify-between py-2"
            >
              <span className="text-gray-600 dark:text-gray-400">
                {description}
              </span>
              <div className="flex items-center gap-1">
                {keys.map((key, index) => (
                  <React.Fragment key={key}>
                    <kbd className="px-2 py-1 text-sm font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                      {key}
                    </kbd>
                    {index < keys.length - 1 && (
                      <span className="text-gray-400">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}