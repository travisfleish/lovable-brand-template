## Goal

Convert this project from a multi-page demo/showcase app into a clean **starter template**. The Vercel-hosted public app already covers the showcase use case. What new projects need from this repo is the brand kit — tokens, components, fonts, logos, icons — wired up and ready, with a tiny landing page proving it works.

## What gets deleted

These files exist only to render the showcase pages and are not part of the brand kit itself:

- `src/Catalog.tsx` — technical component catalog
- `src/MarketingCatalog.tsx` — visual brand guide
- `src/Glossary.tsx` — terminology page
- `src/BestPractices.tsx` — guidelines page
- `src/components/demo/` — entire folder (just `HintOverlay.tsx`, used only by the demo landing)
- `src/App.tsx` — the page switcher + sample marketing page (Stats row, Feature cards, TextCard demo, CTA banner, etc.)

## What stays untouched

The actual brand kit:

- `src/tokens/` — color, font, spacing, screen tokens
- `src/components/brand/` — Logo, BrandIcon
- `src/components/elements/` — Button, TextLink, Link, LinkGroup, PillTag, CustomLines, HighlightedText, TextCard
- `src/components/layouts/` — Section
- `src/components/sections/` — DotSubheading, TextMasthead, GetStartedCTA
- `src/components/icons/` — internal SVG primitives
- `src/utils/` — colorHelpers, text, links
- `src/index.css` — font-face, CSS vars, typography scale, utilities
- `tailwind.config.ts`
- `public/fonts/`, `public/logos/`, `public/icons/`
- Routing scaffolding (`src/routes/__root.tsx`, `src/router.tsx`, `src/server.ts`)

## What replaces the demo

A new minimal landing page rendered directly inside `src/routes/index.tsx` (no more separate `App.tsx`). Composition:

- Full-viewport centered layout on a `navy` background (uses `Section` with `background_color: "navy"`)
- `Logo` component, vertical variant, white, sized large
- Heading: "Genius Brand Kit" (uses `.text-h1` or `.text-72`)
- Single-line subhead in `font-body` text-white/70: "A Lovable-ready starter template with Genius Sports' brand foundations built in."
- Small footer line at the bottom: "Start building — every component, token, and font is ready to use."

This proves the kit is wired (fonts load, tokens resolve, Logo renders, Section + typography work) and gives the user a single screen to confirm the template is working before they prompt Lovable to build on top.

## Why this shape

- **One route, one component** — easiest possible starting point for Lovable to extend.
- **Uses brand components rather than raw markup** — confirms the kit actually works end-to-end in a fresh project.
- **No nav, no extra pages, no demo scaffolding** — nothing for a marketer to delete before they start prompting.

## Out of scope

- Tokens, components, fonts, logos, icons — none get edited.
- `tailwind.config.ts`, `src/index.css`, `tsconfig.json`, `package.json`, `vite.config.ts` — none get edited.
- Routing setup, SSR entry, `__root.tsx` — none get edited.

## Expected outcome

After implementation:
- `src/routes/index.tsx` renders a single branded landing screen at `/`.
- No other routes or app-level page-switching exists.
- All brand kit imports (`~/components/...`, `~/tokens/...`, `~/utils/...`) continue to resolve and are ready for new code.
- Repo is ~6 fewer source files but functionally complete as a template.