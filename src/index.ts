// SisapDS core barrel export
export { Button, buttonVariants, useButton } from "./components/Button";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./components/Button";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./components/Dialog";
export type {
  DialogProps,
  DialogTriggerProps,
  DialogCloseProps,
  DialogOverlayProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
} from "./components/Dialog";

export { useDisclosure } from "./hooks";
export type { UseDisclosureReturn } from "./hooks";

export type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from "./types";
