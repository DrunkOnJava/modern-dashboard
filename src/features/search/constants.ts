import type { CardType } from '../../types/dashboard';

export const CARD_TYPE_OPTIONS: { value: CardType; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'compact', label: 'Compact' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'graph', label: 'Graph' },
  { value: 'table', label: 'Table' },
  { value: 'stat', label: 'Statistics' },
  { value: 'progress', label: 'Progress' }
];