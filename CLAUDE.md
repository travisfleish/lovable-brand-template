# GS Brand Template — Claude Context

## What this is

A self-contained Vite + React + TypeScript + Tailwind CSS brand template for **Genius Sports' enterprise Lovable account**. It gives the commercial and marketing teams a brand-accurate starting point when building sales collateral, microsites, and internal tools in Lovable.

## Why it exists

Genius Sports' main website is a Next.js + WordPress app. The existing `@genius-sports/gs-brand-kit` npm package was distilled from that codebase, but it has hard dependencies on `next/link`, `next/image`, `next/navigation`, and `next/font` — none of which work in Lovable, which runs on Vite.

This template re-implements the same components, tokens, and brand foundations in a Vite-compatible way, with no Next.js dependencies anywhere.

## Who uses it

Non-technical marketing professionals who build through Lovable's AI prompting interface. They do not write code. The template exists to ensure whatever they build is on-brand by default.

---

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite`, with the v3-style brand config (`tailwind.config.ts`) pulled in through the `@config` directive in `src/index.css`
- **framer-motion** for button hover animations
- **clsx** for conditional classnames
- Tailwind plugins: `@tailwindcss/typography`, `@tailwindcss/forms`, `@tailwindcss/aspect-ratio`
- Path alias: `~/` resolves to `./src`

### Runtime

Runs on **Vite 7 + TanStack Start** via `@lovable.dev/vite-tanstack-config`. The SSR entry is `src/server.ts` and routing is file-based under `src/routes/` (`__root.tsx` is the root layout, `index.tsx` is `/`). Do **not** reintroduce `vinxi`, `app.config.ts`, `next/*` imports, or a `src/pages/` directory — none of those work in this sandbox.

---

## Project structure

```
public/
  fonts/          # woff2 font files (see font notes below)
  logos/          # SVG logo files (8 variants)
  icons/
    light/        # Navy brand icon PNGs (25 icons)
    dark/         # White brand icon PNGs (25 icons)

src/
  index.css       # @font-face, CSS custom properties, full typography scale
  main.tsx        # Entry point
  App.tsx         # Page switcher: demo | catalog | brand-guide
  Catalog.tsx     # Technical component catalog (for developers)
  MarketingCatalog.tsx  # Non-technical brand guide (for marketers using Lovable)

  tokens/
    tokens.ts     # Typed JS exports: colors, fontFamily, screens, spacing

  components/
    brand/
      Logo.tsx        # Logo variants (horizontal, vertical, wordmark, marque)
      BrandIcon.tsx   # 25 brand icons, light/dark modes
    elements/
      Button.tsx      # Animated pill button (framer-motion)
      TextLink.tsx    # Arrow-circle + text link
      Link.tsx        # Vite-compatible <a> wrapper
      LinkGroup.tsx   # Renders array of Link objects
      PillTag.tsx     # Small blue pill badge
      CustomLines.tsx # Decorative tapered line patterns
      HighlightedText.tsx  # Heading with |pipe-wrapped| colored words
      TextCard.tsx    # Flexible text + CTA content block
    layouts/
      Section.tsx     # Page section with background, padding, container
    sections/
      DotSubheading.tsx   # Pill label with colored dot
      TextMasthead.tsx    # Hero section (heading, body, CTAs, optional springs)
      GetStartedCTA.tsx   # Blue CTA banner with animated spring decoration
    icons/
      Icons.tsx       # Internal SVG primitives (RightArrowCircle, RightArrow,
                      #   CircleArrow, CTASpring, FooterFeaturedLinksArrow)

  utils/
    colorHelpers.ts  # getHexValue, getClassValue, getTextColor,
                     #   getBackgroundAndTextColor, getSectionColors
    text.tsx         # getSplitBreakText (<> → line break span),
                     #   getHighlightedText (|pipes| → colored span)
    links.tsx        # getButtonLinkProps, getTextLinkProps, getLinkTarget
```

---

## The three pages

`App.tsx` manages a `page` state with three values. The nav has two toggle buttons:

- **Demo** (default) — a sample marketing landing page showing components in context
- **Brand Guide** (`page === "brand-guide"`) — `MarketingCatalog.tsx` — visual reference for Lovable users. Shows every component with two copy-paste Lovable prompts per example (one descriptive, one using brand/component terminology). No code shown.
- **Component Catalog** (`page === "catalog"`) — `Catalog.tsx` — technical reference with full prop tables, code snippets, and every variant. Intended for developers.

---

## Design tokens

### Colors (17 total)
All defined in `src/tokens/tokens.ts` and mirrored in `tailwind.config.ts` and as CSS custom properties in `index.css`.

```
navy #0D1226 | blue #0000DC | lightBlue #95ECFD | brightGreen #E1FF67
lightGreen #18C971 | green #047C40 | lightPurple #C2D1FF | purple #4337A8
lightOrange #FFEBAF | orange #FA5D00 | lightRed #F76B6A | red #C20000
black #000000 | lightGrey #F6F7F9 | lavenderGrey #E7E7E9 | white #ffffff | snow #FAFAFA
```

### Typography
All defined as CSS classes in `src/index.css`. Uses `clamp()` for fluid scaling between 768px and 1024px.

- **Headings**: `h1`/`.text-h1` through `h6`/`.text-h6`, plus `.text-h7`
- **Display**: `.text-88`, `.text-80`, `.text-72`, `.text-70`, `.text-64`, `.text-header-stat`
- **Body/UI**: `.text-40`, `.text-40-s`, `.text-36`, `.text-32`, `.text-30`, `.text-24`, `.text-22`, `.text-20`, `.text-18`, `.text-17`, `.text-16`, `.text-15`, `.text-14`, `.text-12`, `.text-11`, `.text-9`

### Fonts
Two font families:
- `font-heading` → **KlarheitKurrent** (display/headings, all UI including buttons)
- `font-body` → **RedHatText** (body copy, captions, labels)

**Font cascade**: `html` has `@apply font-heading`. `body` does NOT override to `font-body` — this is intentional so buttons and headings inherit KlarheitKurrent. Apply `font-body` explicitly to paragraphs and labels.

**Font files in `public/fonts/`**:
| File | Family | Weight | License |
|------|--------|--------|---------|
| `KlarheitKurrent-Regular.woff2` | KlarheitKurrent | 400 | Licensed |
| `KlarheitKurrent-Bold.woff2` | KlarheitKurrent | 700 | Licensed |
| `ESKlarheitKurrent-Md_TRIAL.woff2` | KlarheitKurrent | 500 | Trial |
| `ESKlarheitKurrent-Smbd_TRIAL.woff2` | KlarheitKurrent | 600 | Trial |
| `RedHatText-Regular.woff2` | RedHatText | 400 | Licensed |
| `RedHatText-Medium.woff2` | RedHatText | 500 | Licensed |

Trial weights are used for internal sales collateral only.

### Custom easing
Defined as CSS vars and Tailwind utilities:
- `--ease-slide` / `ease-slide` → `cubic-bezier(0.68, -0.2, 0.15, 0.98)` — used in Button hover animation
- `--ease-bounce` / `ease-bounce-brand` → `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Key components — usage notes

### Button
Four types: `default` (full CTA), `slim` (secondary/inline), `header` (compact nav), `outline` (ghost).
Five background colors: `navy`, `white`, `light-grey`, `white15`, `navy5`.

The outer `motion.div` has no intrinsic width — it stretches to fill its container. Wrap in `w-fit` when you want a naturally-sized pill.

Hover animation: 4 sliding colored lines + per-character text swap. Uses framer-motion.

### Section
The primary layout wrapper. Key props:
- `background.background_color` — sets bg + text color pair automatically via `getSectionColors()`
- `padding_top` / `padding_bottom` — scale: `none | min | tiny | xSmall | small | medium | large | xLarge | huge | max`
- `inner_spacing` — same scale, controls `space-y` between children
- `has_container` — wraps content in centered max-width container

### TextMasthead
Hero component. Use `<>` in the heading string to insert a line break at `md+`. Springs are decorative tapered-line elements that appear on both sides of the content block when `add_springs: true`.

### HighlightedText / getHighlightedText
Wrap words in `|pipes|` to color them. Pass the color token name as `color` prop.
The non-highlighted text inherits color from the parent — ensure the parent has an explicit text color when on dark backgrounds.

### DotSubheading
Always renders a `bg-lightGrey` pill regardless of parent background. The inner span has explicit `text-navy` so it's always readable even inside dark sections.

### Link / LinkGroup
`Link` is the Vite-compatible `<a>` wrapper (replaces `next/link`). When `url` is `#` or empty it auto-disables pointer events.
`LinkGroup` renders an array of `Link` objects in a flex row, stacking to column on mobile.

### Logo
Variants: `horizontal`, `vertical`, `wordmark`, `marque`.
Colors: `blue` (on light backgrounds), `white` (on dark backgrounds).
SVGs served from `public/logos/`.

### BrandIcon
25 icons, two modes: `light` (navy, for light backgrounds) and `dark` (white, for dark backgrounds).
PNGs served from `public/icons/light/` and `public/icons/dark/`.

---

## CSS utilities (defined in index.css)

```css
/* Container width variants */
.container--small   max-width: 676px, centered
.container--medium  max-width: 846px, centered
.container--large   max-width: 1376px, centered

