import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations
  build: {
    // Output directory
    outDir: 'dist',
    
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,
    
    // Chunk size warning limit (in KB)
    chunkSizeWarningLimit: 1000,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux-vendor';
            }
            if (id.includes('react-icons') || id.includes('react-toastify') || id.includes('react-hook-form')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }
          
          // Feature-based chunks
          if (id.includes('/pages/jobseeker/')) {
            return 'jobseeker';
          }
          if (id.includes('/pages/recruiter/')) {
            return 'recruiter';
          }
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          // Check if assetInfo and name exist
          if (!assetInfo || !assetInfo.name) {
            return 'assets/[name]-[hash][extname]';
          }
          
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            extType = 'images';
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = 'fonts';
          } else if (/\.css$/i.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    }
  },
  
  // Server configuration
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  
  // Preview configuration
  preview: {
    port: 4173,
    open: true
  }
})
