import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL de votre serveur backend
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws', // Utilisez 'wss' si vous utilisez HTTPS
    },
  },
});