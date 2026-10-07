import type { InputHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { radioVariants } from "./Radio";

export type RadioSize = NonNullable<VariantProps<typeof radioVariants>["size"]>;

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof radioVariants> {
  /**
   * The text label for the radio button.
   */
  label?: ReactNode;
  /**
   * Alias for label (matching Checkbox and Figma naming).
   */
  text?: ReactNode;
  /**
   * Whether to show the label text.
   * @default true
   */
  labelText?: boolean;
  /**
   * Alias for labelText.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Alias for labelText.
   * @default true
   */
  showText?: boolean;
  /**
   * Figma alias for checked.
   */
  selected?: boolean;
  /**
   * Figma alias for disabled.
   */
  disable?: boolean;
  /**
   * Container element class name.
   */
  containerClassName?: string;
}

export interface RadioGroupProps {
  /**
   * The name attribute for all radio inputs in the group.
   */
  name?: string;
  /**
   * The controlled value of the selected radio button.
   */
  value?: string;
  /**
   * The default value for uncontrolled state.
   */
  defaultValue?: string;
  /**
   * Callback invoked when selection changes.
   */
  onChange?: (value: string) => void;
  /**
   * Alias for onChange.
   */
  onValueChange?: (value: string) => void;
  /**
   * Whether all radios in the group are disabled.
   */
  disabled?: boolean;
  /**
   * Size applied to all radios in the group unless overridden.
   */
  size?: RadioSize;
  /**
   * Layout orientation of the radio group.
   * @default "vertical"
   */
  orientation?: "vertical" | "horizontal";
  /**
   * Additional class name for the container.
   */
  className?: string;
  /**
   * Radio items or other content.
   */
  children?: ReactNode;
  /**
   * Accessible label for the group.
   */
  "aria-label"?: string;
  /**
   * ID of the element that labels this group.
   */
  "aria-labelledby"?: string;
}
