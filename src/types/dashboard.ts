import { LucideIcon } from "lucide-react";

export type CardType =
  | "default"
  | "compact"
  | "detailed"
  | "graph"
  | "table"
  | "stat"
  | "progress";

export type LayoutType = "grid" | "freeform";

export type SortBy = "title" | "value";

export interface TableRow {
  label: string;
  value: string | number;
  trend?: number;
}

export interface Layout {
  type: LayoutType;
  spacing: number;
}

export interface APIConnection {
  id: string;
  name: string;
  endpoint: string;
  key: string;
  refreshInterval?: number;
}

export interface DashboardConfig {
  widgets: Widget[];
  layout: Layout;
  apiConnections: APIConnection[];
}

export interface Widget {
  id: string;
  title: string;
  type: string;
  config: Record<string, any>;
}

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
  type?: CardType;
  description?: string;
  history?: number[];
}
