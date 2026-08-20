---
name: code-review
description: Review code against Crust house rules (TypeScript, file structure, styles, i18n, quality). Use when the user asks for a review, PR review, house-style check, or to look at a diff / changed files before merge.
---

# Code review

Review **this project's rules**, not generic internet style. Read the rules before commenting.

This review is required before merge. Also run `pnpm check` (CI runs the same command).

## Before reviewing

Read every file in `.cursor/rules/`:

- `typescript.mdc` — `type` only, no `any`, no `!`, `import type`, OwnProps → Props
- `file-structure.mdc` — PascalCase folders, named exports, relative imports, `consts.ts`, `paths.ts`
- `styles.mdc` — no inline styles, `styles.module.css`, theme tokens, `.root`
- `i18n.mdc` — no hardcoded UI copy, camelCase keys, `hy` / `ru` / `en`
- `code-quality.mdc` — Prettier, reuse, tests, no debug leftovers

Gold template for new UI: `src/components/Layout/Header/` and `src/components/_shared/PageShell/`.
Do not treat unaligned historical files as the pattern.

Also read the diff (or named files). Do not review the whole repo unless asked.

## What to check

Walk the change against those rules. At minimum flag:

| Area       | Fail if                                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript | `interface`, `any` without comment, `!`, drive-by `as`                                                                            |
| Structure  | lone `.tsx` component, `export default` (except App/i18n/Vite), `@/` imports, routes as string literals, constants in `index.tsx` |
| Styles     | `style={{...}}`, `style.module.css`, hardcoded font px when a token exists, invented HEX when a token exists                      |
| i18n       | hardcoded label / `alt` / `aria-label` / placeholder; kebab-case keys; key missing in `en`/`hy`/`ru`                              |
| Quality    | `console.log`, unused code, duplicated util/component, mixed indent/semicolons                                                    |

Also report real bugs, broken a11y, and missing tests when the change adds logic.

Skip README-vs-stack drift (Zustand, Zod, axios, Leaflet, ESLint config) unless this change introduces it.

## Output

Lead with a verdict: **approve**, **request changes**, or **nits only**.

Then findings, grouped:

- **Must fix** — violates a rule or is a bug; block merge
- **Should fix** — house-style drift that will spread if copied
- **Nit** — optional

Each finding: file path, what's wrong, which rule, what to do instead (short). Cite code with `startLine:endLine:path`.

End with a short checklist of what already looks correct, so the author knows what not to redo.

Do not rewrite the whole PR unless asked. Do not apply fixes unless the user asks to fix.
