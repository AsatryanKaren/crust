Bakery Project

A modern PWA for bakery & café ordering, delivery, and table reservations․

Overview

Bakery Project is a mobile-first web application that lets customers browse a bakery's product catalog, order for pickup or delivery, reserve a table, and pay online — all installable as a Progressive Web App.

Features

Full product catalog with categories, pricing, and availability
Cart, checkout, and guest ordering
Pickup and delivery flows
Table reservations
Customer accounts with order history and favorites
Location pages with interactive maps
Multi-language support (Armenian, Russian, English)
Installable PWA with offline fallback

Tech Stack

CategoryTechnologyFrameworkReact 19 + TypeScriptBuild ToolViteUI LibraryAnt Design 6RoutingReact Router 7Server StateTanStack QueryClient StateZustandForms & ValidationReact Hook Form + ZodLocalizationi18nextMapsLeaflet / React LeafletPWAvite-plugin-pwaLintingESLint + typescript-eslint

Prerequisites

Node.js ≥ 18.18
pnpm

Getting Started

Install dependencies:

bashpnpm install

Start the development server:

bashpnpm dev

The app will be available at http://localhost:5173.

Build

Create a production build:

bashpnpm build

Preview the production build locally:

bashpnpm preview

Note: PWA install prompts and offline behavior only work in the production build, not in pnpm dev.

Available Scripts

CommandDescriptionpnpm devStart the development serverpnpm buildType-check and build for productionpnpm previewPreview the production build locallypnpm checkTypecheck, tests, Prettier, house-style (required before merge)

Project Structure

src/
├── main.tsx
├── App.tsx
├── style.css
├── pages/ # Route-level screens
├── components/ # Reusable UI components
├── api/ # API client and requests
├── store/ # Global state (Zustand)
├── i18n/
│ └── locales/
│ ├── hy/
│ ├── ru/
│ └── en/
├── theme/ # Design tokens & Ant Design theme
└── types/ # Shared TypeScript types

Code conventions (Cursor rules)

Project coding conventions for agents and contributors live in `.cursor/rules/`:

- `file-structure.mdc` — PascalCase folders, OwnProps → Props, named exports, relative imports, `consts.ts` / `paths.ts`
- `typescript.mdc` — `type` only, no `any`, no `!`
- `styles.mdc` — no inline styles, `styles.module.css`, theme tokens
- `i18n.mdc` — no hardcoded UI strings; camelCase keys in `hy` / `ru` / `en`
- `code-quality.mdc` — Prettier, reuse, tests, `ailocal/`, README setup docs
- `review-required.mdc` — must self-review and run `pnpm check` before finishing

Follow these when adding or changing code under `src/`. Agent scratch files go in `ailocal/` (gitignored).

Reviews: use the project skill `.cursor/skills/code-review/` (it reads the rules above). Ask for a “code review” or “house-style review” in Cursor.

Required for the team (not optional):

1. Cursor — `.cursor/rules/` are `alwaysApply`. Agents must self-review and run `pnpm check` before finishing (see `AGENTS.md`).
2. Every PR — GitHub fills `.github/pull_request_template.md`. All house-style boxes must be checked.
3. CI — `.github/workflows/check.yml` runs `pnpm check` (typecheck, tests, Prettier, house-style) on every PR and push to `trunk`.
4. Make CI blocking on GitHub: **Settings → Branches → Add branch protection rule** for `trunk` → enable **Require status checks to pass** → select the `check` job. Without this last step, CI reports failures but does not block merge.

Local gate:

```bash
pnpm check
```

How the team actually writes code (review + follow-up):

- [Coding style review](docs/coding-style-review.md) — shared architecture vs the two habits found in `src/`
- [Style alignment report](docs/style-alignment-report.md) — what was changed to match house style

Localization

The app supports Armenian, Russian, and English. Translation strings are stored as JSON files under src/i18n/locales/.

Progressive Web App

The project is installable on supported devices, with:

App manifest and icons
Offline fallback page
Fast repeat-load performance via service worker caching

Icons are located at public/icons/icon-192.png and public/icons/icon-512.png.

Roadmap

Push notifications
Loyalty points
Order tracking improvements

License

Private project — all rights reserved.
