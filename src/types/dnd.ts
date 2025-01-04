import type { DraggableLocation } from 'react-beautiful-dnd';

export interface DragEndResult {
  draggableId: string;
  type: string;
  source: DraggableLocation;
  destination?: DraggableLocation;
  reason: 'DROP' | 'CANCEL';
}