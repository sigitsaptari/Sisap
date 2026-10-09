import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{ts,tsx}", "./apps/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          base: "var(--surface-base)",
          raised: "var(--surface-raised)",
          sunken: "var(--surface-sunken)",
        },
        content: {
          primary: "var(--content-primary)",
          muted: "var(--content-muted)",
          inverse: "var(--content-inverse)",
        },
        action: {
          primary: "var(--action-primary)",
          "primary-hover": "var(--action-primary-hover)",
          destructive: "var(--action-destructive)",
        },
        border: {
          subtle: "var(--border-subtle)",
          strong: "var(--border-strong)",
        },
      },
      spacing: {
        0: "var(--ds-spacing-0)",
        4: "var(--ds-spacing-4)",
        8: "var(--ds-spacing-8)",
        12: "var(--ds-spacing-12)",
        16: "var(--ds-spacing-16)",
        20: "var(--ds-spacing-20)",
        24: "var(--ds-spacing-24)",
        32: "var(--ds-spacing-32)",
        40: "var(--ds-spacing-40)",
        48: "var(--ds-spacing-48)",
        64: "var(--ds-spacing-64)",
        80: "var(--ds-spacing-80)",
        96: "var(--ds-spacing-96)",
      },
    },
  },
  plugins: [],
};

export default config;
