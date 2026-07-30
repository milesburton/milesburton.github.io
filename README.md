# milesburton.com

The public landing page for milesburton.com — a static Astro site that consolidates my projects, writing, and reference notes into one place, replacing what used to be a separate WordPress blog and MediaWiki install.

Deployed to GitHub Pages on every push to `main`.

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

- [Astro](https://astro.build) (static output)
- Content collections for blog posts (`src/content/blog`)
- Deployed via GitHub Actions to GitHub Pages (see [.github/workflows/deploy.yml](.github/workflows/deploy.yml))

## Development

```bash
npm install
npm run dev
```

## Licence

This project is licensed under the GNU General Public License v3.0.

See [LICENSE](LICENSE) for full terms.

## Security

If you discover a security issue related to this repository, please follow the guidance in [SECURITY.md](SECURITY.md).
