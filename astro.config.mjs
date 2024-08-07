import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
	integrations: [vue({ jsx: true })],
	output: 'server',
	adapter: netlify(),
});

