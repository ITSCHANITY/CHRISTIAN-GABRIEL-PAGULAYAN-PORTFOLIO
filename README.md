<<<<<<< HEAD
# ITSCHANITY — Portfolio

A production-ready, highly interactive personal portfolio for Christian
Gabriel Pagulayan (ITSCHANITY) — built
with Vue 3, TypeScript (strict), Tailwind CSS v3, and Vite.

## Features
- **Glitch system** — a reusable `<GlitchText>` component (scramble/decode,
  RGB channel split, hover-flip, click-lock) driving the hero name, logo,
  headings, skills, project codenames, and more.
- **Signature terminal** — a working fake shell (``` ` ``` to open) with a typed
  command registry, history (↑/↓), and tab autocomplete.
- **Sections** — hero, about (typed bio + tilt whoami + count-up stats),
  skills matrix (category cards with animated progress bars), filterable
  projects grid + modal, resume/CV download, and a validated contact form.
- **Interactivity** — themed cursor, tilt cards, command
  palette (`Ctrl/⌘+K`), shortcuts overlay (`?`), scroll progress, section
  dots, theme switcher (crimson / matrix / cyan), toasts, and a Konami-code
  "SYSTEM BREACH" easter egg that unlocks a hidden theme.
- **Accessible & performant** — respects `prefers-reduced-motion`, FX toggle,
  matrix-rain background that pauses when hidden, semantic HTML, keyboard nav.

## Quick start
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build -> dist/
```

## Editing your content
**All content lives in `src/data/`** — edit `profile.ts`, `skills.ts`,
`projects.ts`, `socials.ts`, `theme.ts`, and `commands.ts`. Components contain
no hardcoded personal text.

## Stack
Vue 3 (Composition API) · TypeScript (strict, no `any`) · Tailwind CSS v3 ·
Vite · Vue Router · Pinia · VueUse · lucide-vue-next.

## Deploy
- **Vercel:** import the repo, framework preset **Vite**, build `npm run build`, output `dist`.
- **Netlify:** build `npm run build`, publish `dist` (SPA routing handled by `public/_redirects`).
=======
# CHRISTIAN-GABRIEL-PAGULAYAN-PORTFOLIO
>>>>>>> 2d3c3eaf829230de81c5c9db9057e16530f31e24
