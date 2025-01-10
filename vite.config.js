// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate', // CacheFirst yerine daha güncel strateji
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 gün
                maxEntries: 30 // Maksimum önbellek girişi
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        skipWaiting: true,
        clientsClaim: true

      },
      manifest: {
        name: 'Zakir Özlü Tesbihat',
        short_name: 'Zakir',
        description: 'Zakir, Özlü Namaz Tesbihatı',
        theme_color: '#ff6b6b',
        background_color: '#ff6b6b',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'tr',
        prefer_related_applications: false,
        categories: ['lifestyle', 'religious'],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            platform: 'wide'
          }
        ],
        shortcuts: [
          {
            name: "Zakir",
            url: "/",
            icons: [{ src: "android-chrome-192x192.png", sizes: "192x192" }]
          }
        ],
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ]
      }
    })
  ]
})

