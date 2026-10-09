import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { DividerProps } from "./Divider.types";

export const dividerVariants = cva("shrink-0 bg-[#d5d7d9] dark:bg-neutral-800 transition-colors", {
  variants: {
    type: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px min-h-16 self-stretch",
    },
  },
  defaultVariants: {
    type: "horizontal",
  },
});

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      type: typeProp,
      orientation,
      decorative = true,
      label,
      labelPosition = "center",
      className,
      children,
      role,
      ...rest
    },
    ref,
  ) => {
    const resolvedType = orientation ?? typeProp ?? "horizontal";
    const isVertical = resolvedType === "vertical";
    const content = label ?? children;

    // Accessibility attributes
    const computedRole = role ?? (decorative ? "none" : "separator");
    const ariaOrientation = !decorative ? resolvedType : undefined;

    // If divider has label content (only applicable for horizontal mode)
    if (!isVertical && content) {
      return (
        <div
          ref={ref}
          role={computedRole}
          aria-orientation={ariaOrientation}
          className={cn("flex w-full items-center gap-12", className)}
          {...rest}
        >
          <div
            className={cn(
              "h-px bg-[#d5d7d9] transition-colors dark:bg-neutral-800",
              labelPosition === "left" ? "w-24 shrink-0" : "flex-1",
            )}
            aria-hidden="true"
          />
          <span className="shrink-0 text-xs font-normal text-[#8c9197] select-none dark:text-neutral-400">
            {content}
          </span>
          <div
            className={cn(
              "h-px bg-[#d5d7d9] transition-colors dark:bg-neutral-800",
              labelPosition === "right" ? "w-6 shrink-0" : "flex-1",
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role={computedRole}
        aria-orientation={ariaOrientation}
        className={cn(dividerVariants({ type: resolvedType }), className)}
        {...rest}
      />
    );
  },
);

Divider.displayName = "Divider";
