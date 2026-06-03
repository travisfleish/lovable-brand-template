# GS Brand Template — Claude Context

## What this is
Vite + React + TS + Tailwind brand template for **Genius Sports' enterprise Lovable account**. Gives commercial/marketing teams a brand-accurate starting point for sales collateral, microsites, and internal tools.

## Why it exists
The GS main site is Next.js + WordPress. The `@genius-sports/gs-brand-kit` npm package depends on `next/link`, `next/image`, `next/navigation`, `next/font` — none work in Lovable (Vite). This template re-implements the same components, tokens, and brand foundations in a Vite-compatible way with **zero Next.js dependencies**.

## Who uses it
Non-technical marketing professionals prompting through Lovable. They do not write code. The template ensures everything they build is on-brand by default.

---

## Tech stack
- Vite 7 + React 18 + TypeScript
- **Tailwind CSS v4** via `@tailwindcss/vite`, with the v3-style brand config (`tailwind.config.ts`) pulled in through `@config` in `src/index.css`
- framer-motion (Button hover), clsx
- Plugins: `@tailwindcss/typography`, `forms`, `aspect-ratio`
- Path alias: `~/` → `./src`

### Runtime
Runs on **Vite 7 + TanStack Start** via `@lovable.dev/vite-tanstack-config`. SSR entry: `src/server.ts`. File-based routing in `src/routes/` (`__root.tsx` = root layout, `index.tsx` = `/`). Do **NOT** reintroduce `vinxi`, `app.config.ts`, `next/*` imports, or `src/pages/`.

---

## Project structure
```
public/
  fonts/    woff2 files
  logos/    8 SVG logo variants
  icons/light/  25 navy icon PNGs (for light bg)
  icons/dark/   25 white icon PNGs (for dark bg)

src/
  index.css   @font-face, CSS vars, full type scale
  main.tsx    entry point
  App.tsx     page switcher: demo | catalog | brand-guide
  Catalog.tsx          technical component reference (devs)
  MarketingCatalog.tsx brand guide (marketers, no code)

  tokens/tokens.ts    typed exports: colors, fontFamily, screens, spacing

  components/
    brand/      Logo, BrandIcon
    elements/   Button, TextLink, Link, LinkGroup, PillTag,
                CustomLines, HighlightedText, TextCard
    layouts/    Section
    sections/   DotSubheading, TextMasthead, GetStartedCTA
    icons/      Icons.tsx (internal SVG primitives)

  utils/
    colorHelpers.ts  getHexValue, getClassValue, getTextColor,
                     getBackgroundAndTextColor, getSectionColors
    text.tsx         getSplitBreakText (<> → line break),
                     getHighlightedText (|pipes| → colored span)
    links.tsx        getButtonLinkProps, getTextLinkProps, getLinkTarget
```

---

## The three pages
`App.tsx` toggles between:
- **Demo** (default) — sample landing page showing components in context
- **Brand Guide** (`brand-guide`) — `MarketingCatalog.tsx`, visual reference with copy-paste Lovable prompts per example, no code shown
- **Component Catalog** (`catalog`) — `Catalog.tsx`, technical reference with full prop tables and code snippets

---

## Design tokens

### Colors (17 total)
Defined in `src/tokens/tokens.ts`, mirrored in `tailwind.config.ts` and as CSS vars in `index.css`.

```
navy #0D1226 | blue #0000DC | lightBlue #95ECFD | brightGreen #E1FF67
lightGreen #18C971 | green #047C40 | lightPurple #C2D1FF | purple #4337A8
lightOrange #FFEBAF | orange #FA5D00 | lightRed #F76B6A | red #C20000
black #000000 | lightGrey #F6F7F9 | lavenderGrey #E7E7E9 | white #ffffff | snow #FAFAFA
```

### Typography
CSS classes in `src/index.css`. Fluid scaling via `clamp()` between 768px and 1024px.
- Headings: `h1`–`h6` / `.text-h1`–`.text-h6`, plus `.text-h7`
- Display: `.text-88`, `.text-80`, `.text-72`, `.text-70`, `.text-64`, `.text-header-stat`
- Body/UI: `.text-40`, `.text-40-s`, `.text-36`, `.text-32`, `.text-30`, `.text-24`, `.text-22`, `.text-20`, `.text-18`, `.text-17`, `.text-16`, `.text-15`, `.text-14`, `.text-12`, `.text-11`, `.text-9`

