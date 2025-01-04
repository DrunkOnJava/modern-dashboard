import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterBar } from './FilterBar';
import { useSearch } from '../hooks/useSearch';
import type { DashboardCardData } from '@/types/dashboard';

interface SearchAndFilterProps {
  cards: DashboardCardData[];
  onFilteredCardsChange: (cards: DashboardCardData[]) => void;
}

export function SearchAndFilter({ cards, onFilteredCardsChange }: SearchAndFilterProps) {
  const { searchTerm, setSearchTerm, selectedTypes, toggleType, filteredCards } = useSearch(cards);

  // Update parent component when filters change
  React.useEffect(() => {
    onFilteredCardsChange(filteredCards);
  }, [filteredCards]);

  return (
    <div className="space-y-4">
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
      />
      <FilterBar
        selectedTypes={selectedTypes}
        onToggleType={toggleType}
      />
    </div>
  );
}