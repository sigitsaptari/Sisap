import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { BadgeProps } from "./Badge.types";

export const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full font-medium leading-none select-none transition-colors",
  {
    variants: {
      variant: {
        neutral: "bg-badge-neutral-bg text-badge-neutral-fg",
        brand: "bg-badge-brand-bg text-badge-brand-fg",
        success: "bg-badge-success-bg text-badge-success-fg",
        warning: "bg-badge-warning-bg text-badge-warning-fg",
        destructive: "bg-badge-destructive-bg text-badge-destructive-fg",
        danger: "bg-badge-danger-bg text-badge-danger-fg",
        counter: "bg-danger-600 text-white font-bold",
        notification: "bg-danger-600 text-white font-bold",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    compoundVariants: [
      {
        variant: ["counter", "notification"],
        size: "sm",
        className: "h-[14px] min-w-[14px] px-1 text-[10px] border border-white font-bold",
      },
      {
        variant: ["counter", "notification"],
        size: "md",
        className: "h-[16px] min-w-[16px] px-1 text-[12px] font-bold",
      },
      {
        variant: ["counter", "notification"],
        size: "lg",
        className: "h-5 min-w-5 px-1.5 text-xs font-bold",
      },
    ],
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", size = "md", label, children, className, ...rest }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...rest}>
      {label ?? children}
    </span>
  ),
);

Badge.displayName = "Badge";
