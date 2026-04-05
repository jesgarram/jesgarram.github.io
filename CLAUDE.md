# Personal Blog

Astro static site deployed to GitHub Pages via GitHub Actions on push to `main`.

## Commands

- `npx astro dev` — local dev server
- `npx astro build` — build to `./build`
- `git push` — triggers deploy to https://jesgarram.github.io

## Adding a blog post

1. Create `src/content/blog/{slug}/index.md`
2. Place images (cover, inline) in the same folder
3. Frontmatter:

```yaml
---
title: 'Post Title'
description: 'One-line summary'
pubDate: 'Mon DD YYYY'
image: './cover.png'        # optional, co-located image
tags: ['Tag1', 'Tag2']      # optional
talkUrl: 'https://...'      # optional, shows "Watch the talk" link
---
```

The `image` field uses Astro's `image()` schema — use relative paths to co-located files, not `/public` paths.

## Project structure

```
src/
  content/blog/{slug}/index.md   — blog posts (one folder per post)
  pages/                         — routes (index, about, projects, blog)
  layouts/Base.astro             — shared HTML shell
  components/                    — Header, Footer
  lib/utils.ts                   — slug(), formatDate(), readingTime()
  assets/                        — non-content images (project logos)
  content.config.ts              — collection schemas
```

## Code conventions

- Shared helpers go in `src/lib/utils.ts` — don't duplicate logic across pages
- `getStaticPaths` runs in a separate module scope in Astro — helpers used there must be inlined or imported, not defined later in the frontmatter
- Images for blog posts live in the post's folder; project/page images go in `src/assets/`
- No `public/` directory — all images are processed through Astro's asset pipeline
- Links use plain paths (`/blog/...`, `/about`) — no `base` prefix needed (user site at root)
