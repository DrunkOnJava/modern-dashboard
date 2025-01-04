export function formatMetricValue(
  value: number,
  type: 'number' | 'percentage' | 'time' | 'currency',
  unit?: string
): string {
  switch (type) {
    case 'number':
      return value.toLocaleString();
    case 'percentage':
      return `${value.toFixed(1)}%`;
    case 'time':
      return `${value}${unit || 'ms'}`;
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    default:
      return value.toString();
  }
}