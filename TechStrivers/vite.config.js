import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite's dev server serves every .html file in the project root regardless
// of which config started it, so without this the admin entry would still
// be reachable from the public port. Block it explicitly.
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

// https://vite.dev/config/
// Public site only. The ERP Admin Portal runs separately - see vite.admin.config.js.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    blockPaths(['/admin.html', '/admin'])
  ],
  server: {
    port: 5173
  }
});
