export interface WebContainerConfig {
  name: string;
  dependencies: Record<string, string>;
  scripts: Record<string, string>;
}

export interface WebContainerError extends Error {
  code?: string;
  details?: unknown;
}