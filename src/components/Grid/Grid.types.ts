import type { ComponentPropsWithRef } from "react";
import type { SpacingScale } from "../../utils/spacing";

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12;

export interface GridProps extends ComponentPropsWithRef<"div"> {
  /** Number of equal-width columns. Defaults to 1. */
  columns?: GridColumns;
  /** Space between cells (spacing scale). Defaults to 4. */
  gap?: SpacingScale;
  /** Merge styles onto the child element (Radix Slot) instead of rendering a `<div>`. */
  asChild?: boolean;
}
