import { createContext, forwardRef, useCallback, useContext, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { RadioGroupProps, RadioProps, RadioSize } from "./Radio.types";

export const radioVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 rounded-full border transition-colors",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroup = () => useContext(RadioGroupContext);

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: nameProp,
      value: valueProp,
      defaultValue,
      onChange,
      onValueChange,
      disabled = false,
      size = "sm",
      orientation = "vertical",
      className,
      children,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const generatedName = useId();
    const name = nameProp ?? generatedName;

    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(defaultValue);
    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : uncontrolledValue;

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setUncontrolledValue(newValue);
        }
        onChange?.(newValue);
        onValueChange?.(newValue);
      },
      [isControlled, onChange, onValueChange],
    );

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value,
          onChange: handleValueChange,
          size,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation={orientation}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col gap-3" : "flex-row flex-wrap gap-4",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      containerClassName,
      size: sizeProp,
      disabled: disabledProp,
      disable,
      checked: checkedProp,
      selected,
      defaultChecked,
      label,
      text,
      labelText = true,
      showLabel = true,
      showText = true,
      name: nameProp,
      value,
      onChange,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const group = useRadioGroup();
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const size = sizeProp ?? group?.size ?? "sm";
    const isDisabled = disabledProp ?? disable ?? group?.disabled ?? false;

    // Check state resolution
    const isExplicitlyControlled = checkedProp !== undefined || selected !== undefined;
    const groupControlled = Boolean(group && group.value !== undefined && value !== undefined);

    let isChecked: boolean | undefined = undefined;
    if (isExplicitlyControlled) {
      isChecked = selected ?? checkedProp;
    } else if (groupControlled) {
      isChecked = group?.value === value;
    }

    const name = nameProp ?? group?.name;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (group && value !== undefined) {
        group.onChange?.(String(value));
      }
    };

    // Label content resolution
    const labelContent = label ?? text;
    const shouldDisplayLabel =
      Boolean(labelContent) && labelText !== false && showLabel !== false && showText !== false;

    // Dot sizing
    const dotSizeClass = size === "lg" ? "size-3" : size === "md" ? "size-2.5" : "size-2";

    // Text typography matching Figma specs
    const textSizeClass =
      size === "sm"
        ? "text-xs leading-[18px]"
        : size === "md"
          ? "text-sm leading-[21px]"
          : "text-base leading-[24px]";

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 select-none",
          isDisabled && "cursor-not-allowed",
          containerClassName,
        )}
      >
        <span className="relative inline-flex shrink-0 items-center justify-center">
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            value={value}
            disabled={isDisabled}
            checked={isChecked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            className="peer sr-only"
            {...props}
          />
          <span
            aria-hidden="true"
            className={cn(
              radioVariants({ size }),
              "border-radio-border bg-radio-bg",
              "peer-hover:border-radio-border-hover",
              "peer-checked:border-radio-border-selected",
              "peer-focus-visible:ring-focus-ring peer-focus-visible:ring-offset-bg-canvas peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
              "peer-disabled:border-radio-border-disabled peer-disabled:bg-radio-bg-disabled peer-disabled:cursor-not-allowed",
              className,
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute rounded-full transition-all",
              dotSizeClass,
              isChecked === true
                ? "scale-100 opacity-100"
                : isChecked === false
                  ? "scale-0 opacity-0"
                  : "scale-0 opacity-0 peer-checked:scale-100 peer-checked:opacity-100",
              isDisabled
                ? "bg-radio-dot-disabled"
                : "bg-radio-dot peer-disabled:bg-radio-dot-disabled",
            )}
          />
        </span>
        {shouldDisplayLabel && (
          <span
            className={cn(
              "font-sans transition-colors",
              textSizeClass,
              isDisabled
                ? "text-content-muted cursor-not-allowed"
                : "text-content-primary peer-disabled:text-content-muted cursor-pointer peer-disabled:cursor-not-allowed",
            )}
          >
            {labelContent}
          </span>
        )}
      </label>
    );
  },
);

Radio.displayName = "Radio";
