import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    port: 8080,
    strictPort: true,
    host: true,
  },
  server: {
    watch:{
      usePolling: true
    },
    port: 8080,
    strictPort: true,
    host: true,
  },
});
