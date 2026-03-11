# Web Portfolio

A modern, animated personal portfolio built with Next.js 15 and React 19. Features parallax backgrounds, scroll-driven Lottie animations, and a fully static export for easy deployment anywhere.

<!-- Add a live preview URL or screenshot:
![Portfolio Preview](https://your-screenshot-url.png)
[Live Demo](https://your-portfolio-url.com)
-->

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js](https://nextjs.org) 15 (App Router) |
| UI | [React](https://react.dev) 19 |
| Language | [TypeScript](https://www.typescriptlang.org) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 |
| Animation | [Framer Motion](https://www.framer.com/motion), [React Spring](https://www.react-spring.dev), [Lottie](https://lottiefiles.com) |
| Fonts | [Geist](https://vercel.com/font) Sans & Mono |

## Features

- **Parallax hero** -- Multi-layer doodle background that reacts to mouse movement via React Spring
- **Scroll-driven animations** -- Lottie animations in the Creative, Experience, and Skills sections that play as you scroll
- **Experience timeline** -- Animated cards showcasing work history with highlights and domain tags
- **Skills showcase** -- Categorized skill highlights with dual Lottie animations
- **Contact section** -- Animated links to GitHub, LinkedIn, email, and resume
- **Responsive design** -- Mobile-first layout with adaptive animations (desktop-only Lottie, mobile fallbacks)
- **Static export** -- Produces a fully static `out/` directory deployable to any hosting provider

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind imports and theme variables
│   ├── layout.tsx           # Root layout, fonts, metadata
│   └── page.tsx             # Main single-page portfolio
├── components/
│   ├── BackgroundAnimator.tsx   # Parallax doodle layers
│   ├── CreativeSection.tsx      # Philosophy and creative highlights
│   ├── ExperienceSection.tsx    # Work experience timeline
│   ├── ExperienceCard.tsx       # Individual experience entry
│   ├── SkillsSection.tsx        # Skills and competencies
│   └── ContactSection.tsx       # Contact links
├── data/
│   ├── contactItems.ts          # GitHub, LinkedIn, email, resume
│   ├── creativeHighlights.ts    # Creative philosophy items
│   ├── experiences.ts           # Work experience entries
│   └── skillHighlights.ts       # Skill category items
├── hooks/
│   └── useIsMobile.ts           # Responsive breakpoint hook
└── utils/
    ├── clamp.ts                 # Numeric clamping utility
    └── lottie.ts                # Lottie initialization helper
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18.17 or later

### Installation

```bash
git clone https://github.com/your-username/web-portfolio.git
cd web-portfolio
npm install
```

### Development

```bash
npm run dev
```

Opens a dev server at [http://localhost:3000](http://localhost:3000) with Turbopack for fast refresh.

### Build

```bash
npm run build
```

Generates a static export in the `out/` directory.

### Lint

```bash
npm run lint
```

## Customization

All personal content lives in `src/data/` -- swap these files to make the portfolio your own:

| File | What to change |
|------|---------------|
| `experiences.ts` | Work history (company, role, period, highlights) |
| `skillHighlights.ts` | Skill categories and descriptions |
| `creativeHighlights.ts` | Philosophy / creative approach items |
| `contactItems.ts` | Social links, email, resume URL |

Update the profile photo at `public/images/landing-section/profile-pic.jpeg` and the metadata in `src/app/layout.tsx` (site title, description).

Lottie animation files are in `public/images/` under each section's folder. Replace them with your own `.lottie` files to change the scroll-driven animations.

## Deployment

The project is configured with `output: "export"` in `next.config.ts`, so `npm run build` produces a fully static site in the `out/` directory. Deploy it to any static hosting provider:

- **GitHub Pages** -- Push the `out/` folder or use a GitHub Action
- **Vercel** -- Connect the repo and deploy automatically
- **Netlify** -- Set the build command to `npm run build` and publish directory to `out`
- **Any static host** -- Upload the contents of `out/`

## License

This project is open source and available under the [MIT License](LICENSE).
