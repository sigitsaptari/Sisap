import type { ComponentPropsWithRef } from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DrawerSide = "left" | "right" | "top" | "bottom";

export type DrawerProps = ComponentPropsWithRef<typeof DialogPrimitive.Root>;
export type DrawerTriggerProps = ComponentPropsWithRef<typeof DialogPrimitive.Trigger>;
export type DrawerCloseProps = ComponentPropsWithRef<typeof DialogPrimitive.Close>;
export type DrawerOverlayProps = ComponentPropsWithRef<typeof DialogPrimitive.Overlay>;

export interface DrawerContentProps extends ComponentPropsWithRef<typeof DialogPrimitive.Content> {
  /** Edge the drawer slides in from. Defaults to "right". */
  side?: DrawerSide;
  /** Render the built-in close (X) button. Defaults to true. */
  showCloseButton?: boolean;
}

export type DrawerHeaderProps = ComponentPropsWithRef<"div">;
export type DrawerFooterProps = ComponentPropsWithRef<"div">;
export type DrawerTitleProps = ComponentPropsWithRef<typeof DialogPrimitive.Title>;
export type DrawerDescriptionProps = ComponentPropsWithRef<typeof DialogPrimitive.Description>;
