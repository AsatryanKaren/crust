# How this project is coded

Architecture review of Crust (bakery PWA). Source: git history and `src/` files as of 20 August 2026, **before** the style-alignment work.

For what was changed after this review, see [style-alignment-report.md](./style-alignment-report.md).

## Verdict

People are aiming at **one shared architecture**. The folder shape, TypeScript typing, i18n, CSS modules, and routing are shared.

Day-to-day writing still split into **two habits**: a strict house style for layout and stubs, and a looser Figma-driven style on Home, Hero, and Reservation.

|                       |     |
| --------------------- | --- |
| Intended architecture | 1   |
| Visible coding habits | 2   |
| Named git authors     | 4   |

## Who owns which files

Last-commit author on files under `src/` (not original authorship — later refactors reassign files). Source: `git log`.

| Last-commit author | Files | Typical area            |
| ------------------ | ----: | ----------------------- |
| sona2711           |   167 | Scaffold, layout, stubs |
| Շուշանիկ           |    48 | Home, Hero, Reservation |
| shoghdev           |    23 | Both areas              |

## Shared architecture

Almost every screen follows the same skeleton. That is the house pattern, written down in `.cursor/rules/`.

| Layer           | How it is done                                                |
| --------------- | ------------------------------------------------------------- |
| Component shape | Folder + `index.tsx` + `types.ts` + `styles.module.css`       |
| Props typing    | `OwnProps` in `types.ts`, export `Props = FC<OwnProps>`       |
| Pages           | `src/pages/*` as route screens, lazy-loaded in `routes/`      |
| Copy            | i18next JSON under `hy` / `ru` / `en`, `useTranslation` in UI |
| Styles          | CSS modules, Ant Design, tokens in `src/ui/theme/`            |
| Routing         | React Router 7, Auth/Guest/Admin guards, path consts          |
| Data            | TanStack Query + MSW mocks (only Reservation used it yet)     |

## The two coding habits

### House style — layout, footer, page stubs

sona2711, plus Cursor rules. Most of the repo.

Named exports, 2-space indent, no semicolons, relative imports, `styles.module.css`, theme tokens, `consts.ts` for lists and routes, i18n keys like `header.nav.home`.

Examples: Header, Footer, PageShell, Catalog, Auth, Admin placeholders.

### Feature style — Home, Hero, Reservation

Շուշանիկ Araakelyan. The pages that were actually built.

Mix of default and named exports, some semicolons, 4-space indent on Hero, `@/` alias imports, `style.module.css` (singular), hardcoded px, constants left in the component, kebab-case i18n keys.

Examples: HeroSection, `ui/buttons`, Reservation form, What We Offer.

## Concrete style diffs

| Topic      | House style                                          | Feature style                                  |
| ---------- | ---------------------------------------------------- | ---------------------------------------------- |
| Export     | `export const Header`                                | `export default Button` / `WhatWeOfferSection` |
| CSS file   | `styles.module.css`                                  | `style.module.css` (Hero, buttons)             |
| Imports    | `../../features/header/...`                          | `@/components/HeroSection`                     |
| Folders    | `Layout` (PascalCase), `features/header` (lowercase) | `HeroSection`, `ui/buttons`                    |
| UI kit     | Ant Design + CSS modules                             | Custom Button + Ant Design mixed               |
| Constants  | `consts.ts` + `paths.ts`                             | `GUEST_OPTIONS` inline in Reservation          |
| i18n keys  | `header.nav.home`                                    | `heroSection.header-1st-line`                  |
| CSS values | `var(--font-size-body-b-s-regular)`                  | `font-size: 96px` / `48px`                     |
| Forms      | not built yet                                        | react-hook-form + `fetch`, not axios/Zod       |

## README vs the code

The README describes a fuller stack than what is wired. The intended architecture is written; several pieces are not in the repo yet.

| Claimed in README              | In the code (at review time)                    |
| ------------------------------ | ----------------------------------------------- |
| Zustand client store           | No `src/store/`, no Zustand                     |
| Zod + react-hook-form          | RHF only on Reservation; no Zod package         |
| axios API client in `src/api/` | `api/index.ts` is only a QueryClient            |
| Leaflet maps                   | Types in `package.json`; unused                 |
| `src/theme/` and `src/types/`  | Tokens live in `src/ui/theme/`; no `src/types/` |
| ESLint + typescript-eslint     | Packages installed; no eslint config file       |

## What to copy when adding a new screen

Follow the house pattern. New pages should match Header / PageShell. That is what the Cursor rules encode.

- PascalCase folder with `index.tsx`, `types.ts`, `styles.module.css`
- Named export
- `OwnProps` → `Props`
- Strings through i18n
- Theme tokens instead of raw px when a token exists
- Lists in `consts.ts`
- Prefer `paths.ts` over string routes

Do not treat feature pages as the template. Reservation and Hero are the richest UI, but at review time they also mixed indent, exports, CSS naming, hardcoded labels, and a custom Button that the rest of the app did not use.
