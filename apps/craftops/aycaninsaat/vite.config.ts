import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // 1. BASE: Sondaki slash'ı kaldırdık.
  base: '/craftops/aycaninsaat', 
  
  // 2. SERVER: Hatalı 'historyApiFallback' satırını kaldırdık. 
  // Vite, SPA yönlendirmesini varsayılan olarak zaten yönetir.
  server: {
    port: 5173,
    host: true, // Ağ üzerinden erişim için (opsiyonel)
  },

  build: {
    outDir: '../../../dist/craftops/aycaninsaat',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})