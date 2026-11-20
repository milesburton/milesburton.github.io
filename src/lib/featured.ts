import fs from 'node:fs';
import path from 'node:path';
import featuredData from '../data/featured.json';
import { fetchOwnedRepos } from './github';

export interface FeaturedProject {
	repo: string;
	title: string;
	category: string;
	description: string;
	tags: string[];
	liveHref?: string;
	image: string;
	imageAlt: string;
	screenshot: { url: string; waitMs?: number; clickText?: string } | null;
}

export interface FeaturedTile extends FeaturedProject {
	href: string;
	kicker: string;
	/** Public URL of the screenshot, or null when none exists yet (render the placeholder). */
	imageSrc: string | null;
}

const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'projects');

export const featuredProjects = featuredData as FeaturedProject[];

// A missing image must never reach the page as a 404 + visible alt text, so the
// image is only used when the file is actually on disk at build time.
export function projectImageFor(slug: string): string | null {
	return fs.existsSync(path.join(IMAGE_DIR, `${slug}.jpg`)) ? `/images/projects/${slug}.jpg` : null;
}

// Curated image for a repo name (used by the Projects page too), or null.
export function curatedImageForRepo(repo: string): string | null {
	const match = featuredProjects.find((p) => p.repo === repo);
	return match ? projectImageFor(match.image) : null;
}

export function starLabel(stars: number): string | null {
	if (stars >= 1000) return `${Math.floor(stars / 1000)}k+ stars`;
	if (stars >= 100) return `${Math.floor(stars / 100) * 100}+ stars`;
	return null;
}

export async function loadFeaturedTiles(): Promise<FeaturedTile[]> {
	const repos = await fetchOwnedRepos('milesburton');
	return featuredProjects.map((project) => {
		const repo = repos.find((r) => r.name === project.repo);
		const stars = repo ? starLabel(repo.stargazers_count) : null;
		return {
			...project,
			href: repo?.html_url ?? `https://github.com/milesburton/${project.repo}`,
			kicker: stars ? `${project.category} · ${stars}` : project.category,
			imageSrc: projectImageFor(project.image),
		};
	});
}
