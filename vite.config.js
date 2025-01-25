// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt', // 'autoUpdate' yerine 'prompt' kullanın
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Zakir Özlü Tesbihat',
        short_name: 'Zakir',
        description: 'Zakir, Özlü Namaz Tesbihatı',
        theme_color: '#ff6666',
        background_color: '#ff6666',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'tr',
        prefer_related_applications: false,
        display_override: ['window-controls-overlay'], // Windows'ta daha modern görünüm
        devOptions: {
          enabled: true,
          type: 'module'
        },
        protocol_handlers: [
          {
            protocol: 'web+zakir',
            url: '/%s'
          }
        ],
        categories: ['lifestyle', 'religious'],
        // screenshots: [ { src: 'screenshot1.png', sizes: '1280x720', type: 'image/png', platform: 'wide' } ],
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
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ]
      },
      workbox: {
        // Önbelleğe alınacak dosya türleri
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot,jpg,jpeg,json,webp}'],
        // Önbellek stratejileri
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
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
          },
          // Resimler için cache stratejisi
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 gün
                maxEntries: 50
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // Yerel fontlar için cache stratejisi
          {
            urlPattern: /\.(?:woff|woff2|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-fonts-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 yıl
                maxEntries: 20
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          // JS, CSS ve HTML için yeni strateji
          {
            urlPattern: /\.(?:js|css|html)$/,
            handler: 'StaleWhileRevalidate', // veya 'NetworkFirst'
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // 1 gün
                maxEntries: 50
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
        ],
        // Service Worker ayarları
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true
      },
      
    })
  ]
})


// StaleWhileRevalidate: Önce cache'den hızlıca göster, sonra arka planda güncellemeleri kontrol et.
// NetworkFirst: Önce internetten almaya çalış, başarısız olursa cache'den göster.
