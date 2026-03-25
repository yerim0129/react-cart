import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: {
      generateScopedName: process.env.NODE_ENV === 'production'
        ? '[hash:base64:8]'
        : '[name]__[local]',
    },
  },
})
