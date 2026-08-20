# Style alignment report

Follow-up to [coding-style-review.md](./coding-style-review.md). This records the work that aligned existing feature screens with the house style.

Date: 20 August 2026.

## Goal

Stop mirroring two coding habits in the built UI. Keep the house pattern from Header / PageShell / `.cursor/rules/` and apply it to Home, Hero, Reservation, and Button.

## What changed

### Structure

- Moved `src/components/HeroSection` to `src/pages/Home/HeroSection` so page sections live under the page
- Renamed `src/ui/buttons` to `src/ui/Button` (PascalCase component folder)
- Renamed `style.module.css` → `styles.module.css` on Hero and Button

### Exports and imports

- Named exports for `Button`, `WhatWeOfferSection`, and `CategoryCard` (no `export default` in those files)
- Relative imports instead of `@/` on Home, Hero, and Reservation
- Catalog links use `paths.catalog` instead of a local `'/catalog'` constant

### Component shape

- What We Offer types now use `OwnProps` → `Props`
- Reservation lists and API URLs live in `src/pages/Reservation/consts.ts`
- Scroll gap for the category track lives in `consts.ts` as `CARD_GAP_PX`

### Formatting

- 2-space indent, no semicolons, Prettier on the touched files
- Reservation CSS indent matched the rest of the repo
- Wrapper class is `.root` on Hero, What We Offer, and Reservation

### i18n

- Hero keys are camelCase (`titleLine1`, `orderPickup`, …) in `en` / `hy` / `ru`
- Reservation location labels and image alts go through locale JSON
- Hardcoded English alts and street names removed from JSX

### CSS / tokens

- Added heading and body-l size tokens in `src/ui/theme/fonts.css`
- Hero, Reservation headings, and What We Offer titles use those tokens
- Category card label uses `--font-size-heading-xs`
- Hero overlay uses `--color-ink-overlay`
- Fixed invalid `&:focus-visible` in What We Offer nav buttons

## Files touched

- `src/pages/Home/` — Home, HeroSection, WhatWeOfferSection, CategoryCard
- `src/pages/Reservation/` — form, styles, new `consts.ts`
- `src/ui/Button/`
- `src/ui/theme/fonts.css`
- `src/i18n/locales/{en,hy,ru}/common.json`

## Checks

- `npx tsc --noEmit` passed
- `npx vitest run` passed (HeroSection heading test)

## What this did not change

These gaps from the review are still open. They are stack/README drift, not the two-habit style split:

- No Zustand store yet
- No Zod; Reservation still uses react-hook-form + `fetch`
- `src/api/` is still a QueryClient, not an axios client
- Leaflet is still unused
- ESLint packages are installed; there is still no eslint config file

Custom `Button` stays for Hero variants (`whiteFilled`, `whiteMinimal`) that Ant Design does not cover. It now matches house file shape.

## How to add a new screen

Match Header / PageShell / the aligned Home sections:

1. PascalCase folder with `index.tsx`, `types.ts`, `styles.module.css`
2. Named export, `OwnProps` → `Props`
3. Copy through i18n (`hy` / `ru` / `en`, same key)
4. Theme tokens for type sizes when a token exists
5. Lists and URLs in `consts.ts`; routes from `paths.ts`
