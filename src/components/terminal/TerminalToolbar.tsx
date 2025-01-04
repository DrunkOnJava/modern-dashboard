import React from 'react';
import { Terminal, Maximize2, Minimize2, X } from 'lucide-react';

interface TerminalToolbarProps {
  onMaximize?: () => void;
  onMinimize?: () => void;
  onClose?: () => void;
  isMaximized?: boolean;
}

export function TerminalToolbar({ 
  onMaximize, 
  onMinimize, 
  onClose,
  isMaximized 
}: TerminalToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-300">Terminal</span>
      </div>
      <div className="flex items-center gap-2">
        {isMaximized ? (
          <button 
            onClick={onMinimize}
            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={onMaximize}
            className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}