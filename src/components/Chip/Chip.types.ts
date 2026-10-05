import type { ComponentPropsWithRef, ReactNode } from "react";

export type ChipColor =
  "tosca" | "grey" | "green" | "red" | "orange" | "blue" | "dark-blue" | "dark blue";

export type ChipType = "soft" | "outline" | "solid";

export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps extends ComponentPropsWithRef<"span"> {
  /**
   * Visual style variant.
   * - "soft": Tinted subtle background with solid colored text
   * - "outline": Transparent background with solid colored border and text
   * - "solid": Full saturated colored background with white text
   * @default "soft"
   */
  type?: ChipType;

  /** Alias for `type` to conform with standard component conventions. */
  variant?: ChipType;

  /**
   * Color theme matching PaDi DS v3.0 palette.
   * @default "tosca"
   */
  color?: ChipColor;

  /**
   * Size scale.
   * - "sm": 16px height, 12px text, 12px close icon
   * - "md": 20px height, 14px text, 16px close icon
   * - "lg": 24px height, 16px text, 20px close icon
   * @default "sm"
   */
  size?: ChipSize;

  /** Primary text or ReactNode label (Figma alias for children). */
  label?: ReactNode;

  /** Shows the dismiss / close icon button on the right (Figma property). */
  showIconR?: boolean;

  /** Alias for showIconR. If true or onDismiss is provided, renders close icon. */
  removable?: boolean;

  /** Callback fired when the dismiss / close button is clicked. */
  onDismiss?: () => void;

  /** Optional icon or element to render on the left. */
  icon?: ReactNode;
}
