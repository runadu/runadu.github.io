import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  return {
    base: '/',
    build: {
      emptyOutDir: true,
      outDir: 'docs',
    },
    plugins: [react(), tailwindcss()],
  }
})
