import { test, expect, type Page } from '@playwright/test';

// One representative URL per unique page template. Update this list when a
// new template is added (not when new content is added under an existing
// template -- the wiki/blog checks below already crawl every article).
const PAGES = [
	{ name: 'home', path: '/' },
	{ name: 'now', path: '/now/' },
	{ name: 'projects', path: '/projects/' },
	{ name: 'blog-index', path: '/blog/' },
	{ name: 'blog-post', path: '/blog/a-little-java-8-revision/' },
	{ name: 'wiki-index', path: '/wiki/Main_Page/' },
	{ name: 'wiki-article', path: '/wiki/arduino/' },
	{ name: 'wiki-section', path: '/wiki/engineering/' },
	{ name: 'amateur-radio', path: '/amateur-radio/' },
	{ name: 'contact', path: '/contact/' },
	{ name: 'topic-gateway', path: '/topics/radio/' },
];

function collectConsoleErrors(page: Page): string[] {
	const errors: string[] = [];
	page.on('console', (msg) => {
		if (msg.type() === 'error') errors.push(msg.text());
	});
	page.on('pageerror', (err) => errors.push(err.message));
	return errors;
}

for (const { name, path } of PAGES) {
	test(`${name}: loads with no console errors`, async ({ page }) => {
		const errors = collectConsoleErrors(page);
		const response = await page.goto(path, { waitUntil: 'networkidle' });
		expect(response?.ok()).toBeTruthy();
		expect(errors, `console errors on ${path}:\n${errors.join('\n')}`).toEqual([]);
	});

	test(`${name}: has core layout elements`, async ({ page }) => {
		await page.goto(path, { waitUntil: 'networkidle' });
		await expect(page.locator('.sidebar').first()).toBeVisible();
		await expect(page.locator('h1')).toHaveCount(1);
		await expect(page.locator('.site-footer').first()).toBeVisible();
	});

	test(`${name}: internal links resolve`, async ({ page, request }) => {
		await page.goto(path, { waitUntil: 'networkidle' });
		const hrefs = await page.$$eval('a[href^="/"]', (links) =>
			Array.from(new Set(links.map((a) => a.getAttribute('href')).filter((h): h is string => !!h))),
		);
		for (const href of hrefs) {
			const res = await request.get(href);
			expect(res.ok(), `broken link on ${path}: ${href} -> ${res.status()}`).toBeTruthy();
		}
	});

	test(`${name}: images load`, async ({ page, request }) => {
		await page.goto(path, { waitUntil: 'networkidle' });
		const srcs = await page.$$eval('img[src^="/"]', (imgs) =>
			Array.from(new Set(imgs.map((img) => img.getAttribute('src')).filter((s): s is string => !!s))),
		);
		for (const src of srcs) {
			const res = await request.get(src);
			expect(res.ok(), `broken image on ${path}: ${src} -> ${res.status()}`).toBeTruthy();
		}
	});
}

test('sitemap and RSS feed are reachable', async ({ request }) => {
	expect((await request.get('/sitemap-index.xml')).ok()).toBeTruthy();
	expect((await request.get('/rss.xml')).ok()).toBeTruthy();
});

test('search index has content', async ({ request }) => {
	const res = await request.get('/search-index.json');
	expect(res.ok()).toBeTruthy();
	const data = await res.json();
	expect(Array.isArray(data)).toBeTruthy();
	expect(data.length).toBeGreaterThan(100);
});
