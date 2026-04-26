// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,  // keeps the same port you're used to
    proxy: {
      // Any request starting with /api gets forwarded to Express
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})