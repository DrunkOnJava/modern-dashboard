import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: number;
  gap?: number;
  className?: string;
}

export function Grid({ 
  children, 
  cols = 4, 
  gap = 4,
  className = '' 
}: GridProps) {
  return (
    <div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} gap-${gap} ${className}`}
    >
      {children}
    </div>
  );
}