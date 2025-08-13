import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @를 src로 매핑
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://storbit.p-e.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
