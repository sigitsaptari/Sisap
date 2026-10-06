import type { ComponentPropsWithRef, ReactNode } from "react";

export type TextAreaSize = "sm" | "md" | "lg";

export type TextAreaState =
  "default" | "hover" | "focussed" | "filled" | "error" | "error counter" | "success" | "disabled";

export interface TextAreaProps extends Omit<ComponentPropsWithRef<"textarea">, "size"> {
  /**
   * Component height scale and typography size.
   * - "sm": 12px text, min-h-[72px], padding 8px
   * - "md": 14px text, min-h-[96px], padding 8px
   * - "lg": 16px text, min-h-[120px], padding 8px
   * @default "md"
   */
  size?: TextAreaSize;

  /** Visual state override according to PaDi DS specification. */
  state?: TextAreaState;

  /** Primary label text above the textarea. */
  label?: ReactNode;
  /** Alias for label (Figma property: labelText). */
  labelText?: ReactNode;
  /** Whether to show the label row. Defaults to true if label/labelText is provided. */
  showLabel?: boolean;

  /** Secondary description text under the label. */
  description?: ReactNode;
  /** Alias for description (Figma property: descriptionText). */
  descriptionText?: ReactNode;
  /** Whether to show the description. Defaults to true if description is provided. */
  showDescription?: boolean;

  /** Shows the red italic "Wajib" indicator tag next to the label. */
  required?: boolean;
  /** Alias for required (Figma property: showWajib). */
  showWajib?: boolean;

  /** Shows the grey italic "Opsional" indicator tag next to the label. */
  optional?: boolean;
  /** Alias for optional (Figma property: showOpsional). */
  showOpsional?: boolean;

  /** Shows the info tooltip icon `(i)` next to the label. */
  showInfoTooltip?: boolean;
  /** Tooltip description or text to display on info tooltip hover. */
  infoTooltip?: ReactNode;

  /** Helper or hint text below the textarea. */
  hint?: ReactNode;
  /** Alias for hint (Figma property: hintText). */
  hintText?: ReactNode;
  /** Whether to show the hint text. */
  showHint?: boolean;

  /**
   * Error message displayed with an alert icon below the textarea.
   * Automatically sets state to "error".
   */
  errorMessage?: ReactNode;

  /**
   * Success message displayed with a checkmark icon below the textarea.
   * Automatically sets state to "success".
   */
  successMessage?: ReactNode;

  /** Whether to show character counter below the textarea. */
  showCounter?: boolean;

  /**
   * Custom counter text override (Figma property: counterText), e.g. "0/200".
   * If not provided, will automatically compute from current input length and maxLength.
   */
  counterText?: string;

  /** Resize behavior for the textarea. Defaults to "vertical". */
  resize?: "none" | "vertical" | "horizontal" | "both";

  /** Optional auto-resize feature based on content height. */
  autoResize?: boolean;

  /** Custom container wrapper className. */
  containerClassName?: string;
}
