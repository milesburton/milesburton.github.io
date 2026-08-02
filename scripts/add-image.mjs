#!/usr/bin/env node
// Resizes/compresses an image and drops it into the right public/ folder,
// then prints the markdown snippet to paste into your post or article.
//
// Usage:
//   npm run add-image -- /path/to/photo.jpg my-post-slug     (blog)
//   npm run add-image -- /path/to/photo.jpg wiki             (wiki)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const [, , sourceArg, destArg] = process.argv;

if (!sourceArg || !destArg) {
	console.error('Usage: npm run add-image -- /path/to/photo.jpg <blog-slug|wiki>');
	process.exit(1);
}

if (!fs.existsSync(sourceArg)) {
	console.error(`File not found: ${sourceArg}`);
	process.exit(1);
}

const ext = path.extname(sourceArg).toLowerCase();
const baseName = path.basename(sourceArg, ext).toLowerCase().replace(/[^a-z0-9]+/g, '-');

const isWiki = destArg === 'wiki';
const outExt = ext === '.png' ? '.png' : '.jpg';
const outName = `${baseName}${outExt}`;

let outDir;
let publicPath;
if (isWiki) {
	outDir = path.join(ROOT, 'public', 'wiki-media');
	publicPath = `/wiki-media/${outName}`;
} else {
	const now = new Date();
	const yyyy = String(now.getFullYear());
	const mm = String(now.getMonth() + 1).padStart(2, '0');
	outDir = path.join(ROOT, 'public', 'blog-media', yyyy, mm);
	publicPath = `/blog-media/${yyyy}/${mm}/${outName}`;
}

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, outName);

if (fs.existsSync(outPath)) {
	console.error(`Already exists: ${outPath} -- pick a different source filename or delete the existing one first.`);
	process.exit(1);
}

const buffer = fs.readFileSync(sourceArg);
const before = buffer.length;

const image = sharp(buffer).rotate();
const metadata = await image.metadata();

let pipeline = image;
if (metadata.width && metadata.width > 1600) {
	pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
}

const output = outExt === '.png'
	? await pipeline.png({ quality: 82, compressionLevel: 9 }).toBuffer()
	: await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

fs.writeFileSync(outPath, output);

const alt = baseName.replace(/-/g, ' ');
const before_kb = (before / 1024).toFixed(0);
const after_kb = (output.length / 1024).toFixed(0);

console.log(`Saved: ${path.relative(ROOT, outPath)}  (${before_kb}KB -> ${after_kb}KB)`);
console.log('');
console.log('Paste this into your post/article:');
console.log('');
console.log(`![${alt}](${publicPath})`);
console.log('');
if (!isWiki) {
	console.log('If this should be the post thumbnail, also set in frontmatter:');
	console.log(`featuredImage: "${publicPath}"`);
}
