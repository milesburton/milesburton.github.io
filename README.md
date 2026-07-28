# milesburton.com

Personal homepage source for milesburton.com, built with Astro and deployed automatically to GitHub Pages.

## Stack

- Astro (static site output)
- GitHub Actions (build + deploy)
- GitHub Pages (hosting)

## Local development

From the project root:

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:4321` by default.

## Build

```sh
npm run build
```

Production output is generated in `dist/`.

## Deployment

Deployments are automatic on push to `main` via [/.github/workflows/deploy.yml](.github/workflows/deploy.yml).

Live URL:

https://milesburton.github.io/milesburton.com/

## Repository layout

```text
/
├── .github/workflows/deploy.yml
├── public/
├── src/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
└── package.json
```
