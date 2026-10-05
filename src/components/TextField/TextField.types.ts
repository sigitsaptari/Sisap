import type { ComponentPropsWithRef, ReactNode } from "react";

export type TextFieldSize = "sm" | "md" | "lg";

export type TextFieldState =
  "default" | "hover" | "focussed" | "filled" | "error" | "success" | "disabled";

export interface TextFieldProps extends Omit<ComponentPropsWithRef<"input">, "size" | "prefix"> {
  /**
   * Component height and typography size scale.
   * - "sm": 36px height, 12px text
   * - "md": 44px height, 14px text
   * - "lg": 52px height, 16px text
   * @default "md"
   */
  size?: TextFieldSize;

  /** Visual state override. */
  state?: TextFieldState;

  /** Primary label text above the input. */
  label?: ReactNode;
  /** Alias for label (Figma property). */
  labelText?: ReactNode;
  /** Whether to show the label row. Defaults to true if label/labelText is present. */
  showLabel?: boolean;

  /** Secondary description text under the label. */
  description?: ReactNode;
  /** Alias for description (Figma property). */
  descriptionText?: ReactNode;
  /** Whether to show the description. Defaults to true if description is present. */
  showDescription?: boolean;

  /** Shows the red italic "Wajib" indicator tag next to the label. */
  required?: boolean;
  /** Alias for required (Figma property). */
  showWajib?: boolean;

  /** Shows the grey italic "Opsional" indicator tag next to the label. */
  optional?: boolean;
  /** Alias for optional (Figma property). */
  showOpsional?: boolean;

  /** Shows the info tooltip icon `(i)` next to the label. */
  showInfoTooltip?: boolean;
  /** Tooltip description or text to display on info tooltip. */
  infoTooltip?: ReactNode;

  /** Prefix text or node with a vertical divider. */
  prefix?: ReactNode;
  /** Alias for prefix (Figma property). */
  prefixText?: ReactNode;
  /** Whether to show the prefix slot. */
  showPrefix?: boolean;

  /** Icon displayed on the left inside the input. */
  leftIcon?: ReactNode;
  /** Alias for leftIcon (Figma property). */
  iconL?: ReactNode;
  /** Whether to show the left icon. */
  showIconL?: boolean;

  /** Icon displayed on the right inside the input. */
  rightIcon?: ReactNode;
  /** Alias for rightIcon (Figma property). */
  iconR?: ReactNode;
  /** Whether to show the right icon. */
  showIconR?: boolean;

  /** Suffix text or node with a vertical divider. */
  suffix?: ReactNode;
  /** Alias for suffix (Figma property). */
  suffixText?: ReactNode;
  /** Whether to show the suffix slot. */
  showSuffix?: boolean;

  /** Helper or hint text below the input. */
  hint?: ReactNode;
  /** Alias for hint (Figma property). */
  hintText?: ReactNode;
  /** Whether to show the hint text. */
  showHint?: boolean;

  /** Error message displayed with an alert icon below the input. Automatically sets state="error". */
  errorMessage?: ReactNode;

  /** Success message displayed with a checkmark icon below the input. Automatically sets state="success". */
  successMessage?: ReactNode;

  /** Shows character count when maxLength is provided or custom counter text. */
  showCounter?: boolean;

  /** Container element className. */
  containerClassName?: string;
}
