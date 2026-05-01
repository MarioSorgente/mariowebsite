# Mario Sorgente Personal Website

## Overview
This repository contains Mario Sorgente's personal/founder website built as a Vite + React + TypeScript single-page application.

It includes:
- Home route: `/`
- Capability detail route: `/capability/:slug`
- Tailwind-styled UI sections (Navigation, Hero, Curriculum, CinematicVision, AlumniArchives, Footer)
- GSAP-based animations
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
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── config.ts
    ├── index.css
    ├── components/
    ├── hooks/
    ├── lib/
    └── sections/
```

## Environment variables
No environment variables are currently required by this project.

## Notes about public assets
- Images are served from `/public/images` and referenced via absolute paths like `/images/capability-1.jpg`.
- Video is served from `/public/videos` and referenced as `/videos/cinematic-vision.mp4`.
