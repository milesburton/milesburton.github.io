// @ts-check
import sitemap from '@astrojs/sitemap';
import { execSync } from 'node:child_process';
import { defineConfig } from 'astro/config';

function safeGit(command) {
	try {
		return execSync(command, { encoding: 'utf8' }).trim();
	} catch {
		return 'unknown';
	}
}

const commitHash = safeGit('git rev-parse --short HEAD');
// The daily deploy sets BUILD_TIME so the footer reflects the real build, not the
// last commit. Unset (local/test builds) falls back to the commit date, which
// keeps the visual baselines stable.
const commitDate = process.env.BUILD_TIME ?? safeGit('git log -1 --format=%cI');

// https://astro.build/config
export default defineConfig({
	site: 'https://milesburton.com',
	integrations: [sitemap()],
	vite: {
		define: {
			__BUILD_COMMIT__: JSON.stringify(commitHash),
			__BUILD_DATE__: JSON.stringify(commitDate),
		},
	},
});
