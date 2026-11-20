#!/usr/bin/env node
// Captures the homepage's featured-project screenshots with Playwright.
//
// Reads src/data/featured.json; every tile with a `screenshot.url` is loaded in
// headless Chromium and written to public/images/projects/<image>.jpg (640x320,
// matching the tile's 2:1 box). Tiles with `screenshot: null` are skipped and
// render the placeholder until a demo-mode URL is added to the data file.
//
// A failed capture never breaks the build: the previous image (committed, or
// from an earlier run) is left in place and a warning is printed.
//
// Usage:  node scripts/capture-featured.mjs [--only <image-slug>]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'projects');
const tiles = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'featured.json'), 'utf-8'));
const onlyIdx = process.argv.indexOf('--only');
const only = onlyIdx > -1 ? process.argv[onlyIdx + 1] : null;

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
let failed = 0;

try {
	for (const tile of tiles) {
		if (!tile.screenshot?.url || (only && tile.image !== only)) continue;
		const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
		try {
			const res = await page.goto(tile.screenshot.url, { waitUntil: 'load', timeout: 30_000 });
			if (!res || !res.ok()) throw new Error(`HTTP ${res?.status()}`);
			if (tile.screenshot.clickText) {
				await page.getByText(tile.screenshot.clickText, { exact: false }).first().click({ timeout: 10_000 });
			}
			await page.waitForTimeout(tile.screenshot.waitMs ?? 1500);
			const png = await page.screenshot({ type: 'png' });
			const jpg = await sharp(png).resize(640, 320, { fit: 'cover', position: 'top' }).jpeg({ quality: 80, progressive: true }).toBuffer();
			fs.writeFileSync(path.join(OUT_DIR, `${tile.image}.jpg`), jpg);
			console.log(`captured ${tile.image} <- ${tile.screenshot.url}`);
		} catch (err) {
			failed++;
			console.warn(`WARN could not capture ${tile.image} (${tile.screenshot.url}): ${err.message} -- keeping existing image`);
		} finally {
			await page.close();
		}
	}
} finally {
	await browser.close();
}
console.log(failed ? `done with ${failed} failure(s)` : 'done');
