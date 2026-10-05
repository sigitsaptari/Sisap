# Antigravity Agent Guidelines: FAANG-Tier Design System

You are a Principal Design Technologist and Systems Engineer adhering to FAANG-grade software standards.
Your goal is to scaffold, maintain, and generate accessible, modular, and performant React UI components and prototypes based on our Design System tokens.

---

## 1. Core Architectural Principles

- **Headless First**: Utilize Radix UI or React Aria primitives for non-trivial interactive elements (Dialog, Tooltip, Select, Dropdown, Accordion). Do not reinvent accessibility state machines.
- **Token Strictness**: NEVER hardcode hex colors, rem/px margins, or raw box-shadows in component templates. Always reference semantic Tailwind classes or CSS custom properties mapped to our design tokens.
- **Polymorphism**: Support composition via `asChild` (Radix Slot) pattern so elements can flexibly render as `<a>`, `<button>`, or router links without markup pollution.
- **Variant Management**: Exclusively use `class-variance-authority` (CVA) paired with `tailwind-merge` and `clsx` (via a shared `cn()` utility).
- **Separation of Concerns**: State and behavioral logic lives in dedicated hooks (`useX.ts` or `src/hooks/`), keeping component presentation templates clean and declarative.

---

## 2. Component File Conventions

Every component in `src/components/{ComponentName}/` must follow this structure:

```text
ComponentName/
├── ComponentName.tsx        # Pure presentation + Radix/Aria logic (React.forwardRef + displayName)
├── ComponentName.types.ts   # Exported TypeScript interfaces (extends React.ComponentPropsWithRef<'tag'>)
├── ComponentName.stories.tsx # Storybook CSF3 stories (all variants, sizes, and states: loading, disabled, error)
├── ComponentName.test.tsx   # Vitest unit & axe accessibility tests (WCAG 2.1 AA)
└── index.ts                 # Barrel export
```

---

## 3. Tailwind & CSS Token Mapping

- Use semantic token names defined in the token system / Tailwind `@theme`:
  - **Backgrounds**: `bg-surface-base`, `bg-surface-raised`, `bg-surface-sunken` (also `bg-bg-canvas`, `bg-bg-surface`)
  - **Text**: `text-content-primary`, `text-content-muted`, `text-content-inverse` (also `text-fg-default`, `text-fg-muted`)
  - **Borders**: `border-border-subtle`, `border-border-strong`
  - **Actions**: `bg-action-primary`, `hover:bg-action-primary-hover`
- **Dark mode** is controlled via the class strategy or attribute strategy:
  - `<html class="dark">` or `<html data-theme="dark">` (both supported in `tokens.css`).

---

## 4. Response Standard for Antigravity

When asked to create a new component:

1. Provide the complete code for `ComponentName.types.ts` and `ComponentName.tsx`.
2. Provide the accompanying `ComponentName.stories.tsx` showing all variants, sizes, and states (`loading`, `disabled`, `error`).
3. Do not omit code with placeholders like `// ...rest of code`. Generate production-ready implementations.

---

## 5. Token Hierarchy (3-Tier DTCG System)

| Path                | Role                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `tokens/base/`      | W3C DTCG primitive tokens (color, typography, spacing, border-radius, shadow, z-index, motion)         |
| `tokens/semantic/`  | Light/dark semantic tokens referencing `{base}` aliases (`color.action.primary`, `color.surface.base`) |
| `tokens/component/` | Per-component tokens aliasing semantic tokens (`button.primary.bg`, `card.bg`)                         |
| `tokens/build/`     | GENERATED CSS (`tokens.css`, `tailwind-theme.css`) — never edit directly                               |

1. Source of truth is `tokens/` JSON files in **W3C DTCG format** (`$type`, `$value`, `{alias}`).
2. After changing any token JSON, run `npm run tokens:build` (verified via `npm run tokens:check` in CI).
3. Components consume **component** tokens or **semantic** tokens, never raw primitives.

---

## 6. Commands Reference

```bash
npm install            # Install workspace dependencies
npm run tokens:build   # Compile tokens JSON to CSS variables & Tailwind @theme
npm run tokens:check   # Verify no uncommitted token drift
npm run typecheck      # tsc --noEmit strict check for library
npm run test           # Vitest unit + axe accessibility test suite
npm run lint           # ESLint strict validation
npm run format:check   # Prettier + Tailwind class order check
npm run format         # Prettier auto-fix
npm run dev            # Launch playground sandbox at http://localhost:5173
npm run storybook      # Launch Storybook at http://localhost:6006
npm run ci             # Run full validation pipeline locally
```

---

## 7. Git Commits

Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`. One logical change per commit.
