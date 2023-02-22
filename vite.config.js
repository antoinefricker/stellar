import { defineConfig } from 'vite';

export default defineConfig({
	optimizeDeps: {
		include: ['pixi.js'],
		force: true,
	},
});
