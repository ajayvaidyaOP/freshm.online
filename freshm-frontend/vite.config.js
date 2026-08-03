import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// FreshM ERP — Vite + React + PWA
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon-32.png", "logo.png", "icons/apple-touch-icon.png"],
      manifest: {
        name: "FreshM ERP — MandiPrime",
        short_name: "FreshM",
        description: "Agricultural produce ERP — receiving, sorting, dispatch and invoicing.",
        theme_color: "#14432C",
        background_color: "#0E3320",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/login",
        icons: [
          { src: "icons/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      // IMPORTANT: do NOT cache /api — the service worker must never sit in front
      // of backend calls, or you get stale/404 responses on the wrong origin.
      workbox: {
        navigateFallback: null,
        navigateFallbackDenylist: [/^\/api/],
      },
      devOptions: { enabled: false },
    }),
  ],
  // Proxy kept as a harmless backup; with the absolute API baseURL it isn't used.
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8083",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
