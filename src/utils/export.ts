import type { DashboardCardData } from '../types/dashboard';

export function exportDashboard(cards: DashboardCardData[]) {
  const data = {
    version: '1.0',
    timestamp: new Date().toISOString(),
    cards: cards.map(card => ({
      ...card,
      // Convert icon reference to string name for serialization
      icon: (card.icon as any).name
    }))
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importDashboard(file: File): Promise<DashboardCardData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        // Validate the imported data
        if (!data.version || !Array.isArray(data.cards)) {
          throw new Error('Invalid dashboard file format');
        }

        // Convert icon names back to actual icon components
        const cards = data.cards.map((card: any) => ({
          ...card,
          icon: require('lucide-react')[card.icon]
        }));

        resolve(cards);
      } catch (error) {
        reject(new Error('Failed to parse dashboard file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read dashboard file'));
    reader.readAsText(file);
  });
}