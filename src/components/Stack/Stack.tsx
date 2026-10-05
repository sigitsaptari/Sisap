import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { gapClasses } from "../../utils/spacing";
import type { StackProps } from "./Stack.types";

export const stackVariants = cva("flex", {
  variants: {
    direction: { row: "flex-row", column: "flex-col" },
    gap: gapClasses,
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
    wrap: { true: "flex-wrap", false: "flex-nowrap" },
  },
  defaultVariants: { direction: "column", gap: 4 },
});

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    { direction = "column", gap = 4, align, justify, wrap, asChild = false, className, ...rest },
    ref,
  ) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        ref={ref}
        className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
        {...rest}
      />
    );
  },
);

Stack.displayName = "Stack";
