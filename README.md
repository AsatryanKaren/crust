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

CommandDescriptionpnpm devStart the development serverpnpm buildType-check and build for productionpnpm previewPreview the production build locallypnpm eslint .Run linting


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