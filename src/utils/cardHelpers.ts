import type { DashboardCardData } from '../types/dashboard';
import { formatValue } from './format';
import { generateRandomValue } from './random';
import { LucideIcon } from 'lucide-react';

export const generateCardValue = (card: DashboardCardData): string | number => {
  return formatValue(
    generateRandomValue(card.minValue || 0, card.maxValue || 100),
    card.format
  );
};

export const getCardCategory = (card: DashboardCardData): string => {
  const iconName = (card.icon as LucideIcon).displayName || '';
  
  if (iconName.includes('User')) return 'User Metrics';
  if (iconName.includes('Dollar') || iconName.includes('Shopping') || iconName.includes('Package')) return 'Business';
  if (iconName.includes('Cpu') || iconName.includes('Server') || iconName.includes('Hard') || iconName.includes('Signal')) return 'System Performance';
  if (iconName.includes('Battery') || iconName.includes('Thermometer') || iconName.includes('Cloud')) return 'Environment';
  if (iconName.includes('Activity') || iconName.includes('Chart') || iconName.includes('Trending')) return 'Analytics';
  return 'Other';
};

export const groupCardsByCategory = (cards: DashboardCardData[]): Record<string, DashboardCardData[]> => {
  const grouped = cards.reduce((acc, card) => {
    const category = getCardCategory(card);
    if (!acc[category]) acc[category] = [];
    acc[category].push(card);
    return acc;
  }, {} as Record<string, DashboardCardData[]>);

  // Sort categories by priority
  const categoryOrder = [
    'User Metrics',
    'Business',
    'System Performance',
    'Analytics',
    'Environment',
    'Other'
  ];

  return Object.fromEntries(
    categoryOrder
      .filter(category => grouped[category]?.length > 0)
      .map(category => [category, grouped[category]])
  );
};