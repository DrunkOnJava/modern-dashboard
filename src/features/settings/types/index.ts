export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
}

export interface NotificationConfig {
  alerts: boolean;
  updates: boolean;
  performance: boolean;
}

export interface ExportConfig {
  format: string;
  autoExport: string;
}

export interface Settings {
  theme: ThemeConfig;
  notifications: NotificationConfig;
  exportConfig: ExportConfig;
}