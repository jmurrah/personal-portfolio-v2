# AGENTS.md

You are a senior React engineer specializing in frontend engineering. Follow clean coding principles, be explicit, and do not hallucinate beyond the rules below.

## Project overview

Vite + React single-page app for a personal portfolio and blog. Client-side routing via react-router-dom. Blog content is static, sourced from a prerendered Substack cache (no runtime fetching). CI deploys to GitHub Pages and runs a scheduled cache updater.

## System map

- src/ - app code
- src/app/routes.tsx - route config
- src/pages/ - route-level views (Home, Blog, BlogPost, Projects, etc.)
- src/layouts/ - layout wrappers
- src/components/ - shared UI (Blog, Theme toggles, Projects, etc.)
- src/constants/ - static data (e.g., prerenderedPosts.json)
- src/assets/ - images/icons referenced in code
- scripts/ - build-time/CI scripts (e.g., update-substack-cache.ts)
- public/ - static assets and headers config
- .github/workflows/ - CI/CD (deploy, cache updater)

## Architecture rules

- UI (src/pages, src/components, src/layouts) may import constants/assets/helpers; do NOT import scripts.
- Keep data-fetch/parsing and side effects out of React components; prefer precomputed constants/helpers.
- Constants in src/constants are immutable at runtime.
- Scripts run in Node only and are not imported into client code.

## File placement

- New route → src/pages/<Name>.tsx (or a folder if it has subcomponents).
- Page-only helpers/components → src/pages/<Name>/components.
- Reusable UI → src/components/<Component>.tsx (+ .css if needed).
- Static data → src/constants/<name>.json|ts.
- Build/CI utilities → scripts/\*.ts.
- Static public files (no imports) → public/.

## Styling

- Reusable styles belong in CSS files imported by components.
- Inline, one-off styling should use Tailwind utility classes.
- Preserve design tokens (CSS variables like var(--primary), var(--surface)).
- Maintain accessibility: focus states, aria labels, descriptive alt text.

## Conventions

- Components: PascalCase; functions/vars: camelCase; routes/paths: kebab-case.
- Keep modules focused (< ~300 lines); extract helpers early.
- Dates: prefer UTC; pubDate must use "YYYY-MM-DD HH:mm:ss".
- Sorting: make tie-breakers explicit (e.g., guid asc) for determinism.
- Types: each property uses a single, consistent type (no string | number unions).

## Blog/Substack cache

- Source of truth: `src/constants/prerenderedPosts.json`; never mutate at runtime.
- Updater: `scripts/update-substack-cache.ts` fetches Substack RSS, merges new items (preserve existing by guid), sorts desc by pubDate with guid asc tie-breaker, validates schema, and writes deterministic JSON.
- Run locally: `npm run update:substack`.
- CI: `.github/workflows/update-substack-cache.yml` runs weekly + on demand; commits cache updates.

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Update Substack cache: `npm run update:substack`

## React + routing

- Routing via `react-router-dom`; keep definitions in `src/app/routes.tsx`.
- Use existing helpers (`getPostSlug`, `getPostPath`) for blog paths; do not reimplement.
- Avoid side effects in render; use `useMemo` for reusable derived values.
- Use stable keys (`guid`/`link`/slug) to prevent re-render churn.

## Data and validation

- Blog item shape must include: title, pubDate, link, guid, author, thumbnail, description, content, enclosure{link,type}, categories[].
- pubDate must match `/^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$/` and be sorted descending.
- No mixed-type fields; keep each property a single type.
- Do not mutate imported constants; clone before transforming.

## Performance and accessibility

- Memoize derived lists when helpful; minimize unnecessary state.
- External links leaving the site must include `rel="noopener noreferrer"` and `target="_blank"`.
- Keep bundle lean: reuse components/helpers instead of duplicating logic.

## CI/CD

- Deploy: `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
- Cache updater: `.github/workflows/update-substack-cache.yml` runs `npm run update:substack` and commits when needed.

## Do this, not that

- ✅ Use `src/constants/prerenderedPosts.json` as the blog source; update via the script.
- ❌ Do not add runtime fetches for Substack content inside React components.
- ✅ Share reusable UI through `src/components`.
- ❌ Avoid duplicating slug/date logic; use existing helpers.
- ✅ Keep new utilities pure and colocated logically; avoid cross-layer imports from scripts into client code.

## Git hygiene

- Do not revert user changes you did not make.
- Keep commits scoped and reviewable.
- Run lint/format before pushing; maintain deterministic outputs to avoid noisy diffs.
