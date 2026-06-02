## Goal

The `gs-brand-template` repo was built for Vite 5 + vinxi + Tailwind v3 standalone. Lovable's sandbox runs Vite 7 + `@lovable.dev/vite-tanstack-config` + Tailwind v4. Align tooling so the preview boots without touching brand components, tokens, pages, or the design system.

## Changes

### 1. `package.json` — tooling alignment
- Remove `vinxi`.
- Bump `vite` to `^7`, keep `react`/`react-dom` at 18.
- Add `@lovable.dev/vite-tanstack-config` and `@tailwindcss/vite` (v4).
- Keep `tailwindcss ^3.4` only if needed for `@config` interop; otherwise rely on v4 + `@config` directive already added to `src/index.css`.
- Scripts: `"dev": "vite dev --port 8080"`, `"build": "vite build"`, `"start": "vite preview"`.

### 2. `vite.config.ts` — use Lovable's TanStack Start preset
Replace the bare React-plugin config with:
```ts
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
});
```
This wires the TanStack Start plugin, Tailwind v4, the `~` alias, and the SSR server entry that the sandbox expects.

### 3. Delete `app.config.ts`
It's the old vinxi convention, references a missing `@tanstack/react-start/config` subpath, and is no longer picked up.

### 4. `src/server.ts` — match current TanStack Start entry shape
The existing file uses `createStartHandler` which is removed in current TanStack Start. Replace with the minimal Worker-style default export that lazily imports `@tanstack/react-start/server-entry`, per the runtime the Lovable plugin builds against.

### 5. `tsconfig.json`
Drop the broken `tsconfig.node.json` project reference (it disables emit and trips TS6310). Keep the rest of the strict TS settings intact.

### 6. CSS — already done
`src/index.css` already imports Tailwind v4 and pulls in the v3 `tailwind.config.ts` via `@config`, so all `font-heading`, `bg-navy`, etc. resolve. No further changes.

### 7. Reinstall and restart
Run `bun install` to resolve the new dep graph, then restart the dev server.

## Out of scope (explicitly not touching)

- Brand tokens, fonts, logos, icons, components under `src/components/**`.
- `src/App.tsx`, `Catalog.tsx`, `MarketingCatalog.tsx`, `Glossary.tsx`, `BestPractices.tsx`.
- `tailwind.config.ts` color/font definitions.
- Routing structure (`src/routes/__root.tsx`, `src/routes/index.tsx`).

## Expected outcome

`npm run dev` starts cleanly on Vite 7, SSR renders, and the existing Demo / Brand Guide / Glossary / Best Practices / Catalog pages display with full brand styling.
