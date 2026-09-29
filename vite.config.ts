import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup/setupTests.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/']
    }
  },

  resolve: { alias: { '@': '/src' } },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png', 'screenshots/screenshot-1.png', 'screenshots/screenshot-2.png'],
      manifest: {
        name: 'Lovebloom',
        short_name: 'Lovebloom',
        description: 'A cinematic love journey',
        theme_color: '#8B0000',
        background_color: '#1A0000',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'icons/icon-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshots/screenshot-1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Wide screenshot'
          },
          {
            src: 'screenshots/screenshot-2.png',
            sizes: '360x640',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Narrow screenshot'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https?:.*\.(png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              }
            }
          },
          {
            urlPattern: /^https?:.*\.(woff2|woff|ttf|eot)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'font-assets',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 24 * 60 * 60 // 60 Days
              }
            }
          },
          {
            urlPattern: /^https?:.*\.(mp3|wav|ogg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-assets',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 90 * 24 * 60 * 60 // 90 Days
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'zustand'],
          utils: ['@/shared/utils'],
          components: ['@/components/ui']
        }
      }
    }
  }
});
