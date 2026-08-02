#!/usr/bin/env node
// One-off/occasional script: downloads GitHub's OpenGraph preview card for
// every public, non-fork, non-archived repo under milesburton, resizes and
// compresses it, and commits it to public/project-media/. The Projects page
// then reads these local files directly -- no live API calls at build time,
// so no rate-limit risk on every `npm run build`.
//
// Re-run this whenever repos are added/renamed/deleted. Safe to re-run: it
// skips repos that already have a saved thumbnail unless --force is passed.
//
// Usage:
//   node scripts/fetch-project-thumbnails.mjs
//   node scripts/fetch-project-thumbnails.mjs --force
//
// Set GH_TOKEN (or GITHUB_TOKEN) to raise the repo-list API call from the
// unauthenticated 60/hour limit to 5000/hour -- `gh auth token` prints one
// if you're logged in via the GitHub CLI. The OpenGraph image fetch itself
// is a public, unauthenticated asset endpoint with its own separate limit.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'project-media');
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');

const force = process.argv.includes('--force');

fs.mkdirSync(OUT_DIR, { recursive: true });

const token = process.env.GH_TOKEN ?? process.env.GITHUB_TOKEN;
const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

async function fetchAllRepos() {
	const all = [];
	for (let page = 1; page <= 10; page++) {
		const res = await fetch(`https://api.github.com/users/milesburton/repos?per_page=100&type=owner&page=${page}`, {
			headers: authHeaders,
		});
		if (!res.ok) throw new Error(`GitHub REST API error: ${res.status} ${await res.text()}`);
		const batch = await res.json();
		all.push(...batch);
		if (batch.length < 100) break;
	}
	return all.filter((r) => !r.fork && !r.private && !r.archived);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const repos = await fetchAllRepos();
console.log(`Found ${repos.length} public, non-fork, non-archived repos.`);

const manifest = fs.existsSync(MANIFEST_PATH) ? JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8')) : {};

let fetched = 0;
let skipped = 0;
let failed = 0;

for (const repo of repos) {
	const outName = `${repo.name}.jpg`;
	const outPath = path.join(OUT_DIR, outName);

	if (!force && fs.existsSync(outPath)) {
		skipped++;
		continue;
	}

	try {
		const res = await fetch(`https://opengraph.githubassets.com/1/milesburton/${repo.name}`);
		if (!res.ok) {
			console.warn(`  skip ${repo.name}: OG image fetch failed (${res.status})`);
			failed++;
			continue;
		}

		const remaining = res.headers.get('x-ratelimit-remaining');
		const buffer = Buffer.from(await res.arrayBuffer());

		const output = await sharp(buffer)
			.resize({ width: 640, withoutEnlargement: true })
			.jpeg({ quality: 78, mozjpeg: true })
			.toBuffer();

		fs.writeFileSync(outPath, output);
		manifest[repo.name] = { fetchedAt: new Date().toISOString().slice(0, 10) };
		fetched++;
		console.log(`  saved ${outName} (${(output.length / 1024).toFixed(0)}KB, ${remaining} OG requests left)`);

		if (remaining && Number(remaining) <= 2) {
			console.warn('OpenGraph rate limit nearly exhausted -- stopping early. Re-run later to pick up the rest.');
			break;
		}

		await sleep(300);
	} catch (err) {
		console.warn(`  skip ${repo.name}: ${err.message}`);
		failed++;
	}
}

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, '\t')}\n`);

console.log('');
console.log(`Fetched: ${fetched}, skipped (already have one): ${skipped}, failed: ${failed}`);
console.log(`Total repos with a thumbnail: ${Object.keys(manifest).length}/${repos.length}`);
