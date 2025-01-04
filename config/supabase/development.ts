export const supabaseConfig = {
  url: process.env.VITE_SUPABASE_URL || "http://localhost:54321",
  anonKey: process.env.VITE_SUPABASE_ANON_KEY || "your-local-anon-key",

  // Database configuration
  db: {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },

  // Storage configuration
  storage: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ["image/*", "application/pdf"],
  },

  // Real-time configuration
  realtime: {
    enabled: true,
    channels: {
      maxPerClient: 100,
    },
  },
};
