import type { ComponentPropsWithRef, ReactNode } from "react";

export type ButtonVariant =
  "primary" | "solid" | "secondary" | "outline" | "ghost" | "destructive" | "danger";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  /** Visual style intent. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Control height & typography scale. Defaults to "md". */
  size?: ButtonSize;
  /** Shows a spinner, disables interaction and announces busy state via aria-busy. */
  isLoading?: boolean;
  /** Optional label swap while loading (e.g. "Saving…"). */
  loadingText?: ReactNode;
  /** Element rendered before the label (typically a Lucide icon). */
  leftIcon?: ReactNode;
  /** Element rendered after the label (typically a Lucide icon). */
  rightIcon?: ReactNode;
  /**
   * Merge props onto the child element (Radix Slot) instead of rendering a
   * `<button>` — useful to make links or trigger buttons look like buttons.
   * `isLoading` is ignored when `asChild` is set.
   */
  asChild?: boolean;
}
