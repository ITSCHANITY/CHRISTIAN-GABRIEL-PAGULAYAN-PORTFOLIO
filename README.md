# Ian — Security Engineer Portfolio

A personal portfolio site with a dark terminal / hacker aesthetic, built for a
cybersecurity-focused Computer Engineering student. Covers three project tracks:
**cybersecurity tooling**, **embedded / IoT**, and **web app development**.

Built with **Vue 3 (Composition API + `<script setup>`)**, **TypeScript**, and
**Tailwind CSS v4**.

---

## Features

- Dark terminal aesthetic — monospace type, prompt symbols, blinking cursor,
  subtle scanlines + accent glow, animated typewriter tagline.
- Fully responsive (mobile nav, fluid grids).
- Tasteful scroll-reveal animations via a lightweight `v-reveal` directive
  (IntersectionObserver). Respects `prefers-reduced-motion`.
- Expandable, case-study–style project cards, organized by track with filtering.
- Content-driven: the entire site renders from typed data files — no need to
  touch components to add projects.

## Tech stack

| Concern    | Choice                              |
| ---------- | ----------------------------------- |
| Framework  | Vue 3 (Composition API)             |
| Language   | TypeScript                          |
| Styling    | Tailwind CSS v4 (CSS-first `@theme`) |
| Build tool | Vite                                |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check (vue-tsc) + production build -> dist/
npm run preview  # preview the production build locally
```

## Project structure

```
portfolio/
├─ index.html                 # meta, fonts (Inter + JetBrains Mono)
├─ vite.config.ts             # Vite + Tailwind plugin + "@" alias
├─ src/
│  ├─ main.ts                 # app bootstrap; registers v-reveal
│  ├─ App.vue                 # page assembly (Nav + sections + Footer)
│  ├─ style.css               # Tailwind @theme (colors/fonts/anim) + globals
│  ├─ data/                   # ← EDIT CONTENT HERE
│  │  ├─ types.ts             #   shared TypeScript model
│  │  ├─ profile.ts           #   identity, about, tracks, skills, socials
│  │  └─ projects.ts          #   all projects across the three tracks
│  ├─ directives/
│  │  └─ reveal.ts            # v-reveal scroll-reveal directive
│  ├─ lib/
│  │  └─ presentation.ts      # status + track-accent class maps
│  └─ components/
│     ├─ AppNav.vue           # fixed nav + mobile menu
│     ├─ AppFooter.vue
│     ├─ AppIcon.vue          # inline SVG icons
│     ├─ TerminalWindow.vue   # reusable terminal-window chrome
│     ├─ SectionHeader.vue    # terminal-prompt section headings
│     ├─ ProjectCard.vue      # expandable case-study card
│     ├─ TypedText.vue        # hero typewriter
│     └─ sections/
│        ├─ HeroSection.vue
│        ├─ AboutSection.vue
│        ├─ ProjectsSection.vue
│        ├─ SkillsSection.vue
│        └─ ContactSection.vue
```

## Editing content

Everything visible is driven by `src/data`. You usually never need to edit a
component to update the site.

### Add a project

Append an entry to `src/data/projects.ts`:

```ts
{
  id: 'my-new-tool',              // unique slug
  track: 'security',              // 'security' | 'embedded' | 'web'
  name: 'My New Tool',
  tagline: 'One-line description shown on the collapsed card',
  status: 'active',               // live | active | thesis | wip | planned | archived
  period: '2025',
  featured: false,                // true = slightly larger emphasis
  stack: ['Python', 'FastAPI'],
  summary: 'Shown when the card is expanded.',
  highlights: [
    'Case-study bullet one.',
    'Case-study bullet two.',
  ],
  links: [{ label: 'Repo', href: 'https://github.com/...', icon: 'github' }],
}
```

The card appears automatically under the correct track, and the track filter
count updates. The **web** track already has a placeholder entry — replace it
with real projects as they ship.

### Update identity / skills / contact

Edit `src/data/profile.ts` — `profile`, `about`, `tracks`, `skillGroups`, and
`socials`.

> **Before deploying:** the `socials` entries in `profile.ts` use placeholder
> URLs (`ian@example.com`, `github.com/`, `linkedin.com/`). Swap in your real
> email and profile links.

### Theming

Colors, fonts, and animations live in the `@theme` block at the top of
`src/style.css`. Change `--color-accent` to re-skin the whole site's accent.

## Deploying

`npm run build` outputs a static site to `dist/`, deployable to any static host
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, S3 + CloudFront, etc.).
For sub-path hosting (e.g. GitHub Pages project sites), set `base` in
`vite.config.ts`.
