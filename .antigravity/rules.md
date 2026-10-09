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

---

## 8. Figma Slicing & Prototyping: Pixel-Perfect & Zero-Omission Standard

When slicing UI components, views, or building interactive prototypes from Figma designs, adhere strictly to a **100% Pixel-Perfect & Zero-Omission** standard:

### 1. Absolute Fidelity & Pixel-Perfect Precision

- **Layout & Geometry**: Exact dimensions (width, height, min/max constraints, aspect ratio), Auto Layout direction (row/column), alignment, gap/spacing, and padding must mirror Figma values 1:1.
- **Typography**: Match exact font family, font size, weight, line-height (`leading`), letter-spacing (`tracking`), text alignment, and text transforms. Never approximate font sizes or line heights.
- **Colors & Effects**: Match exact fills, gradients, opacity, border-radius (including individual corner radii), borders (width, color, style), box shadows (x, y, blur, spread, color, opacity), and background blurs/filters.
- **Token Mapping**: Map Figma design tokens and variables (`get_variable_defs`) to the project's semantic tokens (`tokens/` / Tailwind classes). If a specific design token does not exist yet, preserve exact visual fidelity using precise values while adhering to system conventions.

### 2. Zero-Omission Policy ("Tanpa Ada yang Terlewat")

- **Every Visual Detail**: Never omit secondary or tertiary elements—badges, icons, helper text, counter tags, separators/dividers, avatar fallbacks, tooltips, and micro-indicators must all be rendered.
- **Content & Copy**: Use the exact labels, placeholder text, and copy from Figma. Do not substitute with generic lorem ipsum or placeholder text unless explicitly requested.
- **Iconography**: Render exact icons, stroke widths, fill states, and dimensions from Figma designs.
- **All Interactive States & Variants**: Implement all component states present in Figma variants (default, hover, active, focus-visible, disabled, pressed, selected, checked, loading, error, and empty states).
- **Prototyping & Motion**: Do **NOT** strictly bind motion/animation to Figma's prototype settings (which are often rigid or limited in design tools). Instead, feel free to improve motion with tasteful, subtle, and natural micro-interactions (secukupnya & tidak berlebihan):
  - Prioritize snappy, fluid transitions (150ms–250ms) using natural easing (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` or clean ease-out).
  - Add subtle feedback on interactions (gentle hover/active transforms, smooth opacity/scale for overlays & dropdowns, clean layout transitions).
  - Avoid sluggish, distracting, or exaggerated animations. Keep motion functional, performant, and respectful of `prefers-reduced-motion`.

### 3. Inspection & Verification Workflow

- **Dev Mode & MCP Inspection**: Always leverage Figma MCP tools (`get_design_context`, `get_variable_defs`, `get_screenshot`, `get_metadata`) to extract exact layout, styling, and token values rather than eyeballing or estimating from images.
- **Self-Audit Checklist**: Before finalizing any slice or prototype, cross-check against the Figma node:
  1. Are all paddings, margins, and gaps identical?
  2. Are typography specs (size, weight, line-height) exact?
  3. Are all borders, radii, and shadows identical?
  4. Are all elements, sub-elements, and icons present?
  5. Are all interactive states and responsive constraints accounted for?
  6. Is motion subtle, snappy, and tastefully implemented (not excessive)?
