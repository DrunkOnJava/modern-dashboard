import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "@supabase/supabase-js",
            "lucide-react",
          ],
          charts: [
            "./src/components/charts/AreaChart.tsx",
            "./src/components/charts/BarChart.tsx",
            "./src/components/charts/LineChart.tsx",
            "./src/components/charts/PieChart.tsx",
            "./src/components/charts/RadarChart.tsx",
          ],
          auth: [
            "./src/components/auth/LoginForm.tsx",
            "./src/components/auth/RegistrationForm.tsx",
            "./src/components/auth/AuthLayout.tsx",
          ],
        },
      },
    },
    sourcemap: true,
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable minification optimizations
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Enable dependency optimization
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  // Enable caching
  server: {
    hmr: {
      overlay: false,
    },
  },
});
