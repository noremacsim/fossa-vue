import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
  logLevel: 'silent',
  logType: 'error',
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true
      },
      logLevel: 'silent',
      logType: 'error',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '/img/icon/apple-touch-icon.png'],
      devOptions: {
        enabled: false
      },
      manifest: {
        dir : "ltr",
        lang : "en-GB",
        name : "Fossa",
        scope : "/",
        display : "standalone",
        start_url : "/",
        id: "/",
        short_name : "Fossa",
        theme_color : "#3b71ca",
        prefer_related_applications: false,
        description: "Web Based Browser Apps, Run all these applications directly form your car or device browser. initially made for Tesla Vehicles",
        orientation : "any",
        background_color : "#fff",
        generated : "true",
        icons: [
          {
            src: '/img/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/img/icons/pwa-120x120.png',
            sizes: '120x120',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/img/icons/pwa-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/img/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/img/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name]${hash}.js`,
        chunkFileNames: `[name]${hash}.js`,
        assetFileNames: `[name]${hash}.[ext]`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
