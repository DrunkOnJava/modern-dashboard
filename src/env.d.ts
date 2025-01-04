/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GCLOUD_PROJECT_ID: string;
  readonly VITE_GCLOUD_REGION: string;
  readonly VITE_GCLOUD_BUCKET?: string;
  readonly NETLIFY_SITE_ID: string;
  readonly VITE_FEATURE_ANALYTICS: string;
  readonly VITE_FEATURE_REAL_TIME: string;
  readonly VITE_FEATURE_CLOUD_STORAGE: string;
  readonly VITE_PERFORMANCE_MONITORING: string;
  readonly VITE_ERROR_REPORTING: string;
  readonly VITE_CACHE_TTL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
