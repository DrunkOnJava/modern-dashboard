import React, { useState, useRef, useEffect } from 'react';
import { Portal } from '../shared/overlay/Portal';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className = ''
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPosition = () => {
    if (!triggerRef.current) return {};
    
    const rect = triggerRef.current.getBoundingClientRect();
    const spacing = 8;
    
    switch (position) {
      case 'top':
        return {
          bottom: window.innerHeight - rect.top + spacing,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)'
        };
      case 'right':
        return {
          top: rect.top + rect.height / 2,
          left: rect.right + spacing,
          transform: 'translateY(-50%)'
        };
      case 'bottom':
        return {
          top: rect.bottom + spacing,
          left: rect.left + rect.width / 2,
          transform: 'translateX(-50%)'
        };
      case 'left':
        return {
          top: rect.top + rect.height / 2,
          right: window.innerWidth - rect.left + spacing,
          transform: 'translateY(-50%)'
        };
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </div>
      
      {isVisible && (
        <Portal>
          <div
            style={getPosition()}
            className={`fixed z-50 px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 
              rounded shadow-lg pointer-events-none ${className}`}
            onMouseEnter={hideTooltip}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}