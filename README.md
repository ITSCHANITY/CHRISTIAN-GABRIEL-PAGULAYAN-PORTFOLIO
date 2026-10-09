# ITSCHANITY — Portfolio

A production-ready, highly interactive personal portfolio for **Christian
Gabriel Pagulayan (ITSCHANITY)** — a dark terminal / hacker aesthetic built
with Vue 3, TypeScript (strict), Tailwind CSS v3, and Vite.

## Features
- **Glitch system** — a reusable `<GlitchText>` component (scramble/decode,
  RGB channel split, hover-flip, click-lock) driving the hero name, logo,
  headings, skills, project codenames, and more.
- **Signature terminal** — a working fake shell (``` ` ``` to open) with a typed
  command registry, history (↑/↓), and tab autocomplete.
- **Sections** — hero, about (typed bio + tilt whoami + count-up stats),
  skills matrix (tabs + hex-grid viz), filterable projects grid + modal,
  scroll-driven experience timeline (GSAP), and a validated contact form.
- **Interactivity** — custom cursor, magnetic buttons, tilt cards, command
  palette (`Ctrl/⌘+K`), shortcuts overlay (`?`), scroll progress, section
  dots, theme switcher (crimson / matrix / cyan), toasts, and a Konami-code
  "SYSTEM BREACH" easter egg that unlocks a hidden theme.
- **Accessible & performant** — respects `prefers-reduced-motion`, FX toggle,
  lazy-loaded heavy layers (tsParticles, GSAP), semantic HTML, keyboard nav.

## Quick start
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build -> dist/
```

## Editing your content
**All content lives in `src/data/`.** See **[`EDIT_GUIDE.md`](./EDIT_GUIDE.md)**
for the full editable reference, the required-replacements checklist, and a
customization cheat sheet. Search the codebase for `✏️ EDIT` to find every
editable spot, or run `npm run dev` and toggle the ✏️ **Edit Mode** button in
the navbar to see file/key hints on hover.

## Stack
Vue 3 (Composition API) · TypeScript (strict, no `any`) · Tailwind CSS v3 ·
Vite · Vue Router · Pinia · VueUse · GSAP + ScrollTrigger · tsParticles ·
lucide-vue-next.

## Deploy
See the Deploy section in [`EDIT_GUIDE.md`](./EDIT_GUIDE.md) for Vercel and
Netlify steps.
