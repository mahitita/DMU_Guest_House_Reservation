import { defineConfig } from 'vite';

export default defineConfig({
  // Other configurations
  optimizeDeps: {
    include: ['@fortawesome/react-fontawesome'],
  },
});
