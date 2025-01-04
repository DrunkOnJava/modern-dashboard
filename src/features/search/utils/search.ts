import type { DashboardCardData, CardType } from '../../../types/dashboard';

interface SearchOptions {
  searchTerm: string;
  selectedTypes: CardType[];
}

export function filterCards(cards: DashboardCardData[], options: SearchOptions): DashboardCardData[] {
  const { searchTerm, selectedTypes } = options;
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  // Return original cards if no filters are applied
  if (!normalizedSearch && !selectedTypes.length) {
    return cards;
  }
  
  // Apply filters
  return cards.filter(card => (
    // Search filter
    (!normalizedSearch || card.title.toLowerCase().includes(normalizedSearch)) &&
    // Type filter
    (!selectedTypes.length || (card.type && selectedTypes.includes(card.type)))
  ));
}