/* Text stroke (for outline/stroke text effects) */
.text-stroke-stack__item--stroke-brightGreen
.text-stroke-stack__item--stroke-lightPurple
.text-stroke-stack__item--stroke-navy
.text-stroke-stack__item--stroke-white
.text-stroke-stack__item--stroke-lightBlue

/* Scrollbars */
.scrollbar--dark    6px navy thumb, transparent track
.scrollbar--light   6px white/30 thumb, transparent track

/* Line break utility */
.br                 display: block at md+
.br--break-at-all   display: block always
```

---

## Common gotchas

1. **Button stretches full width** — the `motion.div` wrapper has no intrinsic width. Wrap in `<div className="w-fit">` for natural pill sizing.

2. **Font cascade** — don't add `font-body` to the `body` selector. It breaks button font inheritance. Apply `font-body` only where needed (paragraphs, labels).

3. **HighlightedText on dark** — the non-highlighted text color is inherited. The parent element must have `text-white` set explicitly when rendered on a dark background.

4. **DotSubheading** — always renders correctly now (`text-navy` on inner span) but the pill `bg-lightGrey` should not be placed on a `lightGrey` section background — it will disappear.

5. **getSectionColors fallback** — if an unrecognised color name is passed, it falls back to `bg-{color}` with no text color. Always use one of the 17 named tokens.

6. **Logo paths** — all logos are SVGs in `public/logos/`. The filenames follow the pattern `GENIUS_SPORTS_{VARIANT}_{COLOR}_RGB.svg`. If files are missing, the `<img>` will silently fail.

---

## Source reference

This template was distilled from the Genius Sports company website (`company-website-master`). If you need to verify a design decision or find a component that isn't here, the source SCSS is at `src/assets/styles/` in that repo. The typography scale was computed from `_typography.scss` using the `clamp()` mixin formula with breakpoints at 768px (min) and 1024px (max).
