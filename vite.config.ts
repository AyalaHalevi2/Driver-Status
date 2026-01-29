import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Use default esbuild minification (faster than terser)
    minify: 'esbuild',
    // Inline small assets (< 4kb) as base64
    assetsInlineLimit: 4096,
    // Generate source maps for error tracking (hidden from browser)
    sourcemap: 'hidden',
    rollupOptions: {
      output: {
        // Optimize chunk file names for caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
          utils: ['date-fns'],
        },
      },
    },
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', 'date-fns'],
  },
})
