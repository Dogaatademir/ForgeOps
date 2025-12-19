import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // 1. BASE: Uygulamanın çalışacağı alt yol (URL)
  base: '/craftops/aycaninsaat/', 
  
  build: {
    // 2. OUTDIR: Build alındığında dosyaların ana dist klasöründe nereye gideceği
    // Monorepo kökündeki dist klasörünü hedefliyoruz.
    outDir: '../../../dist/craftops/aycaninsaat',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})