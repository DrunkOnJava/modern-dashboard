export function generateRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}