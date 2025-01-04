import type { DragEndResult } from '../types/dnd';
import type { DashboardCardData } from '../types/dashboard';

export function useDragAndDrop(
  cards: DashboardCardData[],
  reorderCards: (startIndex: number, endIndex: number) => void
) {
  const handleDragEnd = (result: DragEndResult) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    if (
      destination.droppableId === source.droppableId &&
      destination.index !== source.index
    ) {
      reorderCards(source.index, destination.index);
    }
  };

  return { handleDragEnd };
}