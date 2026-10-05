import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { BadgeProps, BadgeShape } from "./Badge.types";

export const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold leading-none select-none transition-colors tabular-nums bg-danger-600 text-white",
  {
    variants: {
      variant: {
        counter: "",
        notification: "",
        default: "",
      },
      size: {
        sm: "text-[10px]",
        md: "text-xs",
        lg: "text-sm",
      },
      shape: {
        pill: "",
        circle: "aspect-square p-0 shrink-0",
      },
    },
    compoundVariants: [
      // Symmetrical 1:1 Circle dimensions (prevents oval / lonjong)
      {
        shape: "circle",
        size: "sm",
        className: "size-[14px] min-w-[14px] max-w-[14px] p-0 text-[10px] border border-white",
      },
      {
        shape: "circle",
        size: "md",
        className: "size-4 min-w-4 max-w-4 p-0 text-[12px]",
      },
      {
        shape: "circle",
        size: "lg",
        className: "size-5 min-w-5 max-w-5 p-0 text-xs",
      },

      // Pill shape for multi-character content (e.g. "99+")
      {
        shape: "pill",
        size: "sm",
        className: "h-[14px] min-w-[14px] px-1 text-[10px] border border-white",
      },
      {
        shape: "pill",
        size: "md",
        className: "h-4 min-w-4 px-1.5 text-[12px]",
      },
      {
        shape: "pill",
        size: "lg",
        className: "h-5 min-w-5 px-2 text-xs",
      },
    ],
    defaultVariants: { variant: "counter", size: "sm", shape: "circle" },
  },
);

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "counter", size = "sm", shape, label, children, className, ...rest }, ref) => {
    const content = label ?? children;
    const isEmpty = content === undefined || content === null || content === "";
    const isSingleChar =
      isEmpty ||
      ((typeof content === "string" || typeof content === "number") &&
        String(content).trim().length <= 1);

    const resolvedShape: BadgeShape = shape ?? (isSingleChar ? "circle" : "pill");

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape: resolvedShape }), className)}
        {...rest}
      >
        {content}
      </span>
    );
  },
);

Badge.displayName = "Badge";
