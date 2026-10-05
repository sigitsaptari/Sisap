import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "../../utils/cn";
import type { CheckboxProps } from "./Checkbox.types";

/** Supports `checked="indeterminate"`. Always pair with a `<label>` or `aria-label`. */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "group rounded-checkbox border-checkbox-border bg-checkbox-bg focus-visible:ring-focus-ring focus-visible:ring-offset-bg-canvas data-[state=checked]:border-checkbox-bg-checked data-[state=checked]:bg-checkbox-bg-checked data-[state=indeterminate]:border-checkbox-bg-checked data-[state=indeterminate]:bg-checkbox-bg-checked inline-flex size-4 shrink-0 items-center justify-center border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-checkbox-fg flex items-center justify-center">
        <Check className="size-3 group-data-[state=indeterminate]:hidden" aria-hidden="true" />
        <Minus
          className="hidden size-3 group-data-[state=indeterminate]:block"
          aria-hidden="true"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  ),
);

Checkbox.displayName = "Checkbox";
