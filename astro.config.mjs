import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import vue from '@astrojs/vue';

import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
	integrations: [
		vue({
			jsx: true,
		}),
		auth(),
	],
	output: 'server',
	adapter: netlify(),
});
