import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { InputProps } from "./Input.types";

export const inputVariants = cva(
  "flex w-full rounded-input border border-input-border bg-input-bg text-input-fg outline-none transition-[border-color,box-shadow] placeholder:text-input-placeholder focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-canvas disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-input-border-invalid",
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", invalid, className, type = "text", ...rest }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(inputVariants({ size }), className)}
      {...rest}
    />
  ),
);

Input.displayName = "Input";
