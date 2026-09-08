# Mario Sorgente Personal Website

## Overview
This repository contains Mario Sorgente's personal/founder website built as a Vite + React + TypeScript single-page application.

It includes:
- Home route: `/`
- Capability detail route: `/capability/:slug`
- Tailwind-styled UI sections (Navigation, Hero, Curriculum, CinematicVision, AlumniArchives, Blog, Footer)
- A token-driven stylesheet in `src/styles/`, with all colour, type, spacing and easing values defined in `tokens.css`
- Scroll-reveal animations driven by `src/hooks/useReveal.ts`, which honours `prefers-reduced-motion`
- Native CSS scroll-driven animations in `src/styles/scroll.css`, all behind `@supports`
- Static image/video assets from `public/`

## Tech stack
- Vite
- React 19
- TypeScript
- React Router
- Tailwind CSS
- GSAP
- Radix UI / shadcn-style components

## Local development
```bash
npm install
npm run dev
```

## Available scripts
```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Build
```bash
npm run build
```
Build output is generated in `dist/`.

## Preview production build
```bash
npm run preview
```

## Deployment on Vercel
This app uses `BrowserRouter`, so SPA rewrites are required for direct route visits.

A `vercel.json` is included with a rewrite from `/(.*)` to `/index.html`.

Recommended Vercel settings:
- Framework preset: `Vite`
- Root directory: `./`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: none required

## Project structure
```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── vercel.json
├── public/
│   ├── images/
│   └── videos/
├── scripts/
│   └── build-logo-assets.py
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── config.ts          # all page copy and link data
    ├── index.css          # Tailwind entry
    ├── styles/            # design tokens and per-section stylesheets
    ├── components/
    ├── data/
    ├── hooks/
    ├── lib/
    └── sections/
```

## Brand assets
The Zero2Hero logo files under `public/images/` are generated from the master artwork,
which is dark ink on a white background and cannot be used directly on the dark page.
Regenerate them after any logo change:

```bash
python scripts/build-logo-assets.py path/to/logo_zero.png
```

That writes the icon, the horizontal lockup used in the navigation, the stacked lockup
used in the footer, and both favicons. It needs `pillow` and `numpy`.

## Scroll-driven animation
`src/styles/scroll.css` uses native CSS scroll timelines. Two things will silently break
them, so avoid both on any ancestor of an animated element:

- `overflow: hidden` (use `clip`, which does not create a scroll container)
- any other property that makes an ancestor scrollable

`<body>` and the hero both use `overflow: clip` for exactly this reason.

## Styling
`src/index.css` loads Tailwind. `src/styles/app.css` is imported after it from `main.tsx`, so
the site's own rules win over Tailwind's preflight. Design tokens live in `src/styles/tokens.css`;
change a colour or a type step there and it propagates across every section.

## Environment variables
No environment variables are currently required by this project.

## Notes about public assets
- Images are served from `/public/images` and referenced via absolute paths like `/images/capability-1.jpg`.
- The process section is text only. There is no background video.
