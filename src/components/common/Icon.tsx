import React from 'react';
import { LucideIcon } from 'lucide-react';
import { colorMappings } from '../../utils/colors';

interface IconProps {
  icon: LucideIcon;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
};

export function Icon({ icon: LucideIcon, color = 'blue', size = 'md', className = '' }: IconProps) {
  return (
    <div className={`${colorMappings[color]?.light} ${colorMappings[color]?.dark} ${className}`}>
      <LucideIcon className={sizeMap[size]} />
    </div>
  );
}