/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Read base path from .env file directly to avoid system env override
  const envFile = resolve(process.cwd(), `.env.${mode}`);
  const envContent = readFileSync(envFile, 'utf8');
  const match = envContent.match(/^VITE_BASE_PATH=(.+)$/m);
  const basePath = match ? match[1].trim() : undefined;

  return {
    plugins: [react(), tailwindcss()],
    // Use base path from VITE_BASE_PATH environment variable
    // Set in .env.production, .env.preview, or by publish script
    base: basePath,
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: true,
    },
  };
});
