import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'FitCoach Pro',
        short_name: 'FitCoach',
        description: 'Gestión integral para instructores personales',
        theme_color: '#6b46c1',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    open: true
    },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});