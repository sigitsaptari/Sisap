# Figma Slicing & Prototyping: Pixel-Perfect & Zero-Omission Standard

When slicing UI components, views, or building interactive prototypes from Figma designs, adhere strictly to a **100% Pixel-Perfect & Zero-Omission** standard.

---

## 1. Absolute Fidelity & Pixel-Perfect Precision

- **Layout & Geometry**: Exact dimensions (width, height, min/max constraints, aspect ratio), Auto Layout direction (row/column), alignment, gap/spacing, and padding must mirror Figma values 1:1.
- **Typography**: Match exact font family, font size, weight, line-height (`leading`), letter-spacing (`tracking`), text alignment, and text transforms. Never approximate font sizes or line heights.
- **Colors & Effects**: Match exact fills, gradients, opacity, border-radius (including individual corner radii), borders (width, color, style), box shadows (x, y, blur, spread, color, opacity), and background blurs/filters.
- **Token Mapping**: Map Figma design tokens and variables (`get_variable_defs`) to the project's semantic tokens (`tokens/` / Tailwind classes). If a specific design token does not exist yet, preserve exact visual fidelity using precise values while adhering to system conventions.

---

## 2. Zero-Omission Policy ("Tanpa Ada yang Terlewat")

- **Every Visual Detail**: Never omit secondary or tertiary elements—badges, icons, helper text, counter tags, separators/dividers, avatar fallbacks, tooltips, and micro-indicators must all be rendered.
- **Content & Copy**: Use the exact labels, placeholder text, and copy from Figma. Do not substitute with generic lorem ipsum or placeholder text unless explicitly requested.
- **Iconography**: Render exact icons, stroke widths, fill states, and dimensions from Figma designs.
- **All Interactive States & Variants**: Implement all component states present in Figma variants (default, hover, active, focus-visible, disabled, pressed, selected, checked, loading, error, and empty states).
- **Prototyping & Motion**: Do **NOT** strictly bind motion/animation to Figma's prototype settings (which are often rigid or limited in design tools). Instead, feel free to improve motion with tasteful, subtle, and natural micro-interactions (secukupnya & tidak berlebihan):
  - Prioritize snappy, fluid transitions (150ms–250ms) using natural easing (e.g. `cubic-bezier(0.16, 1, 0.3, 1)` or clean ease-out).
  - Add subtle feedback on interactions (gentle hover/active transforms, smooth opacity/scale for overlays & dropdowns, clean layout transitions).
  - Avoid sluggish, distracting, or exaggerated animations. Keep motion functional, performant, and respectful of `prefers-reduced-motion`.

---

## 3. Inspection & Verification Workflow

- **Dev Mode & MCP Inspection**: Always leverage Figma MCP tools (`get_design_context`, `get_variable_defs`, `get_screenshot`, `get_metadata`) to extract exact layout, styling, and token values rather than eyeballing or estimating from images.
- **Self-Audit Checklist**: Before finalizing any slice or prototype, cross-check against the Figma node:
  1. Are all paddings, margins, and gaps identical?
  2. Are typography specs (size, weight, line-height) exact?
  3. Are all borders, radii, and shadows identical?
  4. Are all elements, sub-elements, and icons present?
  5. Are all interactive states and responsive constraints accounted for?
  6. Is motion subtle, snappy, and tastefully implemented (not excessive)?
