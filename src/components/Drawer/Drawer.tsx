import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import type {
  DrawerContentProps,
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerTitleProps,
} from "./Drawer.types";

/** Side panel built on Radix Dialog (focus trap, ESC, ARIA included). */
export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerPortal = DialogPrimitive.Portal;
export const DrawerClose = DialogPrimitive.Close;

export const DrawerOverlay = forwardRef<HTMLDivElement, DrawerOverlayProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "bg-drawer-overlay-bg motion-safe:data-[state=open]:animate-fade-in motion-safe:data-[state=closed]:animate-fade-out fixed inset-0 z-(--ds-z-index-overlay)",
        className,
      )}
      {...props}
    />
  ),
);
DrawerOverlay.displayName = "DrawerOverlay";

export const drawerContentVariants = cva(
  "fixed z-(--ds-z-index-modal) flex flex-col gap-4 border-drawer-surface-border bg-drawer-surface-bg p-6 shadow-drawer outline-none",
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l motion-safe:data-[state=open]:animate-slide-in-from-right motion-safe:data-[state=closed]:animate-slide-out-to-right",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r motion-safe:data-[state=open]:animate-slide-in-from-left motion-safe:data-[state=closed]:animate-slide-out-to-left",
        top: "inset-x-0 top-0 max-h-[80vh] border-b motion-safe:data-[state=open]:animate-slide-in-from-top motion-safe:data-[state=closed]:animate-slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 max-h-[80vh] border-t motion-safe:data-[state=open]:animate-slide-in-from-bottom motion-safe:data-[state=closed]:animate-slide-out-to-bottom",
      },
    },
    defaultVariants: { side: "right" },
  },
);

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ side = "right", className, children, showCloseButton = true, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close className="rounded-drawer-close text-drawer-close-fg hover:bg-drawer-close-bg-hover hover:text-drawer-close-fg-hover focus-visible:ring-focus-ring absolute top-4 right-4 inline-flex size-8 items-center justify-center transition-colors focus-visible:ring-2 focus-visible:outline-none">
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 pr-8", className)} {...props} />
  ),
);
DrawerHeader.displayName = "DrawerHeader";

export const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-auto flex justify-end gap-3", className)} {...props} />
  ),
);
DrawerFooter.displayName = "DrawerFooter";

export const DrawerTitle = forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-drawer-title-fg text-lg leading-tight font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-drawer-description-fg text-sm leading-relaxed", className)}
      {...props}
    />
  ),
);
DrawerDescription.displayName = "DrawerDescription";
