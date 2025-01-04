import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    compression({ algorithm: "gzip" }),
    compression({ algorithm: "brotli", fileName: "[path][base].br" }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core vendor chunk
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router")
            ) {
              return "vendor-react";
            }
            if (id.includes("@supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            return "vendor-other";
          }

          // Feature-based chunks
          if (id.includes("/components/charts/")) {
            return "charts";
          }
          if (id.includes("/components/auth/")) {
            return "auth";
          }
          if (id.includes("/components/analytics/")) {
            return "analytics";
          }
          if (id.includes("/components/cards/")) {
            return "cards";
          }
        },
        inlineDynamicImports: false,
      },
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.trace",
        ],
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    reportCompressedSize: true,
    target: "esnext",
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@supabase/supabase-js",
      "lucide-react",
    ],
    exclude: ["@vite/client", "@vite/env"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
  preview: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});
