// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // Enables the new JSX transform (React 17+)
    }),
  ],
  esbuild: {
    loader: 'jsx', // Treat .js files as JSX
    include: /src\/.*\.jsx?$/, // Apply to .js and .jsx files in src/
  },
  server: {
    port: 3000,
    open: true, //Automatically open in browser
  },
});