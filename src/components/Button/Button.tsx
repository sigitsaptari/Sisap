import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "../../utils/cn";
import type { ButtonProps } from "./Button.types";
import { useButton } from "./useButton";

export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-button font-medium outline-none transition-[background-color,border-color,color,box-shadow] focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-bg text-button-primary-fg hover:bg-button-primary-bg-hover active:bg-button-primary-bg-active",
        secondary:
          "border border-button-secondary-border bg-button-secondary-bg text-button-secondary-fg hover:bg-button-secondary-bg-hover",
        outline:
          "border border-button-outline-border bg-transparent text-button-outline-fg hover:bg-button-outline-bg-hover",
        ghost: "bg-transparent text-button-ghost-fg hover:bg-button-ghost-bg-hover",
        destructive:
          "bg-button-destructive-bg text-button-destructive-fg hover:bg-button-destructive-bg-hover",
        danger: "bg-button-danger-bg text-button-danger-fg hover:bg-button-danger-bg-hover",
      },
      size: {
        sm: "h-9 px-2.5 gap-1 text-xs",
        md: "h-11 px-3 gap-2 text-sm",
        lg: "h-[52px] px-3.5 gap-2 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

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

  const classes = cn(buttonVariants({ variant, size }), className);
  const state = useButton({ isLoading, disabled });

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...rest}>
        {children}
      </Slot>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...state} {...rest}>
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
