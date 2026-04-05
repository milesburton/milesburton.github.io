# milesburton.com

Personal website built with [Hugo](https://gohugo.io/) using the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme.

## Local Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.145.0 or later)

### Setup

```bash
# Clone with submodules (for the theme)
git clone --recursive https://github.com/milesburton/milesburton.com.git
cd milesburton.com

# Start the dev server
hugo server -D
```

Visit `http://localhost:1313` to preview the site.

### Creating Content

```bash
# New blog post
hugo new blog/my-new-post.md

# New project page
hugo new projects/my-project.md
```

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

## License

Content is copyright Miles Burton. Code is MIT licensed.
