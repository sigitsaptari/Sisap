# SisapDS

Design system untuk produk Sisap — React 19 + TypeScript, Tailwind CSS v4, Radix UI,
Iconsax icons, Storybook, dan design tokens W3C DTCG.

## Struktur

```
Sisap/
├── .antigravity/        # Rules & conventions untuk AI agents
├── tokens/              # Design tokens (W3C DTCG format)
│   ├── base/            # Primitives: color, typography, spacing, border-radius, shadow, z-index, motion
│   ├── semantic/        # Light/dark tokens, brand intents
│   ├── component/       # Per-component tokens (button, dialog) → alias semantic
│   └── build/           # Generated CSS variables / Tailwind @theme
├── scripts/             # Token build tooling
├── src/                 # Library (@sisapds/react)
│   ├── components/      # Button, Checkbox, Chip, Divider, Radio, RadioCard, Stepper, TextField, TextArea, common
│   ├── hooks/           # useDisclosure, …
│   ├── utils/           # cn(), …
│   └── index.ts         # Core barrel export
├── apps/
│   ├── playground/      # Instant prototyping app (Vite)
│   └── storybook/       # Visual testing & docs
├── .mcp.json            # Figma MCP (untuk mengambil variabel dari Figma)
├── package.json
└── tsconfig.json
```

## Memulai

```bash
npm install
npm run tokens:build   # generate tokens/build/*.css dari tokens/*.json
npm run dev            # playground di http://localhost:5173
npm run storybook      # Storybook di http://localhost:6006
npm run typecheck      # tsc --noEmit untuk library
npm run test           # Vitest + axe (tes aksesibilitas dasar)
```

## Design tokens

- Source of Truth: `tokens/base/*.json` + `tokens/semantic/*.json` (W3C DTCG:
  `$type`, `$value`, referensi `{alias}`).
- Run `npm run tokens:build` setiap mengubah token — script me-resolve alias,
  menghasilkan `tokens.css` (`:root` + `[data-theme="dark"]`) dan mapping
  `@theme inline` untuk Tailwind v4.
- 3 tier: base → semantic → component. Komponen memakai token **component**
  (`var(--ds-button-primary-bg)` / `bg-button-primary-bg`) yang merujuk token semantic,
  bukan primitive (`var(--ds-color-brand-600)`).
- Tema diganti lewat `data-theme="dark"` pada `<html>` — coba di playground.

## Figma MCP

Repo ini menyertakan `.mcp.json` agar AI tooling (Claude Code, Cursor, pi, dsb.)
terhubung ke Figma MCP dan membaca **variables/styles langsung dari Figma**
sebelum dipetakan ke token DTCG.

- Remote server: `https://mcp.figma.com/mcp` (autentikasi OAuth `mcp:connect`).
- Alternatif lokal: `http://127.0.0.1:3845/mcp` (Dev Mode MCP Server di Figma Desktop).

Untuk runtime pi (agent ini), tersedia extension bridge di `.pi/extensions/figma-mcp/`
proyek — set token OAuth/PAT via environment `FIGMA_MCP_TOKEN` atau file
`.pi/figma-mcp.json` berisi `{"token": "..."}`.

## Stack

| Bagian            | Teknologi                                      |
| ----------------- | ---------------------------------------------- |
| Framework         | React 19 + TypeScript (strict)                 |
| Styling           | Tailwind CSS v4 + CSS variables (DTCG)         |
| Headless          | Radix UI (`@radix-ui/react-checkbox`, `-slot`) |
| Icons             | Iconsax React (`iconsax-react`)                |
| Catalog & testing | Storybook 10                                   |
| Playground        | Vite                                           |
