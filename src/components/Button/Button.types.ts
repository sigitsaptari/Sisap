import type { ComponentPropsWithRef, ReactNode } from "react";

export type ButtonVariant =
  "primary" | "solid" | "secondary" | "outline" | "ghost" | "destructive" | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonState = "default" | "hover" | "pressed" | "focus" | "disabled";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /** Visual style intent. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Control height & typography scale. Defaults to "md". */
  size?: ButtonSize;
  /** Explicit visual state (for preview matrix or forced state). Defaults to dynamic/default. */
  state?: ButtonState;
  /** Shows a spinner, disables interaction and announces busy state via aria-busy. */
  isLoading?: boolean;
  /** Optional label swap while loading (e.g. "Saving…"). */
  loadingText?: ReactNode;
  /** Element rendered before the label (typically a Lucide icon). */
  leftIcon?: ReactNode;
  /** Figma alias for leftIcon */
  iconL?: ReactNode;
  /** Element rendered after the label (typically a Lucide icon). */
  rightIcon?: ReactNode;
  /** Figma alias for rightIcon */
  iconR?: ReactNode;
  /** Control visibility of left icon. Defaults to true if icon is provided. */
  showIconL?: boolean;
  /** Control visibility of right icon. Defaults to true if icon is provided. */
  showIconR?: boolean;
  /** Control visibility of label. Defaults to true. */
  showLabel?: boolean;
  /** Text label (Figma alias for children). */
  labelText?: string;
  /**
   * Merge props onto the child element (Radix Slot) instead of rendering a
   * `<button>` — useful to make links or trigger buttons look like buttons.
   * `isLoading` is ignored when `asChild` is set.
   */
  asChild?: boolean;
}
