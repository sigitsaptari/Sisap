import { forwardRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { SwitchProps } from "./Switch.types";

const switchTrackVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009ea9]/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#009ea9] data-[state=unchecked]:bg-[#d5d7d9] dark:data-[state=unchecked]:bg-neutral-600",
  {
    variants: {
      size: {
        sm: "h-[16px] w-[30px]",
        md: "h-[20px] w-[34px]",
        lg: "h-[24px] w-[38px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-[#ffffff] shadow-[0_0_2px_rgba(0,0,0,0.2),0_2px_10px_rgba(0,0,0,0.1)] ring-0 transition-transform duration-200 ease-in-out data-[state=unchecked]:translate-x-[2px] data-[state=checked]:translate-x-[16px]",
  {
    variants: {
      size: {
        sm: "size-12",
        md: "size-16",
        lg: "size-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const switchLabelVariants = cva(
  "font-medium text-[#444b55] dark:text-neutral-200 cursor-pointer select-none",
  {
    variants: {
      size: {
        sm: "text-[12px] leading-[18px]",
        md: "text-[14px] leading-[21px]",
        lg: "text-[16px] leading-[24px]",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
);

const switchContainerVariants = cva("inline-flex items-center", {
  variants: {
    size: {
      sm: "gap-8 h-[18px]",
      md: "gap-8 h-[21px]",
      lg: "gap-12 h-[24px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Switch = forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size = "md", label, text, showText = true, disabled, id, ...props }, ref) => {
    const labelContent = label ?? text;

    return (
      <div className={cn(switchContainerVariants({ size }), className)}>
        <SwitchPrimitive.Root
          className={cn(switchTrackVariants({ size }))}
          disabled={disabled}
          id={id}
          ref={ref}
          {...props}
        >
          <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
        </SwitchPrimitive.Root>
        {showText && labelContent && (
          <label htmlFor={id} className={cn(switchLabelVariants({ size, disabled }))}>
            {labelContent}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = SwitchPrimitive.Root.displayName;
