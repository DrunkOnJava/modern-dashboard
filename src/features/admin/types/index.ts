export interface APIConnection {
  id: string;
  name: string;
  endpoint: string;
  key: string;
  refreshInterval?: number;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  lastLogin?: string;
}

export interface AdminSettings {
  sessionTimeout: number;
  maxLoginAttempts: number;
  requireMFA: boolean;
  ipWhitelistEnabled: boolean;
}