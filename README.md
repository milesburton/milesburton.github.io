# milesburton.com

The public landing page for milesburton.com — a static Astro site that consolidates my projects, writing, and reference notes into one place, replacing what used to be a separate WordPress blog and MediaWiki install.

Deployed to GitHub Pages on every push to `main`.

## Why this migration

This site used to be three separate properties: a static homepage, a WordPress.com-hosted blog at `blog.milesburton.com`, and a self-hosted MediaWiki instance at `www.milesburton.com/w`. The goal of this migration is to shut all of that down and run everything as one static site with no server-side moving parts — nothing to patch, nothing to host, nothing to compromise.

That last point isn't hypothetical. The MediaWiki instance had been silently compromised over a long period: of roughly 139,000 pages in its database, only ~200 were genuine articles — the rest was SEO spam injected via what was almost certainly an unpatched vulnerability or open registration, backed by over 260,000 fake accounts. That wiki is being decommissioned rather than patched; only the handful of real articles are worth carrying forward, and they're being ported in by hand as time allows (see [Wiki migration status](#wiki-migration-status) below).

The WordPress blog wasn't compromised, but keeping a database-backed CMS running just to serve ~80 mostly-static posts was more infrastructure than the content justified. Its full archive — every post, category, tag, and embedded image — was pulled via the WordPress.com REST API (the public RSS feed only ever exposes the 10 most recent posts, so a plain feed scrape would have silently dropped everything older) and converted into the Astro content collection at `src/content/blog/`. That migration is complete: all posts are live under `/blog/`, and `blog.milesburton.com` can be safely retired.

### Wiki migration status

Given the spam compromise, `src/pages/wiki/Main_Page.md` is currently a placeholder rather than a pulled dump of the live wiki — pages are being ported in individually, checked against the real content, as they're migrated. `www.milesburton.com/w` should not be treated as a trustworthy source to script against in bulk.

`scripts/migrate-wiki.ts` is an early, unfinished attempt at automating this: it fetches a page's wikitext from the MediaWiki API and does a naive regex-based conversion to Markdown. Its link handling (`[[...]]` and `[url label]` syntax) doesn't hold up on real articles and produces broken Markdown links — don't treat its output as ready to publish without a manual pass, and it has no way to tell a real article from a spam page. It's kept around as a starting point, not a working pipeline.

## Pages

|                                    |                                    |
| ---------------------------------- | ---------------------------------- |
| ![Home](docs/screenshots/home.png) | ![Blog](docs/screenshots/blog.png) |
| **Home** — tile-based landing page with sidebar navigation | **Blog** — full archive migrated from WordPress |
| ![Post](docs/screenshots/blog-post.png) | ![Projects](docs/screenshots/projects.png) |
| **Post** — individual blog entries, rendered from local content | **Projects** — open-source work pulled from GitHub |
| ![Wiki](docs/screenshots/wiki.png) | |
| **Wiki** — reference notes, being migrated in from the old MediaWiki | |

## Stack

- [Astro](https://astro.build) (static output, no server runtime)
- Content collections for blog posts (`src/content/blog`, schema in `src/content.config.ts`) — each post is a Markdown file with `title`, `date`, `slug`, `categories`, `tags`, and `excerpt` frontmatter; the body is the original post HTML with image URLs rewritten to `/blog-media/...`
- Post images live in `public/blog-media/YYYY/MM/`, resized (max width 1600px) and re-compressed from the WordPress originals — the source archive was ~226MB, the committed copy is ~27MB
- Deployed via GitHub Actions to GitHub Pages (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml))

## Development

```bash
npm install
npm run dev
```

## Adding content

No CMS, no database — deliberately, so the site stays fully static and doesn't need a server to host or maintain (see [Why this migration](#why-this-migration)). New posts and articles are just Markdown files committed to this repo. Three scripts remove the boilerplate.

### New blog post

```bash
npm run new-post -- "Post Title" "Tag1,Tag2"
```

Creates `src/content/blog/YYYY-MM-DD-slug.md` with frontmatter pre-filled (title, today's date, a slug derived from the title, and your tags). Tags should come from the fixed taxonomy used across the site so filtering/gateway pages keep working:

`AI, Amateur Radio, Career, Coding, Databases, DevOps, Electric Vehicles, Hardware, Home Lab, Life, Networking, News, Renewables, Retro & Gaming, Security`

Passing a tag outside this list prints a warning but doesn't block creation — add the tag to `KNOWN_TAGS` in [scripts/new-post.mjs](scripts/new-post.mjs) first if it's a genuinely new topic, rather than letting the taxonomy drift silently.

### New wiki article

```bash
npm run new-wiki -- "Article Title"
```

Creates `src/pages/wiki/slug.md`. Nothing else needs updating — `src/pages/wiki/Main_Page.astro` derives its article list, dates, thumbnails, and short descriptions straight from each file's content at build time.

If the new page is a **hub/section page** (a page whose job is mainly to link out to other pages, like `engineering.md` or `arduino.md`), add its slug to the `SECTION_SLUGS` set near the top of `Main_Page.astro` so it gets the "Section" badge instead of being presented as a direct article.

### Adding an image

```bash
npm run add-image -- /path/to/photo.jpg my-post-slug   # blog: writes to public/blog-media/YYYY/MM/
npm run add-image -- /path/to/photo.jpg wiki           # wiki: writes to public/wiki-media/
```

Auto-rotates, resizes (max 1600px wide, never upscales), and compresses the image, then prints the exact Markdown snippet to paste and, for blog posts, a `featuredImage:` frontmatter suggestion to use as the post's card thumbnail/OG image.

### Markdown reference

Each generated file includes an HTML-comment quick-reference block covering bold/italic/code, links, blockquotes, lists, code fences, and tables — delete it once you're done writing. There's no LaTeX/rich editor support by design; if you need something Markdown can't express, it's usually a sign the content wants a code block or a plain image rather than custom layout.

### Before pushing

```bash
npm run dev              # preview locally at http://localhost:4321
npm test                 # run the Playwright suite (structural + visual + alignment checks)
npm run test:update-snapshots   # only if a visual change is intentional — review the diff first
```

`npm test` builds the site and checks every page template for console errors, broken links/images, and layout regressions (e.g. cards misaligning), and pixel-diffs key pages against committed baselines in `e2e/visual.spec.ts-snapshots/`. The same suite runs in CI on every push and pull request (see [.github/workflows/test.yml](.github/workflows/test.yml)) and will flag a failing check — with the pixel diffs attached as a downloadable artifact — if something regresses visually.

## Licence

This project is licensed under the GNU General Public License v3.0.

See [LICENSE](LICENSE) for full terms.

## Security

If you discover a security issue related to this repository, please follow the guidance in [SECURITY.md](SECURITY.md).
