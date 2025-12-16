import { defineConfig } from 'auth-astro';
import Google from '@auth/core/providers/google';
import LinkedIn from "@auth/core/providers/linkedin"

export default defineConfig({
	providers: [
		Google({
			clientId: import.meta.env.GOOGLE_CLIENT_ID,
			clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
		}),
		LinkedIn({
			clientId: import.meta.env.AUTH_LINKEDIN_ID,
			clientSecret: import.meta.env.AUTH_LINKEDIN_SECRET,
		}),
	],
});
