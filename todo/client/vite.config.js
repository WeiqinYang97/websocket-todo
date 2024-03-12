import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5174,
    proxy: {
      '/api': 'http://localhost:8801/',
    }
  },
  plugins: [react()],
})
