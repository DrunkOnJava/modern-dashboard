import React from 'react';

interface RefreshIntervalSelectProps {
  value: number;
  onChange: (interval: number) => void;
}

const intervals = [
  { value: 5000, label: '5s' },
  { value: 15000, label: '15s' },
  { value: 30000, label: '30s' },
  { value: 60000, label: '1m' }
];

export function RefreshIntervalSelect({ value, onChange }: RefreshIntervalSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 dark:text-gray-300">
        Refresh:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded px-2 py-1"
      >
        {intervals.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}