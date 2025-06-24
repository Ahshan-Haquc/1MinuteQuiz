import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/signup': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/me': 'http://localhost:3000',
    }
  }
})
