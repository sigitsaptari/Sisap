import type { ComponentPropsWithoutRef } from "react";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { VariantProps } from "class-variance-authority";
import type { checkboxVariants } from "./Checkbox";

export type CheckboxSize = NonNullable<VariantProps<typeof checkboxVariants>["size"]>;

export interface CheckboxProps
  extends
    Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size">,
    VariantProps<typeof checkboxVariants> {
  /**
   * The text label for the checkbox
   */
  text?: string;
  /**
   * Whether to show the text label
   * @default true
   */
  showText?: boolean;
}
