import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// FreshM ERP — Vite + React + PWA
// Run: npm i -D vite-plugin-pwa   (see FRONTEND_README.md)
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
      workbox: {
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            // cache API GETs so lists still render briefly offline
            urlPattern: ({ url }) => url.pathname.startsWith("/api/"),
            handler: "NetworkFirst",
            options: { cacheName: "freshm-api", expiration: { maxEntries: 120, maxAgeSeconds: 86400 } },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { port: 5173 },
});
