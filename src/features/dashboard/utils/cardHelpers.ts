import type { DashboardCardData } from '../types';
import { formatValue } from '@/utils/format';
import { generateRandomValue } from '@/utils/random';

export function generateCardValue(card: DashboardCardData): string | number {
  return formatValue(
    generateRandomValue(card.minValue || 0, card.maxValue || 100),
    card.format
  );
}

export function sortCards(cards: DashboardCardData[], sortBy: 'title' | 'value') {
  return [...cards].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    const aVal = typeof a.value === 'string' ? parseFloat(a.value) : a.value;
    const bVal = typeof b.value === 'string' ? parseFloat(b.value) : b.value;
    return bVal - aVal;
  });
}