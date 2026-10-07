import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type DividerType = "horizontal" | "vertical";
export type DividerOrientation = DividerType;

export interface DividerProps extends ComponentPropsWithoutRef<"div"> {
  /** Orientation type of the divider (horizontal or vertical) */
  type?: DividerType;
  /** Alias for type */
  orientation?: DividerOrientation;
  /** Whether the divider is purely decorative for assistive technologies */
  decorative?: boolean;
  /** Optional label inside the horizontal divider */
  label?: ReactNode;
  /** Optional label position (left, center, right) */
  labelPosition?: "left" | "center" | "right";
  /** Optional children as label content */
  children?: ReactNode;
}
