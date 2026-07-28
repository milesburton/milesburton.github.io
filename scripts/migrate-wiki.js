import { writeFile, mkdir } from 'fs/promises';
import fetch from 'node-fetch';
import path from 'path';

/**
 * Simple MediaWiki to Markdown migration script (JavaScript version).
 *
 * Usage:
 *   node scripts/migrate-wiki.js Main_Page
 *   node scripts/migrate-wiki.js Main_Page About_Miles
 */

const API_ENDPOINT = 'https://www.milesburton.com/w/api.php';

function wikitextToMarkdown(wikitext) {
  // Headings: == Heading == -> ## Heading
  let md = wikitext.replace(/^={2,6}\s*(.+?)\s*={2,6}\s*$/gm, (_, title) => {
    const level = _.match(/^=+/)[0].length - 1;
    return `${'#'.repeat(level)} ${title.trim()}`;
  });

  // Bold and italic
  md = md.replace(/'''([^']+)'''/g, '**$1**');
  md = md.replace(/''([^']+)''/g, '*$1*');

  // Internal links with label: [[Page|Label]] -> [Label](./Page.md)
  md = md.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, page, label) => {
    const file = `${page.replace(/\s+/g, '_')}.md`;
    return `[${label}](./${file})`;
  });
  // Simple internal links: [[Page]] -> [Page](./Page.md)
  md = md.replace(/\[\[([^\]|]+)\]\]/g, (_, page) => {
    const file = `${page.replace(/\s+/g, '_')}.md`;
    return `[${page}](./${file})`;
  });

  // External links: [https://example.com label] -> [label](https://example.com)
  md = md.replace(/\[([^\s]+)\s+([^\]]+)\]/g, (_, url, label) => `[${label}](${url})`);

  // Lists
  md = md.replace(/^\*\s+/gm, '- ');
  md = md.replace(/^#\s+/gm, '1. ');

  return md.trim();
}

async function fetchWikitext(page) {
  const url = new URL(API_ENDPOINT);
  url.searchParams.set('action', 'parse');
  url.searchParams.set('page', page);
  url.searchParams.set('prop', 'wikitext');
  url.searchParams.set('format', 'json');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch page "${page}": ${response.statusText}`);
  }
  const data = await response.json();
  if (!data?.parse?.wikitext?.['*']) {
    throw new Error(`No wikitext returned for page "${page}"`);
  }
  return data.parse.wikitext['*'];
}

async function migratePage(page) {
  const wikitext = await fetchWikitext(page);
  const markdown = wikitextToMarkdown(wikitext);

  const outDir = path.resolve('src/pages/wiki');
  await mkdir(outDir, { recursive: true });
  const fileName = `${page.replace(/\s+/g, '_')}.md`;
  const outPath = path.join(outDir, fileName);
  await writeFile(outPath, `# ${page}\n\n${markdown}\n`, 'utf8');
  console.log(`✅ Migrated ${page} → ${outPath}`);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Provide at least one page title as an argument');
    process.exit(1);
  }
  for (const page of args) {
    try {
      await migratePage(page);
    } catch (err) {
      console.error(`❌ Failed to migrate ${page}:`, err.message);
    }
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
