import type { ComponentPropsWithRef, ReactNode } from "react";

export type BadgeVariant = "counter" | "notification" | "default";

export type BadgeSize = "sm" | "md" | "lg";

export type BadgeShape = "circle" | "pill";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  /** Semantic color intent. Defaults to "neutral". */
  variant?: BadgeVariant;
  /** Size scale. Defaults to "md". */
  size?: BadgeSize;
  /** Shape style: "circle" (symmetrical 1:1) or "pill" (horizontal expand). Auto-detected as "circle" for single-character / counter badges. */
  shape?: BadgeShape;
  /** Text or number label (Figma alias for children). */
  label?: ReactNode;
}