### Fonts
- `font-heading` → **KlarheitKurrent** (display, headings, ALL UI including buttons)
- `font-body` → **RedHatText** (body copy, captions, labels)

**Cascade rule**: `html` has `@apply font-heading`. `body` does NOT override to `font-body` — intentional, so buttons inherit KlarheitKurrent. Apply `font-body` explicitly to paragraphs/labels only.

**Font files** in `public/fonts/`:
- `KlarheitKurrent-Regular.woff2` (400, licensed)
- `KlarheitKurrent-Bold.woff2` (700, licensed)
- `ESKlarheitKurrent-Md_TRIAL.woff2` (500, trial)
- `ESKlarheitKurrent-Smbd_TRIAL.woff2` (600, trial)
- `RedHatText-Regular.woff2` (400, licensed)
- `RedHatText-Medium.woff2` (500, licensed)

Trial weights for internal sales collateral only.

### Custom easing
- `--ease-slide` / `ease-slide` → `cubic-bezier(0.68, -0.2, 0.15, 0.98)` — Button hover
- `--ease-bounce` / `ease-bounce-brand` → `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Key components

### Button
Types: `default`, `slim`, `header`, `outline`. Background colors: `navy`, `white`, `light-grey`, `white15`, `navy5`.
Outer `motion.div` stretches to fill container — wrap in `w-fit` for natural pill sizing.
Hover: 4 sliding colored lines + per-character text swap (framer-motion).

### Section
Primary layout wrapper. Key props:
- `background.background_color` — sets bg+text color pair via `getSectionColors()`
- `padding_top` / `padding_bottom` / `inner_spacing` — scale: `none | min | tiny | xSmall | small | medium | large | xLarge | huge | max`
- `has_container` — wraps in centered max-width container

### TextMasthead
Hero. Use `<>` in heading for line break at `md+`. `add_springs: true` adds decorative tapered lines on both sides.

### HighlightedText
Wrap words in `|pipes|` to color them; pass color token as `color` prop. Non-highlighted text inherits parent color — set `text-white` on parent when on dark bg.

### DotSubheading
Always renders `bg-lightGrey` pill with `text-navy` inner span. Do NOT place on `lightGrey` section bg — pill disappears.

### Link / LinkGroup
`Link` = Vite-compatible `<a>` wrapper (replaces `next/link`). Disables pointer events when `url` is `#` or empty.
`LinkGroup` renders array of Links in flex row, stacking on mobile.

### Logo
Variants: `horizontal`, `vertical`, `wordmark`, `marque`. Colors: `blue` (light bg), `white` (dark bg). SVGs in `public/logos/`, pattern: `GENIUS_SPORTS_{VARIANT}_{COLOR}_RGB.svg`.

### BrandIcon
25 icons. Modes: `light` (navy, for light bg), `dark` (white, for dark bg). PNGs in `public/icons/light/` and `public/icons/dark/`.

---

## CSS utilities (in index.css)
- `.container--small` (676px), `.container--medium` (846px), `.container--large` (1376px) — centered
- `.text-stroke-stack__item--stroke-{brightGreen|lightPurple|navy|white|lightBlue}` — text outline
- `.scrollbar--dark` (navy thumb), `.scrollbar--light` (white/30 thumb) — 6px
- `.br` — `display: block` at md+ | `.br--break-at-all` — always block

---

## Common gotchas

1. **Button stretches full width** — wrap in `<div className="w-fit">` for pill sizing.
2. **Font cascade** — never add `font-body` to `body` selector; breaks button font inheritance.
3. **HighlightedText on dark** — parent must have explicit `text-white`.
4. **DotSubheading** — never on `lightGrey` section bg.
5. **getSectionColors fallback** — unrecognized color → `bg-{color}` with no text color. Always use one of the 17 tokens.
6. **Logo paths** — `<img>` silently fails if SVG missing from `public/logos/`.

---

## Source reference
Distilled from the GS company website (`company-website-master`). Source SCSS at `src/assets/styles/`. Typography scale computed from `_typography.scss` `clamp()` mixin with 768px/1024px breakpoints.
