import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { BadgeProps, BadgeShape } from "./Badge.types";

export const badgeVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium leading-none select-none transition-colors tabular-nums",
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
      // Standard badges - Pill shape
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "pill",
        size: "sm",
        className: "px-2 py-0.5 text-[11px] gap-1",
      },
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "pill",
        size: "md",
        className: "px-2.5 py-0.5 text-xs gap-1",
      },
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "pill",
        size: "lg",
        className: "px-3 py-1 text-sm gap-1",
      },

      // Standard badges - Circle shape (symmetrical 1:1)
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "circle",
        size: "sm",
        className: "size-5 min-w-5 max-w-5 p-0 text-[11px]",
      },
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "circle",
        size: "md",
        className: "size-6 min-w-6 max-w-6 p-0 text-xs",
      },
      {
        variant: ["neutral", "brand", "success", "warning", "destructive", "danger"],
        shape: "circle",
        size: "lg",
        className: "size-7 min-w-7 max-w-7 p-0 text-sm",
      },

      // Counter / Notification badges (Figma Node 91797:378)
      // Symmetrical 1:1 Circle dimensions (prevents oval / lonjong)
      {
        variant: ["counter", "notification"],
        shape: "circle",
        size: "sm",
        className:
          "size-[14px] min-w-[14px] max-w-[14px] p-0 text-[10px] border border-white font-bold",
      },
      {
        variant: ["counter", "notification"],
        shape: "circle",
        size: "md",
        className: "size-4 min-w-4 max-w-4 p-0 text-[12px] font-bold",
      },
      {
        variant: ["counter", "notification"],
        shape: "circle",
        size: "lg",
        className: "size-5 min-w-5 max-w-5 p-0 text-xs font-bold",
      },

      // Counter / Notification badges - Pill shape for multi-character content (e.g. "99+")
      {
        variant: ["counter", "notification"],
        shape: "pill",
        size: "sm",
        className: "h-[14px] min-w-[14px] px-1 text-[10px] border border-white font-bold",
      },
      {
        variant: ["counter", "notification"],
        shape: "pill",
        size: "md",
        className: "h-4 min-w-4 px-1.5 text-[12px] font-bold",
      },
      {
        variant: ["counter", "notification"],
        shape: "pill",
        size: "lg",
        className: "h-5 min-w-5 px-2 text-xs font-bold",
      },
    ],
    defaultVariants: { variant: "neutral", size: "md", shape: "pill" },
  },
);

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "neutral", size = "md", shape, label, children, className, ...rest }, ref) => {
    const content = label ?? children;
    const isEmpty = content === undefined || content === null || content === "";
    const isSingleChar =
      isEmpty ||
      ((typeof content === "string" || typeof content === "number") &&
        String(content).trim().length <= 1);

    const resolvedShape: BadgeShape =
      shape ??
      (variant === "counter" || variant === "notification"
        ? isSingleChar
          ? "circle"
          : "pill"
        : isSingleChar && !isEmpty
          ? "circle"
          : "pill");

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
