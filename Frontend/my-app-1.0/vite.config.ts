import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Or whatever port your Vite dev server should run on
    proxy: {
      '/api': { // Any request starting with /api
        target: 'http://localhost:5000', // <-- This MUST match your backend's PORT
        changeOrigin: true, // Necessary for many proxy setups
        // rewrite: (path) => path.replace(/^\/api/, ''), // Use this if your backend endpoints DON'T start with /api (e.g., just /users, /patients)
                                                          // Given your server.js, your backend endpoints DO start with /api
                                                          // (e.g., /api/patients, /api/auth), so you can REMOVE or COMMENT OUT rewrite.
      },
      // You can add more specific proxy rules if needed
      // For example, if you have a separate file upload service:
      // '/uploads': {
      //   target: 'http://localhost:6000',
      //   changeOrigin: true,
      // },
    },
  },
});