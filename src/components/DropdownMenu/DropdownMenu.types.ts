import type { ComponentPropsWithRef } from "react";
import type * as MenuPrimitive from "@radix-ui/react-dropdown-menu";

export type DropdownMenuProps = ComponentPropsWithRef<typeof MenuPrimitive.Root>;
export type DropdownMenuTriggerProps = ComponentPropsWithRef<typeof MenuPrimitive.Trigger>;
export type DropdownMenuGroupProps = ComponentPropsWithRef<typeof MenuPrimitive.Group>;
export type DropdownMenuContentProps = ComponentPropsWithRef<typeof MenuPrimitive.Content>;

export interface DropdownMenuItemProps extends ComponentPropsWithRef<typeof MenuPrimitive.Item> {
  /** "destructive" (or "danger") colors destructive actions. Defaults to "default". */
  variant?: "default" | "destructive" | "danger";
}

export type DropdownMenuCheckboxItemProps = ComponentPropsWithRef<
  typeof MenuPrimitive.CheckboxItem
>;
export type DropdownMenuLabelProps = ComponentPropsWithRef<typeof MenuPrimitive.Label>;
export type DropdownMenuSeparatorProps = ComponentPropsWithRef<typeof MenuPrimitive.Separator>;
