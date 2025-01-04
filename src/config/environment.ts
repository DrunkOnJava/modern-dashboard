interface Environment {
  supabase: {
    url: string;
    anonKey: string;
  };
  gcloud: {
    projectId: string;
    region: string;
    bucket?: string;
  };
  netlify: {
    siteId: string;
  };
  features: {
    analytics: boolean;
    realTime: boolean;
    cloudStorage: boolean;
  };
  performance: {
    monitoring: boolean;
    errorReporting: boolean;
    cacheTTL: number;
  };
}

const environment: Environment = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  gcloud: {
    projectId: import.meta.env.VITE_GCLOUD_PROJECT_ID,
    region: import.meta.env.VITE_GCLOUD_REGION,
    bucket: import.meta.env.VITE_GCLOUD_BUCKET,
  },
  netlify: {
    siteId: import.meta.env.NETLIFY_SITE_ID,
  },
  features: {
    analytics: import.meta.env.VITE_FEATURE_ANALYTICS === "true",
    realTime: import.meta.env.VITE_FEATURE_REAL_TIME === "true",
    cloudStorage: import.meta.env.VITE_FEATURE_CLOUD_STORAGE === "true",
  },
  performance: {
    monitoring: import.meta.env.VITE_PERFORMANCE_MONITORING === "true",
    errorReporting: import.meta.env.VITE_ERROR_REPORTING === "true",
    cacheTTL: parseInt(import.meta.env.VITE_CACHE_TTL || "3600", 10),
  },
};

// Validate required environment variables
const requiredVars = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
  "VITE_GCLOUD_PROJECT_ID",
  "VITE_GCLOUD_REGION",
] as const;

for (const varName of requiredVars) {
  if (!import.meta.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

// Helper functions
export function isProduction(): boolean {
  return import.meta.env.PROD;
}

export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

export function getEnvironment(): Environment {
  return environment;
}

// Type-safe environment variable access
type EnvVarKey = keyof typeof import.meta.env;

export function getEnvVar<T extends EnvVarKey>(key: T): string {
  const value = import.meta.env[key];
  if (value === undefined || value === null) {
    throw new Error(`Environment variable ${String(key)} is not defined`);
  }
  return String(value);
}

// Feature flag checking
export function isFeatureEnabled(
  feature: keyof Environment["features"]
): boolean {
  return Boolean(environment.features[feature]);
}

// Performance configuration
export function getPerformanceConfig(): Environment["performance"] {
  return environment.performance;
}

// Service-specific configurations
export function getSupabaseConfig(): Environment["supabase"] {
  return environment.supabase;
}

export function getGCloudConfig(): Environment["gcloud"] {
  return environment.gcloud;
}

export function getNetlifyConfig(): Environment["netlify"] {
  return environment.netlify;
}

export default environment;
