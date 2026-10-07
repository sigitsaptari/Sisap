import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "size"> {
  /**
   * The size of the switch.
   * @default "md"
   */
  size?: SwitchSize;
  
  /**
   * Label text to display next to the switch
   */
  label?: ReactNode;
  
  /**
   * Whether to show the text label
   * @default true
   */
  showText?: boolean;
}
