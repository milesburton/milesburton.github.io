#!/usr/bin/env node
// Scaffolds a new wiki article: src/pages/wiki/slug.md
// Usage: npm run new-wiki "Article Title"
// The Wiki index page picks it up automatically -- no registration needed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WIKI_DIR = path.join(__dirname, '..', 'src', 'pages', 'wiki');

const [, , titleArg] = process.argv;

if (!titleArg) {
	console.error('Usage: npm run new-wiki "Article Title"');
	process.exit(1);
}

function slugify(title) {
	return title
		.toLowerCase()
		.replace(/[()]/g, '')
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_+|_+$/g, '');
}

const slug = slugify(titleArg);
const filepath = path.join(WIKI_DIR, `${slug}.md`);

if (fs.existsSync(filepath)) {
	console.error(`Already exists: ${filepath}`);
	process.exit(1);
}

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const display = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date());

const needsQuoting = / : |: /.test(titleArg);
const frontmatterTitle = needsQuoting ? `"${titleArg.replace(/"/g, '\\"')}"` : titleArg;

const template = `---
layout: ../../layouts/Layout.astro
title: ${frontmatterTitle}
date: ${now}
---

# ${titleArg}

<p class="wiki-date">Written <time datetime="${now}">${display}</time></p>

<!--
  QUICK REFERENCE -- delete this comment block once you're done.

  Images:
    First, run: npm run add-image -- /path/to/photo.jpg wiki
    It resizes/compresses the image, drops it in public/wiki-media/,
    and prints the exact markdown line to paste below.
    The first image in the article becomes its card thumbnail
    automatically on the Wiki index -- no extra step needed.

  Formatting:
    **bold**            *italic*            \`inline code\`
    [link text](https://example.com)
    [Another wiki article](/wiki/some_other_article_slug/)
    > A blockquote for pulling out a quote or aside.
    - bullet list
    1. numbered list

    Code block with syntax highlighting:
    \`\`\`python
    print("hello")
    \`\`\`

    Table:
    | Column A | Column B |
    | --- | --- |
    | value | value |

  This article shows up on /wiki/Main_Page/ automatically, sorted by
  date. No registration step needed. If this article is really a
  landing page that mostly links out to others (like Arduino or
  Engineering), add its slug to SECTION_SLUGS in Main_Page.astro so
  it gets a "Section" badge instead of being treated as a direct
  write-up.
-->

Write your article here.
`;

fs.writeFileSync(filepath, template);
console.log(`Created: ${path.relative(process.cwd(), filepath)}`);
console.log(`Slug: ${slug}`);
console.log(`URL: /wiki/${slug}/`);
