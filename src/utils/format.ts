export function formatValue(value: number, format?: string): string {
  const formattedNumber = value.toLocaleString('en-US');

  if (!format) return formattedNumber;
  
  if (format.startsWith(' ')) {
    return `${formattedNumber}${format}`;
  }
  
  if (format === '$') {
    return `${format}${formattedNumber}`;
  }
  
  return `${formattedNumber}${format}`;
}