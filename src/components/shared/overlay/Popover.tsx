import React, { useState, useRef, useEffect } from 'react';
import { Portal } from './Portal';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export function Popover({ 
  trigger, 
  content, 
  position = 'bottom',
  className = '' 
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPosition = () => {
    if (!triggerRef.current) return {};
    
    const rect = triggerRef.current.getBoundingClientRect();
    
    switch (position) {
      case 'top':
        return {
          bottom: window.innerHeight - rect.top + 8,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)'
        };
      case 'right':
        return {
          top: rect.top,
          left: rect.right + 8
        };
      case 'bottom':
        return {
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)'
        };
      case 'left':
        return {
          top: rect.top,
          right: window.innerWidth - rect.left + 8
        };
    }
  };

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <Portal>
          <div
            ref={contentRef}
            style={getPosition()}
            className={`fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
              border border-gray-200 dark:border-gray-700 p-4 min-w-[200px] ${className}`}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}