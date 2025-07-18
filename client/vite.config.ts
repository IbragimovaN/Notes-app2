import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      outDir: "dist",
      manifest: {
        name: "Notes-App",
        short_name: "NotesApp",
        description: "Notes App",
        theme_color: "#f9f0ff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "./icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "./icons/favicon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3003",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ""),
  //     },
  //   },
  // },
});
