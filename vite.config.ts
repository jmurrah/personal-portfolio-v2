import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const projectRootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(() => {
  return {
    base: '/personal-portfolio-v2/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(projectRootDir, 'src'),
      },
    },
  };
});
