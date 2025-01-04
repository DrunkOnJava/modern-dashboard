import React, { useState, useCallback } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardGrid } from "./DashboardGrid";
import { DashboardSummary } from "./summary/DashboardSummary";
import { useDashboardCards } from "../hooks/useDashboardCards";
import { initialCards } from "../data/initialCards";
import { useDarkMode } from "../hooks/useDarkMode";
import { useToast } from "../hooks/useToast";
import { AddCardModal } from "./AddCardModal";
import { ShortcutsModal } from "./ShortcutsModal";
import { CardSettingsModal } from "./CardSettingsModal";
import { DashboardCustomizer } from "./DashboardCustomizer";
import type { DashboardCardData } from "../types/dashboard";

export default function Dashboard() {
	const [isDark, setIsDark] = useDarkMode();
	const { toasts, addToast } = useToast();
	const [groupCards, setGroupCards] = useState(false);
	const { cards, addCard, toggleSort, sortBy, updateCard } =
		useDashboardCards(initialCards);

	// Modal states
	const [showAddCard, setShowAddCard] = useState(false);
	const [showShortcuts, setShowShortcuts] = useState(false);
	const [showCustomizer, setShowCustomizer] = useState(false);
	const [selectedCard, setSelectedCard] = useState<DashboardCardData | null>(
		null
	);

	const summaryData = {
		totalCards: cards.length,
		activeUsers: 1250,
		growthRate: 12.5,
	};

	const handleExport = () => {
		const exportData = {
			cards,
			settings: {
				groupCards,
				sortBy,
			},
		};
		const dataStr = JSON.stringify(exportData, null, 2);
		const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
			dataStr
		)}`;

		const link = document.createElement("a");
		link.href = dataUri;
		link.download = "dashboard-export.json";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		addToast("success", "Dashboard exported successfully");
	};

	const handleImport = () => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".json";

		input.onchange = (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (event) => {
					try {
						const importedData = JSON.parse(event.target?.result as string);
						// TODO: Implement import logic
						addToast("success", "Dashboard imported successfully");
					} catch (error) {
						addToast(
							"error",
							"Failed to import dashboard: Invalid file format"
						);
					}
				};
				reader.readAsText(file);
			}
		};

		input.click();
	};

	const handleCardSettings = useCallback(
		(cardId: string) => {
			const card = cards.find((c) => c.id === cardId);
			if (card) {
				setSelectedCard(card);
			}
		},
		[cards]
	);

	const handleSaveCardSettings = (settings: Partial<DashboardCardData>) => {
		if (selectedCard) {
			updateCard(selectedCard.id, settings);
			setSelectedCard(null);
			addToast("success", "Card settings updated");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20 px-6 pb-6">
			<DashboardHeader
				onToggleSort={toggleSort}
				onAddCard={() => setShowAddCard(true)}
				sortBy={sortBy}
				isDark={isDark}
				onToggleDarkMode={() => setIsDark(!isDark)}
				onExport={handleExport}
				onImport={handleImport}
				onShowShortcuts={() => setShowShortcuts(true)}
				onCustomize={() => setShowCustomizer(true)}
				onProfile={() => (window.location.href = "/profile")}
				groupCards={groupCards}
				onToggleGrouping={() => setGroupCards(!groupCards)}
			/>

			<DashboardSummary data={summaryData} />

			<DashboardGrid
				cards={cards}
				onCardSettings={handleCardSettings}
				groupCards={groupCards}
			/>

			{/* Modals */}
			{showAddCard && (
				<AddCardModal
					onAdd={(card) => {
						addCard(card);
						setShowAddCard(false);
						addToast("success", "Card added successfully");
					}}
					onClose={() => setShowAddCard(false)}
				/>
			)}

			{showShortcuts && (
				<ShortcutsModal onClose={() => setShowShortcuts(false)} />
			)}

			{selectedCard && (
				<CardSettingsModal
					card={selectedCard}
					onSave={handleSaveCardSettings}
					onClose={() => setSelectedCard(null)}
				/>
			)}

			{showCustomizer && <DashboardCustomizer />}
		</div>
	);
}
