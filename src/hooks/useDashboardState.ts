import { useState } from 'react';
import type { DashboardCardData } from '../types/dashboard';

export function useDashboardState() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleCardSettings = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleAddCard = () => {
    setShowAddModal(true);
  };

  const handleCustomize = () => {
    setShowCustomizer(true);
  };

  const handleShowShortcuts = () => {
    setShowShortcuts(true);
  };

  const handleProfile = () => {
    setShowProfile(true);
  };

  return {
    selectedCard,
    showAddModal,
    showCustomizer,
    showShortcuts,
    showProfile,
    handleCardSettings,
    handleAddCard,
    handleCustomize,
    handleShowShortcuts,
    handleProfile,
    setSelectedCard,
    setShowAddModal,
    setShowCustomizer,
    setShowShortcuts,
    setShowProfile
  };
}