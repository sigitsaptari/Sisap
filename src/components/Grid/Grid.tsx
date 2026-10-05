import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { gapClasses } from "../../utils/spacing";
import type { GridProps } from "./Grid.types";

export const gridVariants = cva("grid", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    gap: gapClasses,
  },
  defaultVariants: { columns: 1, gap: 4 },
});

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ columns = 1, gap = 4, asChild = false, className, ...rest }, ref) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component ref={ref} className={cn(gridVariants({ columns, gap }), className)} {...rest} />
    );
  },
);

Grid.displayName = "Grid";
