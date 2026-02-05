import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {

      '/oauth2': {
        target: 'http://s4v3.local',
        changeOrigin: true,

      },

      '/bff': {
        target: 'http://s4v3.local',
        changeOrigin: true,
      },

      '/minio': {
        target: 'http://minio.s4v3.local',
        changeOrigin: true,
      },
    },
  },
})
