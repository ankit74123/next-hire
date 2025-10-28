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
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['react-icons', 'react-toastify', 'react-hook-form'],
          
          // Feature-based chunks
          'jobseeker': [
            './src/pages/jobseeker/Dashboard.jsx',
            './src/pages/jobseeker/Profile.jsx',
            './src/pages/jobseeker/MyApplications.jsx',
            './src/pages/jobseeker/Analytics.jsx'
          ],
          'recruiter': [
            './src/pages/recruiter/Dashboard.jsx',
            './src/pages/recruiter/PostJob.jsx',
            './src/pages/recruiter/MyJobs.jsx',
            './src/pages/recruiter/CandidateSearch.jsx'
          ]
        },
        
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(assetInfo.name)) {
            extType = 'images';
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        
        // Chunk file naming
        chunkFileNames: 'assets/js/[name]-[hash].js',
        
        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
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
