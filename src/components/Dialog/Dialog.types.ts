import type { ComponentPropsWithRef } from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogProps = ComponentPropsWithRef<typeof DialogPrimitive.Root>;
export type DialogTriggerProps = ComponentPropsWithRef<typeof DialogPrimitive.Trigger>;
export type DialogCloseProps = ComponentPropsWithRef<typeof DialogPrimitive.Close>;

export type DialogOverlayProps = ComponentPropsWithRef<typeof DialogPrimitive.Overlay>;

export interface DialogContentProps extends ComponentPropsWithRef<typeof DialogPrimitive.Content> {
  /** Render the built-in close (X) button. Defaults to true. */
  showCloseButton?: boolean;
}

export type DialogTitleProps = ComponentPropsWithRef<typeof DialogPrimitive.Title>;
export type DialogDescriptionProps = ComponentPropsWithRef<typeof DialogPrimitive.Description>;
