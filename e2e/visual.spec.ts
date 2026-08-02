import { test, expect } from '@playwright/test';

// Pixel snapshots of each unique page template. Run `npx playwright test
// --update-snapshots` after an intentional visual change to accept the new
// baseline -- review the diff first, don't update blindly.
const TEMPLATES = [
	{ name: 'home', path: '/' },
	{ name: 'now', path: '/now/' },
	{ name: 'projects', path: '/projects/' },
	{ name: 'blog-index', path: '/blog/' },
	{ name: 'blog-post', path: '/blog/a-little-java-8-revision/' },
	{ name: 'wiki-index', path: '/wiki/Main_Page/' },
	{ name: 'wiki-article', path: '/wiki/arduino/' },
	{ name: 'amateur-radio', path: '/amateur-radio/' },
	{ name: 'contact', path: '/contact/' },
	{ name: 'topic-gateway', path: '/topics/radio/' },
];

const VIEWPORTS = [
	{ name: 'desktop', width: 1280, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
];

for (const { name, path } of TEMPLATES) {
	for (const viewport of VIEWPORTS) {
		test(`${name} @ ${viewport.name}`, async ({ page }) => {
			await page.setViewportSize({ width: viewport.width, height: viewport.height });
			await page.goto(path, { waitUntil: 'networkidle' });
			// Freeze the theme so light/dark system-preference doesn't flip the baseline.
			await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
			await expect(page).toHaveScreenshot(`${name}-${viewport.name}.png`, {
				fullPage: true,
				animations: 'disabled',
			});
		});
	}
}
