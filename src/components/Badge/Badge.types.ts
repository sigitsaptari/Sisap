import type { ComponentPropsWithRef } from "react";

export type BadgeVariant = "neutral" | "brand" | "success" | "warning" | "destructive" | "danger";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  /** Semantic color intent. Defaults to "neutral". */
  variant?: BadgeVariant;
}
