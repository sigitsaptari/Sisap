import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Add, ArrowRight, Refresh2 } from "iconsax-react";
import { cn } from "../../utils/cn";
import { renderIcon } from "../../utils/icon";
import type { ButtonProps } from "./Button.types";
import { useButton } from "./useButton";

export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-button font-medium outline-none transition-[background-color,border-color,color,box-shadow] focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-button-primary-bg text-button-primary-fg hover:bg-button-primary-bg-hover active:bg-button-primary-bg-active disabled:bg-button-disabled-bg disabled:text-button-disabled-fg disabled:border-transparent",
        solid:
          "bg-button-primary-bg text-button-primary-fg hover:bg-button-primary-bg-hover active:bg-button-primary-bg-active disabled:bg-button-disabled-bg disabled:text-button-disabled-fg disabled:border-transparent",
        secondary:
          "border border-button-secondary-border bg-button-secondary-bg text-button-secondary-fg hover:bg-button-secondary-bg-hover hover:border-neutral-600 active:bg-neutral-200 active:border-neutral-700 focus-visible:border-2 focus-visible:border-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-700/20 disabled:bg-neutral-50 disabled:border-button-disabled-border disabled:text-button-disabled-fg",
        outline:
          "border border-button-outline-border bg-white text-button-outline-fg hover:bg-button-secondary-bg-hover hover:border-neutral-600 active:bg-neutral-200 active:border-neutral-700 focus-visible:border-2 focus-visible:border-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-700/20 disabled:bg-neutral-50 disabled:border-button-disabled-border disabled:text-button-disabled-fg",
        ghost:
          "bg-transparent text-button-ghost-fg hover:bg-button-ghost-bg-hover disabled:text-button-disabled-fg",
        destructive:
          "bg-button-destructive-bg text-button-destructive-fg hover:bg-button-destructive-bg-hover active:bg-danger-800 disabled:bg-button-disabled-bg disabled:text-button-disabled-fg disabled:border-transparent",
        danger:
          "bg-button-danger-bg text-button-danger-fg hover:bg-button-danger-bg-hover active:bg-danger-800 disabled:bg-button-disabled-bg disabled:text-button-disabled-fg disabled:border-transparent",
      },
      size: {
        sm: "h-9 px-2.5 gap-1 text-xs",
        md: "h-11 px-3 gap-2 text-sm",
        lg: "h-[52px] px-3.5 gap-2 text-base",
        icon: "size-11 p-0",
      },
      state: {
        default: "",
        hover: "",
        pressed: "",
        focus: "ring-2 ring-offset-2 ring-offset-bg-canvas",
        disabled: "pointer-events-none cursor-not-allowed",
      },
    },
    compoundVariants: [
      { variant: ["primary", "solid"], state: "hover", className: "bg-brand-700" },
      { variant: ["primary", "solid"], state: "pressed", className: "bg-brand-800" },
      {
        variant: ["primary", "solid"],
        state: "focus",
        className: "bg-brand-600 border-2 border-brand-800 ring-2 ring-brand-800/30",
      },
      {
        variant: ["primary", "solid"],
        state: "disabled",
        className: "bg-button-disabled-bg text-button-disabled-fg border-transparent",
      },

      {
        variant: ["secondary", "outline"],
        state: "hover",
        className: "bg-neutral-50 border-neutral-600 text-neutral-500",
      },
      {
        variant: ["secondary", "outline"],
        state: "pressed",
        className: "bg-neutral-200 border-neutral-700 text-neutral-500",
      },
      {
        variant: ["secondary", "outline"],
        state: "focus",
        className:
          "bg-white border-2 border-neutral-700 ring-2 ring-neutral-700/20 text-neutral-500",
      },
      {
        variant: ["secondary", "outline"],
        state: "disabled",
        className: "bg-neutral-50 border-button-disabled-border text-button-disabled-fg",
      },

      { variant: ["destructive", "danger"], state: "hover", className: "bg-danger-700" },
      { variant: ["destructive", "danger"], state: "pressed", className: "bg-danger-800" },
      {
        variant: ["destructive", "danger"],
        state: "focus",
        className: "bg-danger-600 border-2 border-danger-800 ring-2 ring-danger-800/30",
      },
      {
        variant: ["destructive", "danger"],
        state: "disabled",
        className: "bg-button-disabled-bg text-button-disabled-fg border-transparent",
      },
    ],
    defaultVariants: { variant: "primary", size: "md", state: "default" },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = "primary",
    size = "md",
    state = "default",
    isLoading = false,
    loadingText,
    leftIcon,
    iconL,
    rightIcon,
    iconR,
    showIconL,
    showIconR,
    showLabel = true,
    labelText,
    asChild = false,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  } = props;

  const isActuallyDisabled = disabled || state === "disabled";
  const classes = cn(buttonVariants({ variant, size, state }), className);
  const buttonHookState = useButton({ isLoading, disabled: isActuallyDisabled });

  const hasExplicitLeftIcon = leftIcon !== undefined || iconL !== undefined;
  const effectiveLeftIcon = leftIcon ?? iconL ?? (showIconL ? <Add /> : undefined);
  const shouldShowLeft = hasExplicitLeftIcon ? showIconL !== false : Boolean(showIconL);

  const hasExplicitRightIcon = rightIcon !== undefined || iconR !== undefined;
  const effectiveRightIcon = rightIcon ?? iconR ?? (showIconR ? <ArrowRight /> : undefined);
  const shouldShowRight = hasExplicitRightIcon ? showIconR !== false : Boolean(showIconR);
  const labelContent = children ?? labelText;
  const iconPixelSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;
  const iconSizeClass =
    size === "sm" ? "[&_svg]:size-4" : size === "lg" ? "[&_svg]:size-6" : "[&_svg]:size-5";

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...rest}>
        {labelContent}
      </Slot>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...buttonHookState} {...rest}>
      {isLoading ? (
        <Refresh2
          color="currentColor"
          size={iconPixelSize}
          className={cn("shrink-0 animate-spin", iconSizeClass)}
          aria-hidden="true"
        />
      ) : shouldShowLeft && effectiveLeftIcon ? (
        <span className={cn("inline-flex shrink-0", iconSizeClass)}>
          {renderIcon(effectiveLeftIcon, iconPixelSize)}
        </span>
      ) : null}
      {isLoading && loadingText ? (
        loadingText
      ) : showLabel && labelContent ? (
        <span className={cn(size === "icon" && iconSizeClass)}>
          {size === "icon" ? renderIcon(labelContent, iconPixelSize) : labelContent}
        </span>
      ) : null}
      {!isLoading && shouldShowRight && effectiveRightIcon ? (
        <span className={cn("inline-flex shrink-0", iconSizeClass)}>
          {renderIcon(effectiveRightIcon, iconPixelSize)}
        </span>
      ) : null}
    </button>
  );
});

Button.displayName = "Button";
