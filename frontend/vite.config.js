// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,      // set to 5173 (or keep commented to let Vite pick a free port)
    strictPort: false, // if true Vite will fail if port is busy; false will pick next available (what you saw)
    host: true       // expose on network (useful for mobile/device testing)
  }
});
