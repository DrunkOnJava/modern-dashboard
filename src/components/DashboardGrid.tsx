import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { DashboardCardData } from '../types/dashboard';
import { DashboardCard } from './DashboardCard';
import { groupCardsByCategory } from '../utils/cardHelpers';

interface DashboardGridProps {
  cards: DashboardCardData[];
  onCardSettings: (cardId: string) => void;
  groupCards?: boolean;
}

interface CategorySectionProps {
  title: string;
  cards: DashboardCardData[];
  onCardSettings: (cardId: string) => void;
}

function CategorySection({ title, cards, onCardSettings }: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-white 
          hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
      >
        {isExpanded ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
        {title}
      </button>
      
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cards.map((card) => (
            <DashboardCard
              key={card.id}
              {...card}
              onSettings={() => onCardSettings(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function DashboardGrid({ cards, onCardSettings, groupCards = false }: DashboardGridProps) {
  if (!groupCards) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            {...card}
            onSettings={() => onCardSettings(card.id)}
          />
        ))}
      </div>
    );
  }
  const categorizedCards = groupCardsByCategory(cards);

  return (
    <div className="space-y-8">
      {Object.entries(categorizedCards).map(([category, categoryCards]) => (
        <CategorySection
          key={category}
          title={category}
          cards={categoryCards}
          onCardSettings={onCardSettings}
        />
      ))}
    </div>
  );
}