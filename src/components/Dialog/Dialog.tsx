import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import type {
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogTitleProps,
} from "./Dialog.types";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = ({ className, ref, ...props }: DialogOverlayProps) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bg-dialog-overlay-bg motion-safe:data-[state=open]:animate-fade-in motion-safe:data-[state=closed]:animate-fade-out fixed inset-0 z-(--ds-z-index-overlay)",
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ref,
  ...props
}: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "rounded-dialog border-dialog-surface-border bg-dialog-surface-bg shadow-dialog motion-safe:data-[state=open]:animate-zoom-in motion-safe:data-[state=closed]:animate-zoom-out fixed top-1/2 left-1/2 z-(--ds-z-index-modal) grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border p-6 outline-none",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="rounded-dialog-close text-dialog-close-fg hover:bg-dialog-close-bg-hover hover:text-dialog-close-fg-hover focus-visible:ring-focus-ring absolute top-4 right-4 inline-flex size-8 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none">
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
DialogContent.displayName = "DialogContent";

export const DialogTitle = ({ className, ref, ...props }: DialogTitleProps) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-dialog-title-fg text-lg leading-tight font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-dialog-description-fg text-sm leading-relaxed", className)}
    {...props}
  />
);
DialogDescription.displayName = "DialogDescription";
