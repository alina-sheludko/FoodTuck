import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001
  },
  base: '/src/api-ui',
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        dir: '../FoodTuck.BE/src/api-ui',
      }
    }
  }
})
