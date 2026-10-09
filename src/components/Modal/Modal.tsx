import {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { ArrowLeft2 } from "iconsax-react";
import { cn } from "../../utils/cn";
import { Button } from "../Button/Button";
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalSize,
} from "./Modal.types";

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-[380px]",
  md: "max-w-[450px]", // Figma standard (91074:3606, 91074:15880)
  lg: "max-w-[600px]",
  xl: "max-w-[800px]",
  full: "max-w-[calc(100vw-32px)] md:max-w-[90vw]",
};

function CloseIcon({ className = "size-20" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ModalHeader({
  children,
  title,
  showCloseButton = true,
  showBackButton = false,
  onClose,
  onBack,
  className,
}: ModalHeaderProps) {
  if (children) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-between p-16",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between p-inset-md",
        className,
      )}
    >
      <div className="flex items-center gap-gap-sm">
        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="flex size-32 cursor-pointer items-center justify-center rounded-control text-primary transition-colors hover:bg-bg-canvas"
            aria-label="Kembali"
          >
            <ArrowLeft2 size={20} className="text-primary" />
          </button>
        )}
        {title && (
          <h3 className="text-lg font-bold text-primary">
            {title}
          </h3>
        )}
      </div>

      {showCloseButton && (
        <button
          type="button"
          onClick={onClose}
          className="flex size-32 cursor-pointer items-center justify-center rounded-control text-secondary transition-colors hover:bg-bg-canvas hover:text-primary"
          aria-label="Tutup"
        >
          <CloseIcon className="size-20" />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, className }: ModalBodyProps) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col p-inset-md text-sm text-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ModalFooter({
  children,
  confirmText = "Simpan",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  confirmLoading = false,
  confirmDisabled = false,
  className,
}: ModalFooterProps) {
  if (children) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center gap-gap-xs p-inset-md",
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-gap-xs p-inset-md",
        className,
      )}
    >
      {cancelText && (
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={onCancel}
          className="h-11 flex-1 rounded-control border border-primary text-sm font-medium text-primary"
        >
          {cancelText}
        </Button>
      )}
      {confirmText && (
        <Button
          type="button"
          variant="primary"
          size="md"
          isLoading={confirmLoading}
          disabled={confirmDisabled}
          onClick={onConfirm}
          className="h-11 flex-1 rounded-control bg-action-primary text-sm font-medium text-white hover:bg-action-primary-hover"
        >
          {confirmText}
        </Button>
      )}
    </div>
  );
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  image,
  size = "md",
  showCloseButton = true,
  showBackButton = false,
  onBack,
  closeOnClickOutside = true,
  closeOnEscape = true,
  footer,
  confirmText = "Simpan",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  confirmLoading = false,
  confirmDisabled = false,
  showFooter,
  className,
  overlayClassName,
  contentClassName,
  transitionDuration = 250,
}: ModalProps) {
  const [mounted, setMounted] = useState(isOpen);
  const [active, setActive] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Mantine-style smooth enter/exit transition orchestration
  useEffect(() => {
    let animFrame: number;
    let timer: ReturnType<typeof setTimeout>;

    if (isOpen) {
      setMounted(true);
      // Wait a tick for DOM node mount, then trigger active state
      animFrame = requestAnimationFrame(() => {
        timer = setTimeout(() => {
          setActive(true);
        }, 16);
      });
    } else {
      setActive(false);
      // Wait for exit transition to finish before unmounting from DOM
      timer = setTimeout(() => {
        setMounted(false);
      }, transitionDuration);
    }

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer);
    };
  }, [isOpen, transitionDuration]);

  // Lock body scroll when modal is visible
  useEffect(() => {
    if (!mounted) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted]);

  // Keyboard navigation: Escape key closes modal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === "Escape") {
        onClose();
      }
    },
    [closeOnEscape, onClose],
  );

  useEffect(() => {
    if (!mounted) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mounted, handleKeyDown]);

  if (!mounted) return null;

  const handleCancelClick = () => {
    if (onCancel) onCancel();
    else onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnClickOutside &&
      dialogRef.current &&
      !dialogRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  // Determine whether to show footer
  const hasFooter =
    showFooter !== undefined
      ? showFooter
      : Boolean(footer || confirmText || cancelText);

  const hasImage = Boolean(image);

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={typeof title === "string" ? title : "Modal Dialog"}
      onClick={handleOverlayClick}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-inset-md select-none",
        "bg-[rgba(0,0,0,0.35)]",
        // Mantine overlay transition: smooth opacity fade (200ms ease-out)
        "transition-opacity duration-200 ease-out",
        active ? "opacity-active" : "opacity-invisible pointer-events-none",
        overlayClassName,
      )}
    >
      {/* Modal Dialog Content */}
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative flex w-full flex-col rounded-container bg-surface-base shadow-lg",
          sizeClasses[size],
          // Mantine modal enter/exit animation:
          // Enter: opacity 0 -> 1, scale 0.95 -> 1, translateY -16px -> 0 (cubic-bezier(0.16, 1, 0.3, 1))
          // Exit: opacity 1 -> 0, scale 1 -> 0.95, translateY 0 -> -8px
          "transition-all ease-[cubic-bezier(0.16,1,0.3,1)] select-auto",
          active
            ? "translate-y-0 scale-100 opacity-active duration-250"
            : "-translate-y-4 scale-95 opacity-invisible duration-150",
          className,
        )}
      >
        {/* If Image header is present (ModalImage Figma variant 91074:3606) */}
        {hasImage ? (
          <>
            {showCloseButton && (
              <div className="flex items-center justify-end pt-inset-md pr-inset-md">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-32 cursor-pointer items-center justify-center rounded-control text-secondary transition-colors hover:bg-bg-canvas hover:text-primary"
                  aria-label="Tutup"
                >
                  <CloseIcon className="size-20" />
                </button>
              </div>
            )}
            <div className="flex w-full flex-col items-center justify-center px-inset-md">
              <div className="flex h-44 w-72 items-center justify-center">
                {image}
              </div>
            </div>
            <div className="flex flex-col gap-2 p-16 text-center">
              {title && (
                <h3 className="text-lg font-bold text-primary">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-primary">
                  {description}
                </p>
              )}
            </div>
          </>
        ) : (
          /* Standard Header (ModalText / ModalForm Figma variant 91074:15880) */
          (title || showCloseButton || showBackButton) && (
            <ModalHeader
              title={title}
              showCloseButton={showCloseButton}
              showBackButton={showBackButton}
              onClose={onClose}
              onBack={onBack}
            />
          )
        )}

        {/* Modal Body / Children */}
        {(children || (!hasImage && description)) && (
          <ModalBody className={contentClassName}>
            {!hasImage && description && (
              <p className="text-sm text-primary">
                {description}
              </p>
            )}
            {children}
          </ModalBody>
        )}

        {/* Modal Footer */}
        {hasFooter &&
          (footer ? (
            <div className="flex shrink-0 items-center gap-2 p-16">
              {footer}
            </div>
          ) : (
            <ModalFooter
              confirmText={confirmText}
              cancelText={cancelText}
              onConfirm={onConfirm}
              onCancel={handleCancelClick}
              confirmLoading={confirmLoading}
              confirmDisabled={confirmDisabled}
            />
          ))}
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
