import React from 'react';
import { KPI } from './KPI';
import type { LucideIcon } from 'lucide-react';

interface KPIData {
  id: string;
  title: string;
  value: string | number;
  target?: number;
  icon?: LucideIcon;
  trend?: number;
  progress?: number;
}

interface KPIGroupProps {
  kpis: KPIData[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function KPIGroup({ kpis, columns = 4, className = '' }: KPIGroupProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-4 ${className}`}>
      {kpis.map(kpi => (
        <KPI key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}