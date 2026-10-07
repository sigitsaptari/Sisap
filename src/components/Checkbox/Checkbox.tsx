import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { CheckboxProps } from "./Checkbox.types";

export const checkboxVariants = cva(
  "peer shrink-0 border border-checkbox-border bg-checkbox-bg ring-offset-bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-button-disabled-bg disabled:border-button-disabled-border data-[state=checked]:bg-checkbox-bg-checked data-[state=checked]:border-checkbox-bg-checked data-[state=checked]:text-checkbox-fg hover:data-[state=checked]:bg-action-primary-hover hover:data-[state=checked]:border-action-primary-hover hover:data-[state=unchecked]:border-action-primary-hover transition-colors",
  {
    variants: {
      size: {
        sm: "size-4 rounded-checkbox",
        md: "size-5 rounded-[5px]",
        lg: "size-6 rounded-[6px]",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

export const Checkbox = forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size = "sm", text, showText = true, id, ...props }, ref) => {
    // Determine icon size based on checkbox size
    const iconSizeClass = size === "sm" ? "size-3" : size === "md" ? "size-4" : "size-5";

    // Text size based on size variant
    const textSizeClass =
      size === "sm"
        ? "text-xs leading-[18px]"
        : size === "md"
          ? "text-sm leading-[21px]"
          : "text-base leading-[24px]";

    const content = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        className={cn(checkboxVariants({ size }), className)}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconSizeClass}
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );

    if (text && showText) {
      return (
        <div className="flex items-center gap-2">
          {content}
          <label
            htmlFor={id}
            className={cn(
              "text-content-primary peer-disabled:text-content-muted cursor-pointer font-sans peer-disabled:cursor-not-allowed",
              textSizeClass,
            )}
          >
            {text}
          </label>
        </div>
      );
    }

    return content;
  },
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;
