import { LucideIcon } from 'lucide-react';

export interface DashboardCardData {
  id: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
  minValue?: number;
  maxValue?: number;
  format?: string;
}

export type SortBy = 'title' | 'value';

export interface CardValue {
  value: string | number;
  trend?: number;
}