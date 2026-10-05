#!/usr/bin/env node
/**
 * SisapDS token build.
 *
 * Reads W3C DTCG token files from tokens/base and tokens/semantic, resolves
 * `{alias}` references, and emits:
 *
 *   tokens/build/tokens.css          — CSS custom properties (:root + [data-theme="dark"])
 *   tokens/build/tailwind-theme.css  — Tailwind v4 `@theme inline` mapping
 *
 * Source of truth is tokens/*.json — never edit anything in tokens/build.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

const readDirJson = (dir) =>
  readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => readJson(join(dir, f)));

/** Flatten a DTCG object into { "path.to.token": node } where node carries $value. */
function flatten(obj, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      if ("$value" in value) out[path] = value;
      else flatten(value, path, out);
    }
  }
  return out;
}

const mergeFlattened = (...sets) => Object.assign({}, ...sets);

/** Resolve one (possibly aliased) token value; detects circular references. */
function resolveValue(path, tokens, stack) {
  if (stack.has(path)) {
    throw new Error(`Circular token reference involving "${path}"`);
  }
  stack.add(path);
  const node = tokens[path];
  if (!node) throw new Error(`Unknown token reference "{${path}}"`);
  return substitute(String(node.$value), tokens, stack);
}

function substitute(value, tokens, stack) {
  return value.replace(/\{([^{}]+)\}/g, (_, ref) => resolveValue(ref.trim(), tokens, stack));
}

const kebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .replace(/\./g, "-")
    .toLowerCase();

const base = mergeFlattened(
  ...readDirJson(join(repoRoot, "tokens/base")).map((json) => flatten(json)),
);
const component = mergeFlattened(
  ...readDirJson(join(repoRoot, "tokens/component")).map((json) => flatten(json)),
);
const light = flatten(readJson(join(repoRoot, "tokens/semantic/light.json")));
const dark = flatten(readJson(join(repoRoot, "tokens/semantic/dark.json")));

// Dark inherits everything from base + light, then overrides what it redefines.
// Component tokens alias semantic tokens, so they resolve per theme.
const themes = {
  light: mergeFlattened(base, light, component),
  dark: mergeFlattened(base, light, dark, component),
};

function renderVars(tokens) {
  const sorted = Object.keys(tokens).sort();
  return sorted
    .map((path) => {
      const value = substitute(String(tokens[path].$value), tokens, new Set([path]));
      return `  --ds-${kebab(path)}: ${value};`;
    })
    .join("\n");
}

/** Only semantic colors become Tailwind utilities — primitives stay CSS-variable-only. */
const semanticColorPaths = new Set(
  [...Object.keys(light), ...Object.keys(dark)].filter((p) => p.startsWith("color.")),
);

const themePrefixes = [
  ["border-radius.", "radius"],
  ["typography.font.family.", "font"],
  ["typography.font.size.", "text"],
  ["shadow.", "shadow"],
  ["motion.easing.", "ease"],
];

function renderTailwindTheme(tokens) {
  const lines = Object.keys(tokens)
    .sort()
    .flatMap((path) => {
      const varName = `--ds-${kebab(path)}`;
      if (path in component) {
        if (component[path].$type === "color") return [`  --color-${kebab(path)}: var(${varName});`];
        if (path.endsWith(".radius")) return [`  --radius-${kebab(path.slice(0, -".radius".length))}: var(${varName});`];
        if (path.endsWith(".shadow")) return [`  --shadow-${kebab(path.slice(0, -".shadow".length))}: var(${varName});`];
        return [];
      }
      if (path.startsWith("color.")) {
        if (!semanticColorPaths.has(path)) return [];
        return [`  --color-${kebab(path.slice("color.".length))}: var(${varName});`];
      }
      for (const [prefix, ns] of themePrefixes) {
        if (path.startsWith(prefix)) {
          return [`  --${ns}-${kebab(path.slice(prefix.length))}: var(${varName});`];
        }
      }
      return [];
    });
  // Drop Tailwind's default palette so only semantic colors are available.
  return ["  --color-*: initial;", ...lines].join("\n");
}

/** Static overlay animations (Radix `data-[state]` friendly), driven by motion tokens. */
const animationTheme = `
  --animate-fade-in: fade-in var(--ds-motion-duration-normal) var(--ds-motion-easing-decelerate);
  --animate-fade-out: fade-out var(--ds-motion-duration-fast) var(--ds-motion-easing-accelerate);
  --animate-zoom-in: zoom-in var(--ds-motion-duration-normal) var(--ds-motion-easing-decelerate);
  --animate-zoom-out: zoom-out var(--ds-motion-duration-fast) var(--ds-motion-easing-accelerate);

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes fade-out { from { opacity: 1; } to { opacity: 0; } }
  @keyframes zoom-in {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
  @keyframes zoom-out {
    from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    to { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }
  }`;

const generatedBanner =
  "/* GENERATED by scripts/build-tokens.mjs — do not edit.\n   Source of truth: tokens/base + tokens/semantic (W3C DTCG). */\n\n";

const tokensCss =
  generatedBanner +
  `:root {\n  color-scheme: light;\n\n${renderVars(themes.light)}\n}\n\n[data-theme="dark"] {\n  color-scheme: dark;\n\n${renderVars(themes.dark)}\n}\n`;

const tailwindThemeCss =
  generatedBanner + `@theme inline {\n${renderTailwindTheme(themes.light)}\n${animationTheme}\n}\n`;

const buildDir = join(repoRoot, "tokens/build");
mkdirSync(buildDir, { recursive: true });
writeFileSync(join(buildDir, "tokens.css"), tokensCss);
writeFileSync(join(buildDir, "tailwind-theme.css"), tailwindThemeCss);

console.log(
  `[tokens] ${Object.keys(themes.light).length} tokens (light) / ${Object.keys(themes.dark).length} (dark) → tokens/build/tokens.css + tailwind-theme.css`,
);
