import React, { useState } from 'react';
import { Terminal } from './Terminal';
import { TerminalToolbar } from './TerminalToolbar';

export function TerminalContainer() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleMaximize = () => setIsMaximized(true);
  const handleMinimize = () => setIsMaximized(false);
  const handleClose = () => setIsVisible(false);

  if (!isVisible) return null;

  return (
    <div className={`fixed transition-all duration-300 bg-gray-900 rounded-lg overflow-hidden shadow-xl ${
      isMaximized 
        ? 'inset-4 z-50' 
        : 'right-4 bottom-4 w-[600px] h-[400px] z-40'
    }`}>
      <TerminalToolbar
        isMaximized={isMaximized}
        onMaximize={handleMaximize}
        onMinimize={handleMinimize}
        onClose={handleClose}
      />
      <Terminal />
    </div>
  );
}