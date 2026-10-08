import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { CloseCircle } from "iconsax-react";
import { cn } from "../../utils/cn";
import { renderIcon } from "../../utils/icon";
import type { ChipColor, ChipProps, ChipSize, ChipType } from "./Chip.types";

export const chipVariants = cva(
  "inline-flex items-center justify-center font-medium leading-none select-none transition-colors rounded-chip whitespace-nowrap",
  {
    variants: {
      type: {
        soft: "",
        outline: "border border-solid bg-transparent",
        solid: "text-chip-reverse-text",
      },
      color: {
        tosca: "",
        grey: "",
        green: "",
        red: "",
        orange: "",
        blue: "",
        "dark-blue": "",
      },
      size: {
        sm: "h-4 px-1 gap-1 text-[12px]",
        md: "h-5 px-1.5 gap-1.5 text-[14px]",
        lg: "h-6 px-2 gap-1.5 text-[16px]",
      },
    },
    compoundVariants: [
      // Soft
      { type: "soft", color: "tosca", className: "bg-chip-tosca-soft text-chip-tosca-solid" },
      { type: "soft", color: "grey", className: "bg-chip-grey-soft text-chip-grey-solid" },
      { type: "soft", color: "green", className: "bg-chip-green-soft text-chip-green-solid" },
      { type: "soft", color: "red", className: "bg-chip-red-soft text-chip-red-solid" },
      { type: "soft", color: "orange", className: "bg-chip-orange-soft text-chip-orange-solid" },
      { type: "soft", color: "blue", className: "bg-chip-blue-soft text-chip-blue-solid" },
      {
        type: "soft",
        color: "dark-blue",
        className: "bg-chip-dark-blue-soft text-chip-dark-blue-solid",
      },

      // Outline
      {
        type: "outline",
        color: "tosca",
        className: "border-chip-tosca-solid text-chip-tosca-solid",
      },
      { type: "outline", color: "grey", className: "border-chip-grey-solid text-chip-grey-solid" },
      {
        type: "outline",
        color: "green",
        className: "border-chip-green-solid text-chip-green-solid",
      },
      { type: "outline", color: "red", className: "border-chip-red-solid text-chip-red-solid" },
      {
        type: "outline",
        color: "orange",
        className: "border-chip-orange-solid text-chip-orange-solid",
      },
      { type: "outline", color: "blue", className: "border-chip-blue-solid text-chip-blue-solid" },
      {
        type: "outline",
        color: "dark-blue",
        className: "border-chip-dark-blue-solid text-chip-dark-blue-solid",
      },

      // Solid
      { type: "solid", color: "tosca", className: "bg-chip-tosca-solid text-chip-reverse-text" },
      { type: "solid", color: "grey", className: "bg-chip-grey-solid text-chip-reverse-text" },
      { type: "solid", color: "green", className: "bg-chip-green-solid text-chip-reverse-text" },
      { type: "solid", color: "red", className: "bg-chip-red-solid text-chip-reverse-text" },
      { type: "solid", color: "orange", className: "bg-chip-orange-solid text-chip-reverse-text" },
      { type: "solid", color: "blue", className: "bg-chip-blue-solid text-chip-reverse-text" },
      {
        type: "solid",
        color: "dark-blue",
        className: "bg-chip-dark-blue-solid text-chip-reverse-text",
      },
    ],
    defaultVariants: {
      type: "soft",
      color: "tosca",
      size: "sm",
    },
  },
);

const iconSizes: Record<ChipSize, string> = {
  sm: "size-3",
  md: "size-4",
  lg: "size-5",
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      type: typeProp,
      variant,
      color: colorProp = "tosca",
      size = "sm",
      label,
      children,
      showIconR,
      removable,
      onDismiss,
      icon,
      className,
      ...rest
    },
    ref,
  ) => {
    const type: ChipType = variant ?? typeProp ?? "soft";
    const normalizedColor: Exclude<ChipColor, "dark blue"> =
      colorProp === "dark blue" ? "dark-blue" : colorProp;
    const hasCloseIcon = Boolean(showIconR ?? removable ?? onDismiss);
    const content = label ?? children;
    const iconPixelSize = size === "sm" ? 12 : size === "lg" ? 20 : 16;

    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ type, color: normalizedColor, size }),
          Boolean(rest.onClick) && "cursor-pointer",
          className,
        )}
        {...rest}
      >
        {icon && (
          <span className="inline-flex shrink-0 items-center">
            {renderIcon(icon, iconPixelSize)}
          </span>
        )}
        <span className="truncate">{content}</span>
        {hasCloseIcon && (
          <button
            type="button"
            aria-label="Hapus chip"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss?.();
            }}
            className="focus-visible:ring-action-primary inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs transition-opacity hover:opacity-75 focus-visible:ring-1 focus-visible:outline-none"
          >
            <CloseCircle
              color="currentColor"
              size={iconPixelSize}
              className={iconSizes[size]}
              aria-hidden="true"
            />
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";
