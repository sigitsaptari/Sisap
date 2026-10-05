# SisapDS — Standards & Conventions (Agent Rules)

Rules for AI coding agents (Gemini / Antigravity, Multica, etc.) working in this repository.
Read this file before writing any code.

## Purpose

SisapDS is the shared design system for Sisap products. Every UI change must be driven by
design tokens — never hardcode visual values.

## Tech stack (fixed)

- **React 19 + TypeScript (strict)** — no `any`, no `@ts-ignore` without a written justification.
- **Tailwind CSS v4** for styling; component styles must reference CSS custom properties
  (`var(--ds-…)`) so theming works at runtime.
- **Radix UI** primitives for headless behavior (dialog, popover, menu…) — never rebuild
  focus/keyboard/ARIA logic by hand.
- **Lucide Icons** for iconography (`className="size-4"`, `aria-hidden="true"` on decorative icons).
- **Storybook** for component documentation and visual state coverage.

## Folder map

| Path                | Role                                                          |
| ------------------- | ------------------------------------------------------------- |
| `tokens/base/`      | W3C DTCG primitive tokens (color, typography, spacing, border-radius, shadow, z-index, motion)  |
| `tokens/semantic/`  | Light/dark semantic tokens referencing `{base}` aliases        |
| `tokens/component/` | Per-component tokens aliasing semantic tokens (`button.primary.bg`) |
| `tokens/build/`     | GENERATED CSS (`tokens.css`, `tailwind-theme.css`) — never edit |
| `scripts/`          | Token build tooling                                           |
| `src/components/`   | One folder per component (`X.tsx`, `X.types.ts`, `X.stories.tsx`, `X.test.tsx`, `index.ts`) |
| `src/hooks/`        | Shared interaction/a11y hooks                                  |
| `src/index.ts`      | Core barrel export — everything public goes through here       |
| `apps/playground/`  | Vite prototyping app                                           |
| `apps/storybook/`   | Storybook docs & visual testing                                |

## Token rules

1. Source of truth is `tokens/base` + `tokens/semantic` in **W3C DTCG format** (`$type`, `$value`, `{alias}` references).
2. After changing any token JSON, run `npm run tokens:build` and commit the regenerated files in `tokens/build/`.
3. Components consume **semantic** tokens (`color-action-primary`), never raw primitives (`color-brand-600`).
4. When porting values from Figma, read them from the Figma MCP server (`.mcp.json` in the repo root) and map them into DTCG JSON — do not copy-paste hex values straight into components.

## Component rules

- Props: every component has `X.types.ts`; extend the native element props (`ButtonHTMLAttributes<...>`) and keep defaults explicit.
- **Polymorphism:** interactive components support `asChild` (Radix `Slot`); Radix-based parts already do.
- **Logic vs. presentation:** state/behavior lives in hooks (`useX.ts`, `src/hooks/`); `X.tsx` stays presentational.
- **Variants:** every variant/size axis uses `class-variance-authority` (CVA), merged with `cn()` (`clsx` + `tailwind-merge`). Export the `xVariants` function.
- **Types:** props extend `ComponentPropsWithRef<"element">` (React 19: `ref` is a plain prop — no `forwardRef`). Export explicit prop types from `X.types.ts`; `ComponentPropsWithRef` is re-exported from `src/types`.
- Always support `className` merging via `cn()` from `src/utils/cn.ts`.
- Accessibility is non-negotiable: semantic HTML, visible `focus-visible` rings, `aria-*` on icon-only controls, `sr-only` labels where needed.
- Loading/empty/disabled states are part of "done" — a component story must cover them.
- Add a basic accessibility test (`X.test.tsx`, Vitest + Testing Library + axe via `src/test/a11y.ts`): no axe violations plus keyboard/ARIA behavior.
- Add a CSF3 story (`X.stories.tsx`) with at least: default, each variant/state, and an "All" overview.

## TypeScript rules

- `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax` stay on.
- Use `import type` for type-only imports.
- Public exports go through the barrel (`src/index.ts`).

## Commands

```bash
npm install            # install all workspaces
npm run tokens:build   # regenerate tokens/build/*.css after token edits
npm run typecheck      # tsc --noEmit (library)
npm run test           # vitest: unit + axe accessibility tests
npm run dev            # playground (Vite)
npm run storybook      # Storybook docs
```

## Commits

Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`. One logical change per commit.
