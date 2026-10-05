import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { BadgeProps } from "./Badge.types";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        neutral: "bg-badge-neutral-bg text-badge-neutral-fg",
        brand: "bg-badge-brand-bg text-badge-brand-fg",
        success: "bg-badge-success-bg text-badge-success-fg",
        warning: "bg-badge-warning-bg text-badge-warning-fg",
        danger: "bg-badge-danger-bg text-badge-danger-fg",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export const Badge = ({ variant, className, ref, ...rest }: BadgeProps) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...rest} />
);

Badge.displayName = "Badge";
