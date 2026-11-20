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

// The featured grid wraps onto several rows, so alignment is only meaningful
// between cards on the same row. Group by the card's own Y first.
async function featuredRows(page: import('@playwright/test').Page): Promise<Locator[][]> {
	const cards = page.locator('.featured-card');
	const count = await cards.count();
	const rows = new Map<number, Locator[]>();
	for (let i = 0; i < count; i++) {
		const card = cards.nth(i);
		const box = await card.boundingBox();
		if (!box) throw new Error('Featured card not visible');
		const key = Math.round(box.y / 10);
		rows.set(key, [...(rows.get(key) ?? []), card]);
	}
	return [...rows.values()];
}

for (const [label, selector] of [
	['tag rows', '.tags'],
	['link rows', '.featured-links'],
	['image boxes', '.featured-image'],
	['titles', 'h3'],
] as const) {
	test(`homepage: featured project ${label} align across cards in a row`, async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 900 });
		await page.goto('/', { waitUntil: 'networkidle' });
		const rows = await featuredRows(page);
		expect(rows.flat().length).toBeGreaterThanOrEqual(2);
		for (const row of rows) {
			expectAligned(await yPositions(row.map((c) => c.locator(selector))), `featured ${label}`);
		}
	});
}

test('homepage: featured grid has no orphaned tile', async ({ page }) => {
	await page.setViewportSize({ width: 1280, height: 900 });
	await page.goto('/', { waitUntil: 'networkidle' });
	const rows = await featuredRows(page);
	const sizes = rows.map((r) => r.length);
	expect(new Set(sizes).size, `rows should be evenly filled (got ${sizes.join(', ')})`).toBe(1);
});

test('homepage: featured images never render as broken alt text', async ({ page }) => {
	const failed: string[] = [];
	page.on('response', (r) => {
		if (r.status() >= 400 && r.request().resourceType() === 'image') failed.push(r.url());
	});
	await page.goto('/', { waitUntil: 'networkidle' });
	expect(failed, 'no image request may fail').toEqual([]);
	const broken = await page.$$eval('.featured-card img', (imgs) =>
		(imgs as HTMLImageElement[]).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src),
	);
	expect(broken, 'no featured <img> may be broken').toEqual([]);
});
