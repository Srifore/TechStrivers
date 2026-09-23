import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite's dev server serves every .html file in the project root regardless
// of which config started it, so without this the public site would still
// be reachable from the admin port. Block it explicitly.
function blockPaths(blockedPaths) {
  return {
    name: `block-${blockedPaths.join(',')}`,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0];
        if (blockedPaths.includes(url)) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }
        next();
      });
    }
  };
}

// Serves only the ERP Admin Portal (admin.html) on its own port, separate
// from the public site (vite.config.js / port 5173).
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    blockPaths(['/index.html', '/'])
  ],
  appType: 'mpa',
  server: {
    port: 5174,
    open: '/admin.html'
  },
  build: {
    outDir: 'dist-admin',
    rollupOptions: {
      input: 'admin.html'
    }
  }
});
