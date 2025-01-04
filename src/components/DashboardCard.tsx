import React from 'react';
import { LucideIcon } from 'lucide-react';
import {
  CompactCard,
  DetailedCard,
  GraphCard,
  ProgressCard,
  StatCard,
  TableCard
} from './cards';
import type { CardType } from '../types/dashboard';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: string;
  type?: CardType;
  minValue?: number;
  maxValue?: number;
  description?: string;
  history?: number[];
  onSettings?: () => void;
}

export function DashboardCard({
  title, 
  value, 
  icon,
  trend, 
  color = "blue",
  minValue = 0,
  maxValue = 100,
  type = "default",
  description,
  history = [],
  onSettings
}: DashboardCardProps) {
  const commonProps = {
    title,
    value,
    icon,
    color,
    onSettings
  };

  if (type === 'table') {
    return <TableCard {...commonProps} history={history} />;
  }

  if (type === 'stat') {
    return <StatCard {...commonProps} history={history} />;
  }

  if (type === 'progress') {
    return <ProgressCard {...commonProps} minValue={minValue} maxValue={maxValue} />;
  }

  if (type === 'compact') {
    return <CompactCard {...commonProps} trend={trend} />;
  }

  if (type === 'detailed') {
    return <DetailedCard {...commonProps} trend={trend} description={description} />;
  }

  if (type === 'graph') {
    return <GraphCard {...commonProps} history={history} />;
  }

  // Default to detailed card if no type specified
  return <DetailedCard {...commonProps} trend={trend} description={description} />;
}