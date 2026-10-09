import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { RadioIndicator, useRadioControl } from "../Radio";
import type { RadioCardProps } from "./RadioCard.types";

export const radioCardVariants = cva(
  "group/radio relative flex w-[200px] items-start gap-8 rounded-radio-card border p-16 text-left transition-colors select-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-bg-canvas",
);

/**
 * Selectable card built on top of the existing `Radio` primitives
 * (`RadioIndicator` + `useRadioControl`). Works standalone or inside a
 * `RadioGroup`. Figma: PaDi DS v3.0 — radio button card (92512:18197).
 */
export const RadioCard = forwardRef<HTMLInputElement, RadioCardProps>(
  (
    {
      className,
      label,
      description,
      showDesc,
      showDec,
      radioLeft = true,
      radioRight = true,
      state,
      checked,
      selected,
      disabled,
      disable,
      defaultChecked,
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
    const labelId = `${id}-label`;
    const descriptionId = `${id}-description`;

    // Figma `state` acts as a fallback for checked / disabled.
    const { name, isChecked, isDisabled, handleChange } = useRadioControl({
      checked: checked ?? (state === "active" ? true : undefined),
      selected,
      disabled: disabled ?? (state === "disabled" ? true : undefined),
      disable,
      name: nameProp,
      value,
      onChange,
    });

    const shouldShowDescription = Boolean(description) && (showDesc ?? showDec ?? true);

    const indicator = (
      <RadioIndicator size="md" checked={isChecked} disabled={isDisabled} focusRing={false} />
    );

    return (
      <label
        htmlFor={id}
        data-state={isChecked ? "checked" : isChecked === false ? "unchecked" : undefined}
        data-disabled={isDisabled ? "" : undefined}
        className={cn(
          radioCardVariants(),
          isDisabled
            ? "border-radio-card-border bg-radio-card-bg-disabled cursor-not-allowed"
            : cn(
                "border-radio-card-border bg-radio-card-bg hover:border-radio-card-border-active cursor-pointer",
                isChecked === true && "border-radio-card-border-active bg-radio-card-bg-active",
                isChecked === undefined &&
                  "has-[:checked]:border-radio-card-border-active has-[:checked]:bg-radio-card-bg-active",
              ),
          className,
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
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={shouldShowDescription ? descriptionId : undefined}
          className="sr-only"
          {...props}
        />

        {radioLeft && indicator}

        <span className="flex min-w-0 flex-1 flex-col gap-4 font-sans break-words">
          {label && (
            <span
              id={labelId}
              className={cn(
                "text-sm leading-[21px] font-medium",
                isDisabled ? "text-radio-card-text-disabled" : "text-radio-card-label",
              )}
            >
              {label}
            </span>
          )}
          {shouldShowDescription && (
            <span
              id={descriptionId}
              className={cn(
                "text-xs leading-[18px] font-normal",
                isDisabled ? "text-radio-card-text-disabled" : "text-radio-card-description",
              )}
            >
              {description}
            </span>
          )}
        </span>

        {radioRight && indicator}
      </label>
    );
  },
);

RadioCard.displayName = "RadioCard";
