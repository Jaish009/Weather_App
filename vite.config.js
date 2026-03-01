import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5174, // Set the default port
    host: "0.0.0.0", // Add this to enable network access
  },
  optimizeDeps: {
    exclude: ["pdfjs-dist"],
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      // Handle window is not defined error
      "./env.mjs": "./env.browser.mjs",
    },
  },
});
