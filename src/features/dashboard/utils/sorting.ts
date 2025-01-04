import type { DashboardCardData } from '../types';

export function sortCardValues(cards: DashboardCardData[], sortBy: 'title' | 'value') {
  return [...cards].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    const aVal = typeof a.value === 'string' ? parseFloat(a.value) : a.value;
    const bVal = typeof b.value === 'string' ? parseFloat(b.value) : b.value;
    return bVal - aVal;
  });
}