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
      "fixed inset-0 z-(--ds-z-index-overlay) bg-dialog-overlay-bg motion-safe:data-[state=open]:animate-fade-in motion-safe:data-[state=closed]:animate-fade-out",
      className,
    )}
    {...props}
  />
);
DialogOverlay.displayName = "DialogOverlay";

export const DialogContent = ({ className, children, showCloseButton = true, ref, ...props }: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-(--ds-z-index-modal) grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-dialog border border-dialog-surface-border bg-dialog-surface-bg p-6 shadow-dialog outline-none motion-safe:data-[state=open]:animate-zoom-in motion-safe:data-[state=closed]:animate-zoom-out",
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-dialog-close text-dialog-close-fg transition-colors hover:bg-dialog-close-bg-hover hover:text-dialog-close-fg-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
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
      "text-lg font-semibold leading-tight tracking-tight text-dialog-title-fg",
      className,
    )}
    {...props}
  />
);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = ({ className, ref, ...props }: DialogDescriptionProps) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm leading-relaxed text-dialog-description-fg", className)}
    {...props}
  />
);
DialogDescription.displayName = "DialogDescription";
