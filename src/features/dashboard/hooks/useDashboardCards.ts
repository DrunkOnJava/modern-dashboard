import { useState, useEffect } from 'react';
import type { DashboardCardData } from '../types';
import { generateCardValue } from '../utils/cardHelpers';

const REFRESH_INTERVAL = 2000;

export function useDashboardCards(initialCards: DashboardCardData[]) {
  const [cards, setCards] = useState(initialCards);
  const [cardValues, setCardValues] = useState<DashboardCardData[]>(initialCards);
  const [sortBy, setSortBy] = useState<'title' | 'value'>('title');

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCardValues(prevCards => 
        prevCards.map(card => ({
          ...card,
          value: generateCardValue(card)
        }))
      );
    }, REFRESH_INTERVAL);

    return () => clearInterval(updateInterval);
  }, [cards]);

  const addCard = (card: DashboardCardData) => {
    const newCard = {
      ...card,
      value: generateCardValue(card)
    };
    setCards(prev => [...prev, card]);
    setCardValues(prev => [...prev, newCard]);
  };

  const toggleSort = () => {
    setSortBy(prev => prev === 'title' ? 'value' : 'title');
  };

  return {
    cards: sortCardValues(cardValues, sortBy),
    addCard,
    toggleSort,
    sortBy
  };
}