import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./Button.types";

const buttonBase =
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-[var(--ds-radii-md)] font-medium outline-none transition-[background-color,border-color,color,box-shadow] focus-visible:ring-2 focus-visible:ring-[var(--ds-color-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-color-bg-canvas)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--ds-color-action-primary)] text-[var(--ds-color-fg-on-brand)] hover:bg-[var(--ds-color-action-primary-hover)] active:bg-[var(--ds-color-action-primary-active)]",
  secondary:
    "bg-[var(--ds-color-action-secondary)] text-[var(--ds-color-fg-default)] hover:bg-[var(--ds-color-action-secondary-hover)]",
  outline:
    "border border-[var(--ds-color-border-strong)] bg-transparent text-[var(--ds-color-fg-default)] hover:bg-[var(--ds-color-action-ghost-hover)]",
  ghost:
    "bg-transparent text-[var(--ds-color-fg-default)] hover:bg-[var(--ds-color-action-ghost-hover)]",
  danger:
    "bg-[var(--ds-color-action-danger)] text-[var(--ds-color-fg-on-danger)] hover:bg-[var(--ds-color-action-danger-hover)]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "md",
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    asChild = false,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  } = props;

  const classes = cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="inline-flex shrink-0 [&_svg]:size-4">{leftIcon}</span>
      ) : null}
      {isLoading && loadingText ? loadingText : children}
      {!isLoading && rightIcon ? (
        <span className="inline-flex shrink-0 [&_svg]:size-4">{rightIcon}</span>
      ) : null}
    </button>
  );
});

Button.displayName = "Button";
