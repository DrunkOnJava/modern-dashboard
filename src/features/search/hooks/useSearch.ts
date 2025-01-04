import { useState, useCallback, useMemo } from 'react';
import type { DashboardCardData, CardType } from '@/types/dashboard';
import { filterCards } from '../utils/search';

export function useSearch(cards: DashboardCardData[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<CardType[]>([]);

  const applyFilters = useCallback(() => {
    return filterCards(cards, { searchTerm, selectedTypes });
  }, [cards, searchTerm, selectedTypes]);

  const filteredCards = useMemo(() => {
    return applyFilters();
  }, [applyFilters]);

  const toggleType = (type: CardType) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedTypes,
    toggleType,
    filteredCards
  };
}