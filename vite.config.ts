import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import devServer from '@hono/vite-dev-server';
import adapter from '@hono/vite-dev-server/cloudflare'
import build from '@hono/vite-cloudflare-pages'

export default defineConfig({
	plugins: [
		sveltekit(),
		tailwindcss(),
		// devServer({
		// 	adapter,
		// 	entry: 'src/lib/api/api.ts'
		// }),
		// build()
	]
});
