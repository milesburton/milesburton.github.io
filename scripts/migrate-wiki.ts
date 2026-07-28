import { writeFile, mkdir } from 'node:fs/promises';
import fetch from 'node-fetch';
import path from 'node:path';

/**
 * Simple MediaWiki to Markdown migration script.
 *
 * It fetches the wikitext of a given page using the MediaWiki API,
 * converts it to Markdown using a very basic replacement strategy,
 * and writes the result to the Astro project's `src/pages/wiki` directory.
 *
 * Usage (from the project root):
 *   npx ts-node scripts/migrate-wiki.ts Main_Page
 *
 * You can run it for multiple pages by providing a space‑separated list:
 *   npx ts-node scripts/migrate-wiki.ts Main_Page About_Miles
 */

const API_ENDPOINT = 'https://www.milesburton.com/w/api.php';

/** Very naive wikitext → markdown conversion.
 *  For a professional migration you would replace this with a proper parser
 *  (e.g., `wtf_wikipedia` or `pandoc`). This implementation handles the most
 *  common elements such as headings, bold/italic, links and lists.
 */
function wikitextToMarkdown(wikitext: string): string {
  // Headings: == Heading == -> ## Heading
  let md = wikitext.replace(/^={2,6}\s*(.+?)\s*={2,6}\s*$/gm, (_, title) => {
    const level = _.match(/^=+/)![0].length - 1; // = -> h1, == -> h2, etc.
    return `${'#'.repeat(level)} ${title.trim()}`;
  });

  // Bold: '''bold''' -> **bold**
  md = md.replace(/'''([^']+)'''/g, '**$1**');
  // Italic: ''italic'' -> *italic*
  md = md.replace(/''([^']+)''/g, '*$1*');

  // Internal links: [[Page|Label]] -> [Label](./Page.md)
  md = md.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, page, label) => {
    const file = `${page.replace(/\s+/g, '_')}.md`;
    return `[${label}](./${file})`;
  });
  // Simple internal links without label: [[Page]] -> [Page](./Page.md)
  md = md.replace(/\[\[([^\]|]+)\]\]/g, (_, page) => {
    const file = `${page.replace(/\s+/g, '_')}.md`;
    return `[${page}](./${file})`;
  });

  // External links: [https://example.com label] -> [label](https://example.com)
  md = md.replace(/\[([^\s]+)\s+([^\]]+)\]/g, (_, url, label) => {
    return `[${label}](${url})`;
  });

  // Unordered lists: * item -> - item
  md = md.replace(/^\*\s+/gm, '- ');
  // Ordered lists: # item -> 1. item (simple conversion)
  md = md.replace(/^#\s+/gm, '1. ');

  return md.trim();
}

async function fetchWikitext(page: string): Promise<string> {
  const url = new URL(API_ENDPOINT);
  url.searchParams.set('action', 'parse');
  url.searchParams.set('page', page);
  url.searchParams.set('prop', 'wikitext');
  url.searchParams.set('format', 'json');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch page "${page}": ${response.statusText}`);
  }
  const data = (await response.json()) as any;
  if (!data?.parse?.wikitext?.['*']) {
    throw new Error(`No wikitext returned for page "${page}"`);
  }
  return data.parse.wikitext['*'] as string;
}

async function migratePage(page: string): Promise<void> {
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
      console.error(`❌ Failed to migrate ${page}:`, (err as Error).message);
    }
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
