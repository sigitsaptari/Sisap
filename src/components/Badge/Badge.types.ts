import type { ComponentPropsWithRef, ReactNode } from "react";

export type BadgeVariant =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "destructive"
  | "danger"
  | "counter"
  | "notification";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends ComponentPropsWithRef<"span"> {
  /** Semantic color intent. Defaults to "neutral". */
  variant?: BadgeVariant;
  /** Size scale. Defaults to "md". */
  size?: BadgeSize;
  /** Text or number label (Figma alias for children). */
  label?: ReactNode;
}
