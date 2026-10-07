import type { InputHTMLAttributes, ReactNode } from "react";

/** Figma `state` property of the radio button card. */
export type RadioCardState = "default" | "active" | "disabled";

export interface RadioCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Main label (Ubuntu Medium 14px).
   */
  label?: ReactNode;
  /**
   * Secondary description below the label (12px).
   */
  description?: ReactNode;
  /**
   * Whether to show the description.
   * @default true
   */
  showDesc?: boolean;
  /**
   * Figma alias for `showDesc`.
   */
  showDec?: boolean;
  /**
   * Show the radio indicator on the left side.
   * @default true
   */
  radioLeft?: boolean;
  /**
   * Show the radio indicator on the right side.
   * @default true
   */
  radioRight?: boolean;
  /**
   * Figma state shortcut: `"active"` = selected, `"disabled"` = disabled.
   * Prefer `checked` / `disabled` (or a `RadioGroup`) in real usage.
   */
  state?: RadioCardState;
  /**
   * Figma alias for `checked`.
   */
  selected?: boolean;
  /**
   * Figma alias for `disabled`.
   */
  disable?: boolean;
  /**
   * Class name for the card container.
   */
  className?: string;
}
