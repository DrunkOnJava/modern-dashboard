import { useEffect } from 'react';

interface ShortcutHandlers {
  onAddCard: () => void;
  onToggleSort: () => void;
  onToggleDarkMode: () => void;
  onExport: () => void;
  onImport: () => void;
}

export function useKeyboardShortcuts({
  onAddCard,
  onToggleSort,
  onToggleDarkMode,
  onExport,
  onImport
}: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no input/textarea is focused
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault();
            onAddCard();
            break;
          case 's':
            e.preventDefault();
            onToggleSort();
            break;
          case 'd':
            e.preventDefault();
            onToggleDarkMode();
            break;
          case 'e':
            e.preventDefault();
            onExport();
            break;
          case 'i':
            e.preventDefault();
            onImport();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onAddCard, onToggleSort, onToggleDarkMode, onExport, onImport]);
}