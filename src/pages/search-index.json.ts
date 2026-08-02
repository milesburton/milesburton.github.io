import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

interface SearchEntry {
	title: string;
	url: string;
	section: string;
	excerpt: string;
}

const wikiFiles = import.meta.glob('./wiki/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function stripFrontmatter(raw: string): { title: string; body: string } {
	const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
	if (!match) return { title: '', body: raw };
	const [, frontmatter, body] = match;
	const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
	const title = titleMatch ? titleMatch[1].trim().replace(/^"(.*)"$/, '$1') : '';
	return { title, body };
}

function toExcerpt(markdown: string, length = 200): string {
	const plain = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#*_`>-]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
	return plain.slice(0, length);
}

export const GET: APIRoute = async () => {
	const entries: SearchEntry[] = [];

	entries.push(
		{ title: 'Home', url: '/', section: 'Site', excerpt: 'Software engineer working on trading systems, infrastructure, and embedded projects.' },
		{ title: 'Projects', url: '/projects/', section: 'Site', excerpt: 'Public repositories, pulled directly from GitHub.' },
		{ title: 'Blog', url: '/blog/', section: 'Site', excerpt: 'Writing on infrastructure, embedded electronics, and networking.' },
		{ title: 'Wiki', url: '/wiki/Main_Page/', section: 'Site', excerpt: 'Organic thoughts, guides, and general write-ups.' },
		{ title: 'Contact', url: '/contact/', section: 'Site', excerpt: 'Get in touch about engineering work, collaboration, or anything on this site.' }
	);

	const posts = await getCollection('blog');
	for (const post of posts) {
		entries.push({
			title: post.data.title,
			url: `/blog/${post.data.slug}/`,
			section: 'Blog',
			excerpt: post.data.excerpt ?? toExcerpt(post.body ?? ''),
		});
	}

	for (const [path, raw] of Object.entries(wikiFiles)) {
		const slugMatch = path.match(/\.\/wiki\/(.+)\.md$/);
		if (!slugMatch) continue;
		const slug = slugMatch[1];
		if (slug === 'Main_Page') continue;
		const { title, body } = stripFrontmatter(raw);
		entries.push({
			title: title || slug,
			url: `/wiki/${slug}/`,
			section: 'Wiki',
			excerpt: toExcerpt(body),
		});
	}

	return new Response(JSON.stringify(entries), {
		headers: { 'Content-Type': 'application/json' },
	});
};
