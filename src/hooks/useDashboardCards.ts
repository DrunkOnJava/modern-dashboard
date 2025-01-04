import { useState, useEffect } from "react";
import { generateRandomValue } from "./useRandomData";
import type { DashboardCardData } from "../types/dashboard";
import { formatValue, sortCards } from "../utils/helpers";

const REFRESH_INTERVAL = 2000;

function generateCardValue(card: DashboardCardData): string | number {
	return formatValue(
		generateRandomValue(card.minValue || 0, card.maxValue || 100),
		card.format
	);
}

export function useDashboardCards(initialCards: DashboardCardData[]) {
	const [cards, setCards] = useState(initialCards);
	const [cardValues, setCardValues] =
		useState<DashboardCardData[]>(initialCards);
	const [sortBy, setSortBy] = useState<"title" | "value">("title");

	const updateCardSettings = (
		cardId: string,
		settings: Partial<DashboardCardData>
	) => {
		setCards((prevCards: DashboardCardData[]) =>
			prevCards.map((card: DashboardCardData) =>
				card.id === cardId ? { ...card, ...settings } : card
			)
		);
	};

	useEffect(() => {
		const updateInterval = setInterval(() => {
			setCardValues((prevCards: DashboardCardData[]) =>
				prevCards.map((card: DashboardCardData) => ({
					...card,
					value: generateCardValue(card),
				}))
			);
		}, REFRESH_INTERVAL);

		return () => clearInterval(updateInterval);
	}, [cards]);

	const addCard = (card: DashboardCardData) => {
		const newCard = {
			...card,
			value: generateCardValue(card),
		};
		setCards((prev: DashboardCardData[]) => [...prev, card]);
		setCardValues((prev: DashboardCardData[]) => [...prev, newCard]);
	};

	const sortedCards = sortCards(cardValues, sortBy);

	const toggleSort = () => {
		setSortBy((prev: "title" | "value") =>
			prev === "title" ? "value" : "title"
		);
	};

	return {
		cards: sortedCards,
		addCard,
		updateCard: updateCardSettings, // renamed for consistency with Dashboard.tsx
		toggleSort,
		sortBy,
	};
}
