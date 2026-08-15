# Ayush Yadav — Editorial Developer Portfolio

A from-scratch React/TypeScript portfolio for backend developer and AI builder Ayush Yadav. It combines an editorial layout with a custom GSAP image-stack opening, interactive case studies, smooth scrolling, and a physics-driven skill field.

## Stack

- React 18 + TypeScript + Vite
- GSAP + ScrollTrigger for scroll-linked motion
- Lenis for smooth scrolling
- Matter.js for the interactive physics skill field
- Custom CSS, supplied reveal artwork, inline SVG artwork, and locally bundled fonts
- Playwright CLI for responsive visual QA

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Main customization points

- `src/data.ts`: navigation, timeline, featured work, projects, skills, and gallery data
- `src/App.tsx`: page sections, hero graphic, menu, terminal, and animation setup
- `src/styles.css`: color system, typography, layout, and responsive behavior
- `index.html`: title and metadata
- `public/reveal`: five images used by the opening sequence
- `public/Ayush-Yadav-Resume.pdf`: downloadable résumé
