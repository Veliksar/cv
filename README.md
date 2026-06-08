# CV — Andrii Veliksar

Personal portfolio and CV site built with React, Vite, and GSAP.

**Live:** [veliksar.github.io/cv](https://veliksar.github.io/cv/)

## Stack

- React 19 + Vite 5
- React Router (GitHub Pages, base `/cv/`)
- GSAP + ScrollTrigger animations
- Three.js demo page (`/3d-demo`)

## Local development

```bash
npm install
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Deploy

Push to `main` triggers GitHub Actions workflow (`.github/workflows/deploy.yml`) and publishes to GitHub Pages.

## Structure

```
src/
  components/   UI sections (Hero, Skills, Experience, Contact, etc.)
  data/         portfolioData.js — single source of content
  pages/        HomePage, ThreeDemoPage
  hooks/        GSAP helpers
```

Content (experience, skills, contacts) is edited in `src/data/portfolioData.js`.

## Author

**Andrii Veliksar** — Fullstack WordPress Developer  
[GitHub](https://github.com/Veliksar) · [LinkedIn](https://linkedin.com/in/andrew-veliksar-ukraine/) · aveliksar97@gmail.com
