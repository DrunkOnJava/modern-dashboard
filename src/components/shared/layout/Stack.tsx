import React from 'react';

interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
}

export function Stack({
  children,
  direction = 'column',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = ''
}: StackProps) {
  const alignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  };

  const justifications = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around'
  };

  return (
    <div
      className={`flex ${direction === 'column' ? 'flex-col' : 'flex-row'} 
        ${wrap ? 'flex-wrap' : ''} 
        ${alignments[align]} 
        ${justifications[justify]} 
        gap-${spacing} 
        ${className}`}
    >
      {children}
    </div>
  );
}