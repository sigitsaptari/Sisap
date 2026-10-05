import type { ComponentPropsWithRef } from "react";
import type { SpacingScale } from "../../utils/spacing";

export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around";

export interface StackProps extends ComponentPropsWithRef<"div"> {
  /** Main axis. Defaults to "column". */
  direction?: StackDirection;
  /** Space between children (spacing scale). Defaults to 4. */
  gap?: SpacingScale;
  align?: StackAlign;
  justify?: StackJustify;
  /** Allow children to wrap onto multiple lines. */
  wrap?: boolean;
  /** Merge styles onto the child element (Radix Slot) instead of rendering a `<div>`. */
  asChild?: boolean;
}
