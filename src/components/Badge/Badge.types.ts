import type { ComponentPropsWithRef } from "react";

export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "danger";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  /** Semantic color. Defaults to "neutral". */
  variant?: BadgeVariant;
}
