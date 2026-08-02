import { test, expect, type Locator } from '@playwright/test';

// Pixel snapshots can miss subtle misalignment when content lengths happen to
// be similar -- these checks assert row alignment directly, independent of
// how much text is in each card, so they catch the bug class regardless of
// content. Add a case here whenever a new multi-column card grid ships.

async function yPositions(locators: Locator[]): Promise<number[]> {
	const boxes = await Promise.all(locators.map((l) => l.boundingBox()));
	return boxes.map((b) => {
		if (!b) throw new Error('Element not visible/found for alignment check');
		return Math.round(b.y);
	});
}

function expectAligned(positions: number[], label: string, tolerancePx = 2) {
	const [first, ...rest] = positions;
	for (const y of rest) {
		expect(Math.abs(y - first), `${label}: expected all rows at the same Y (got ${positions.join(', ')})`).toBeLessThanOrEqual(tolerancePx);
	}
}

test('homepage: featured project tag rows align across cards', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	const cards = page.locator('.featured-card');
	const count = await cards.count();
	expect(count).toBeGreaterThanOrEqual(2);
	const tagRows = Array.from({ length: count }, (_, i) => cards.nth(i).locator('.tags'));
	expectAligned(await yPositions(tagRows), 'featured project tag rows');
});

test('homepage: featured project link rows align across cards', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	const cards = page.locator('.featured-card');
	const count = await cards.count();
	const linkRows = Array.from({ length: count }, (_, i) => cards.nth(i).locator('.featured-links'));
	expectAligned(await yPositions(linkRows), 'featured project link rows');
});

test('homepage: selected video kickers align across cards', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	const cards = page.locator('.video-card');
	const count = await cards.count();
	expect(count).toBeGreaterThanOrEqual(2);
	const kickers = Array.from({ length: count }, (_, i) => cards.nth(i).locator('.video-kicker'));
	expectAligned(await yPositions(kickers), 'selected video kickers');
});

test('projects page: card thumbnails align across the list', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 1200 });
	await page.goto('/projects/', { waitUntil: 'networkidle' });
	const thumbs = page.locator('.post-thumb');
	const count = await thumbs.count();
	// The repo list is fetched from the GitHub API at build time with no auth
	// token, so it can legitimately be empty if that build hit GitHub's
	// unauthenticated rate limit (60/hour) -- the page itself degrades
	// gracefully in that case, so this check should too rather than flake.
	test.skip(count === 0, 'No repo cards rendered -- likely GitHub API rate limit at build time');
	expect(count).toBeGreaterThanOrEqual(2);
	// Thumbnails sit in a single-column list, so check left-edge (x) alignment
	// rather than y, which legitimately varies per row.
	const boxes = await Promise.all(
		Array.from({ length: Math.min(count, 5) }, (_, i) => thumbs.nth(i).boundingBox()),
	);
	const xs = boxes.map((b) => {
		if (!b) throw new Error('Thumbnail not visible');
		return Math.round(b.x);
	});
	const [first, ...rest] = xs;
	for (const x of rest) {
		expect(Math.abs(x - first), `project thumbnails: expected same X (got ${xs.join(', ')})`).toBeLessThanOrEqual(2);
	}
});
