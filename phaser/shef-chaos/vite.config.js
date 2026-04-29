import { defineConfig } from 'vite'
import { resolve } from 'path'
import checker from 'vite-plugin-checker'

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  plugins: [
    checker({ typescript: true })
  ],
  build: {
    outDir: 'dist'
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
