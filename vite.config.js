import { defineConfig } from 'vite';

export default defineConfig({
    optimizeDeps: {
      include: [
        'pixi.js', 
        '@pixi/canvas-graphics',
        '@pixi/canvas-renderer'
      ],
      force: true,
    },
});  