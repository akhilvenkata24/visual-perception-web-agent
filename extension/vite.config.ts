import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.config';

const stripImportMetaPlugin = () => ({
  name: 'strip-import-meta',
  renderChunk(code: string) {
    if (code.includes('import.meta')) {
      const updated = code
        .replace(/import\.meta\.url/g, '""')
        .replace(/import\.meta/g, '({})');
      return { code: updated, map: null };
    }
    return null;
  },
});

export default defineConfig({
  define: {
    'import.meta.url': '""',
  },
  plugins: [
    stripImportMetaPlugin(),
    react(),
    crx({ manifest }),
  ],
});


