# Crust agent instructions

Follow `.cursor/rules/` on every change. They always apply.

Before finishing work:

1. Self-review with `.cursor/skills/code-review/`
2. Run `pnpm check` and fix failures

Do not ship `any`, non-null assertions (`!`), inline `style={...}`, hardcoded UI strings, `export default` (except App / i18n), or `@/` imports.
