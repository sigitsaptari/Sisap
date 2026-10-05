import type { ComponentPropsWithRef, ElementType } from "react";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "body" | "small" | "muted" | "code";

export interface TypographyProps extends ComponentPropsWithRef<"p"> {
  /** Visual style (and default element). Defaults to "body". */
  variant?: TypographyVariant;
  /** Override the rendered element, e.g. `variant="h2" as="h3"` keeps heading hierarchy correct. */
  as?: ElementType;
  /** Merge styles onto the child element (Radix Slot) instead of rendering a new one. */
  asChild?: boolean;
}
