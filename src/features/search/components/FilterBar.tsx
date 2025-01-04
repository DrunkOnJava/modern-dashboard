import React from 'react';
import { Filter } from 'lucide-react';
import { FilterChip } from './FilterChip';
import { CARD_TYPE_OPTIONS } from '../constants';
import type { CardType } from '../../../types/dashboard';

interface FilterBarProps {
  selectedTypes: CardType[];
  onToggleType: (type: CardType) => void;
}

export function FilterBar({ selectedTypes, onToggleType }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <Filter className="w-5 h-5" />
        <span className="text-sm font-medium">Filter:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {CARD_TYPE_OPTIONS.map(({ value, label }) => (
          <FilterChip
            key={value}
            label={label}
            selected={selectedTypes.includes(value)}
            onClick={() => onToggleType(value)}
          />
        ))}
      </div>
    </div>
  );
}