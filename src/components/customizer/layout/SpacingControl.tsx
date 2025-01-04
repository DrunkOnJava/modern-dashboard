import React from 'react';

interface SpacingControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function SpacingControl({ value, onChange }: SpacingControlProps) {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="8"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Compact</span>
        <span>Spacious</span>
      </div>
    </div>
  );
}