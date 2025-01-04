import React from 'react';

interface WidgetContentProps {
  children: React.ReactNode;
  className?: string;
}

export function WidgetContent({ children, className = "" }: WidgetContentProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}