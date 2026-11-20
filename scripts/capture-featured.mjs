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

// Arduino-Temperature-Control-Library's ESP-WebServer example serves its dashboard
// from a raw string inside the .ino. Pull the HTML out of the sketch and serve it
// in the browser with deterministic mocked sensor endpoints, so the screenshot is
// the real page from the repo's current source, not a hand-taken image.
async function openSketchDashboard(page, sketchUrl) {
	const res = await fetch(sketchUrl);
	if (!res.ok) throw new Error(`sketch HTTP ${res.status}`);
	const ino = await res.text();
	const html = ino.match(/R"=====\(([\s\S]*?)\)====="/)?.[1];
	if (!html) throw new Error('could not find the embedded HTML in the sketch');
	const history = Array.from({ length: 40 }, (_, i) => Number((22 + Math.sin(i / 5) * 1.2 + (i % 7) * 0.06).toFixed(2)));
	const latest = history[history.length - 1];
	const address = '28FF457D1234AB12';
	const json = (body) => ({ status: 200, contentType: 'application/json', body: JSON.stringify(body) });
	await page.route('http://sensor.local/**', (route) => {
		const { pathname } = new URL(route.request().url());
		if (pathname === '/temperature') return route.fulfill(json({ sensors: [{ id: 0, address, celsius: latest, fahrenheit: latest * 1.8 + 32 }] }));
		if (pathname === '/history') return route.fulfill(json({ interval_ms: 10000, sensors: [{ id: 0, address, history }] }));
		if (pathname === '/') return route.fulfill({ status: 200, contentType: 'text/html', body: html });
		return route.fulfill({ status: 404, body: '' });
	});
	await page.goto('http://sensor.local/', { waitUntil: 'networkidle', timeout: 30_000 });
	await page.waitForSelector('canvas', { timeout: 15_000 });
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch();
let failed = 0;

try {
	for (const tile of tiles) {
		if (!(tile.screenshot?.url || tile.screenshot?.sketchUrl) || (only && tile.image !== only)) continue;
		const page = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
		try {
			if (tile.screenshot.sketchUrl) {
				await openSketchDashboard(page, tile.screenshot.sketchUrl);
			} else {
				const res = await page.goto(tile.screenshot.url, { waitUntil: 'load', timeout: 30_000 });
				if (!res || !res.ok()) throw new Error(`HTTP ${res?.status()}`);
			}
			if (tile.screenshot.clickText) {
				await page.getByText(tile.screenshot.clickText, { exact: false }).first().click({ timeout: 10_000 });
			}
			await page.waitForTimeout(tile.screenshot.waitMs ?? 1500);
			const png = await page.screenshot({ type: 'png' });
			const jpg = await sharp(png).resize(640, 320, { fit: 'cover', position: 'top' }).jpeg({ quality: 80, progressive: true }).toBuffer();
			fs.writeFileSync(path.join(OUT_DIR, `${tile.image}.jpg`), jpg);
			console.log(`captured ${tile.image} <- ${tile.screenshot.url ?? tile.screenshot.sketchUrl}`);
		} catch (err) {
			failed++;
			console.warn(`WARN could not capture ${tile.image} (${tile.screenshot.url ?? tile.screenshot.sketchUrl}): ${err.message} -- keeping existing image`);
		} finally {
			await page.close();
		}
	}
} finally {
	await browser.close();
}
console.log(failed ? `done with ${failed} failure(s)` : 'done');
