import { createContext, forwardRef, useCallback, useContext, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type {
  RadioGroupProps,
  RadioIndicatorProps,
  RadioProps,
  RadioSize,
  UseRadioControlOptions,
} from "./Radio.types";

export const radioVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 rounded-circle border transition-colors cursor-pointer",
  {
    variants: {
      size: {
        sm: "size-16",
        md: "size-20",
        lg: "size-24",
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
            orientation === "vertical" ? "flex-col gap-12" : "flex-row flex-wrap gap-16",
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

/**
 * Resolves the shared radio state (name, checked, disabled, change handler)
 * from props and the surrounding `RadioGroup` context. Used by `Radio` and
 * `RadioCard` so both behave identically inside a group.
 */
export function useRadioControl({
  checked,
  selected,
  disabled,
  disable,
  name,
  value,
  onChange,
}: UseRadioControlOptions) {
  const group = useRadioGroup();

  const isDisabled = disabled ?? disable ?? group?.disabled ?? false;

  let isChecked: boolean | undefined = undefined;
  if (selected !== undefined || checked !== undefined) {
    isChecked = selected ?? checked;
  } else if (group && group.value !== undefined && value !== undefined) {
    isChecked = group.value === String(value);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (group && value !== undefined) {
      group.onChange?.(String(value));
    }
  };

  return {
    group,
    name: name ?? group?.name,
    isChecked,
    isDisabled,
    handleChange,
  };
}

const dotSizeClasses: Record<RadioSize, string> = {
  sm: "size-8",
  md: "size-12",
  lg: "size-12",
};

/**
 * Visual-only radio circle (aria-hidden). Place it inside an element with the
 * `group/radio` class that also contains the native `<input type="radio">`;
 * the checked style then follows the input automatically. Pass `checked` to
 * force the state instead.
 */
export function RadioIndicator({
  size = "sm",
  checked,
  disabled = false,
  focusRing = true,
  className,
}: RadioIndicatorProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        radioVariants({ size }),
        disabled
          ? "border-radio-border-disabled bg-radio-bg-disabled"
          : cn(
              "border-radio-border bg-radio-bg group-hover/radio:border-radio-border-hover",
              checked === true && "border-radio-border-selected",
              checked === undefined && "group-has-[:checked]/radio:border-radio-border-selected",
            ),
        focusRing &&
          "group-has-[:focus-visible]/radio:ring-focus-ring group-has-[:focus-visible]/radio:ring-offset-bg-canvas group-has-[:focus-visible]/radio:ring-2 group-has-[:focus-visible]/radio:ring-offset-2",
        className,
      )}
    >
      <span
        className={cn(
          "pointer-events-none rounded-circle transition-all",
          dotSizeClasses[size],
          disabled ? "bg-radio-dot-disabled" : "bg-radio-dot",
          checked === true && "scale-100 opacity-100",
          checked === false && "scale-0 opacity-0",
          checked === undefined &&
            "scale-0 opacity-0 group-has-[:checked]/radio:scale-100 group-has-[:checked]/radio:opacity-100",
        )}
      />
    </span>
  );
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      containerClassName,
      size: sizeProp,
      disabled,
      disable,
      checked,
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
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const { group, name, isChecked, isDisabled, handleChange } = useRadioControl({
      checked,
      selected,
      disabled,
      disable,
      name: nameProp,
      value,
      onChange,
    });

    const size = sizeProp ?? group?.size ?? "sm";

    // Label content resolution
    const labelContent = label ?? text;
    const shouldDisplayLabel =
      Boolean(labelContent) && labelText !== false && showLabel !== false && showText !== false;

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
          "group/radio inline-flex cursor-pointer items-center gap-8 select-none",
          isDisabled && "cursor-not-allowed",
          containerClassName,
        )}
      >
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
          className="sr-only"
          {...props}
        />
        <RadioIndicator
          size={size}
          checked={isChecked}
          disabled={isDisabled}
          className={className}
        />
        {shouldDisplayLabel && (
          <span
            className={cn(
              "font-sans transition-colors",
              textSizeClass,
              isDisabled ? "text-content-muted" : "text-content-primary",
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
