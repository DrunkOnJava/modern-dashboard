export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatValue(value: number, format?: string): string {
  // Format number with commas for thousands
  const formattedNumber = value.toLocaleString('en-US');

  if (!format) return value.toString();
  
  // Format starts with a space - append unit
  if (format.startsWith(' ')) {
    return `${formattedNumber}${format}`;
  }
  
  // Format is a prefix (like $) - prepend unit
  if (format === '$') {
    return `${format}${formattedNumber}`;
  }
  
  // All other cases - append unit
  return `${formattedNumber}${format}`;
}

export function sortCards(cards: DashboardCardData[], sortBy: 'title' | 'value') {
  return [...cards].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    const aVal = typeof a.value === 'string' ? parseFloat(a.value) : a.value;
    const bVal = typeof b.value === 'string' ? parseFloat(b.value) : b.value;
    return bVal - aVal;
  });
}