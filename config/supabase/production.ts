export const supabaseConfig = {
  url: process.env.VITE_SUPABASE_URL || "https://your-project.supabase.co",
  anonKey: process.env.VITE_SUPABASE_ANON_KEY || "your-production-anon-key",

  // Database configuration
  db: {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },

  // Storage configuration
  storage: {
    maxFileSize: 50 * 1024 * 1024, // 50MB for production
    allowedMimeTypes: ["image/*", "application/pdf", "video/*"],
  },

  // Real-time configuration
  realtime: {
    enabled: true,
    channels: {
      maxPerClient: 1000, // Higher limit for production
    },
  },

  // Production-specific settings
  performance: {
    cacheProfiles: true,
    queryOptimization: true,
    maxCacheAge: 3600, // 1 hour
  },
};
