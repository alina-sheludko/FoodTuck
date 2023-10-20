import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/api': {
    //     target: process.cwd().VITE_PORT,
    //     changeOrigin: true,
    //   },
    //   '/media': {
    //     target: process.cwd().VITE_PORT,
    //     changeOrigin: true,
    //   }
    // },
  }
})
