import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [
      react(),
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        app: './index.html',
        'service-worker': './worker.js'
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker' ? 'worker.js' : 'assets/[name].[hash].js'
        }
      }

    }
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
  server: {
    watch:{
      usePolling: true
    },
    port: 3000,
    strictPort: true,
    host: true,
  },
});
