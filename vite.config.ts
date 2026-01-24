import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      '/oauth2': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      },

      '/bff': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      },
    },
  },
})
