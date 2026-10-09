import { forwardRef, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { renderIcon } from "../../utils/icon";
import { FormFieldWrapper } from "../common/FormFieldWrapper";
import type { TextFieldProps, TextFieldSize, TextFieldState } from "./TextField.types";

export const textFieldVariants = cva(
  "flex w-full items-center border border-solid rounded-chip transition-colors bg-white dark:bg-neutral-900",
  {
    variants: {
      size: {
        sm: "h-9 px-12 gap-8 text-xs",
        md: "h-11 px-16 gap-12 text-sm",
        lg: "h-[52px] px-20 gap-16 text-base",
      },
      state: {
        default:
          "border-[#d5d7d9] dark:border-neutral-700 hover:border-[#009ea9] focus-within:border-[#009ea9] focus-within:ring-2 focus-within:ring-[#009ea9]/20",
        hover: "border-[#009ea9]",
        focussed: "border-[#009ea9] ring-2 ring-[#009ea9]/20",
        filled:
          "border-[#d5d7d9] dark:border-neutral-700 hover:border-[#009ea9] focus-within:border-[#009ea9] focus-within:ring-2 focus-within:ring-[#009ea9]/20",
        error: "border-[#ee3124] ring-2 ring-[#ee3124]/20",
        success: "border-[#25974c] ring-2 ring-[#25974c]/20",
        disabled:
          "border-[#e7e8e9] bg-[#f2f4f7] dark:bg-neutral-800 text-neutral-400 cursor-not-allowed",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  },
);

const iconSizes: Record<TextFieldSize, string> = {
  sm: "size-16",
  md: "size-20",
  lg: "size-24",
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id: customId,
      size = "md",
      state: stateProp,
      label,
      labelText,
      showLabel: showLabelProp,
      description,
      descriptionText,
      showDescription: showDescriptionProp,
      required,
      showWajib,
      optional,
      showOpsional,
      showInfoTooltip,
      infoTooltip,
      prefix,
      prefixText,
      showPrefix: showPrefixProp,
      leftIcon,
      iconL,
      showIconL: showIconLProp,
      rightIcon,
      iconR,
      showIconR: showIconRProp,
      suffix,
      suffixText,
      showSuffix: showSuffixProp,
      hint,
      hintText,
      showHint: showHintProp,
      errorMessage,
      successMessage,
      showCounter,
      maxLength,
      value,
      defaultValue,
      onChange,
      disabled,
      className,
      containerClassName,
      placeholder = "placeholder",
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = customId ?? `field-${generatedId}`;
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;
    const successId = `${inputId}-success`;

    const [currentLength, setCurrentLength] = useState<number>(() => {
      if (typeof value === "string" || typeof value === "number") {
        return String(value).length;
      }
      if (typeof defaultValue === "string" || typeof defaultValue === "number") {
        return String(defaultValue).length;
      }
      return 0;
    });

    // Content resolution
    const resolvedLabel = labelText ?? label;
    const showLabel = showLabelProp ?? Boolean(resolvedLabel);

    const resolvedDescription = descriptionText ?? description;
    const showDescription = showDescriptionProp ?? Boolean(resolvedDescription);

    const isWajib = Boolean(showWajib ?? required);
    const isOpsional = Boolean(showOpsional ?? optional);

    const resolvedPrefix = prefixText ?? prefix;
    const showPrefix = showPrefixProp ?? Boolean(resolvedPrefix);

    const resolvedLeftIcon = iconL ?? leftIcon;
    const showLeftIcon = showIconLProp ?? Boolean(resolvedLeftIcon);

    const resolvedRightIcon = iconR ?? rightIcon;
    const showRightIcon = showIconRProp ?? Boolean(resolvedRightIcon);

    const resolvedSuffix = suffixText ?? suffix;
    const showSuffix = showSuffixProp ?? Boolean(resolvedSuffix);

    const resolvedHint = hintText ?? hint;
    const showHint = showHintProp ?? Boolean(resolvedHint);

    // Determine state
    let effectiveState: TextFieldState = stateProp ?? "default";
    if (disabled) {
      effectiveState = "disabled";
    } else if (errorMessage) {
      effectiveState = "error";
    } else if (successMessage) {
      effectiveState = "success";
    }

    const isSm = size === "sm";
    const isLg = size === "lg";

    const iconPixelSize = isSm ? 16 : isLg ? 24 : 20;
    const dividerHeightClass = isSm ? "h-3.5" : isLg ? "h-6" : "h-5";
    const hasInfoTooltip = Boolean(showInfoTooltip ?? infoTooltip);

    return (
      <FormFieldWrapper
        id={inputId}
        size={size}
        label={resolvedLabel}
        showLabel={showLabel}
        isWajib={isWajib}
        isOpsional={isOpsional}
        description={resolvedDescription}
        showDescription={showDescription}
        hasInfoTooltip={hasInfoTooltip}
        infoTooltip={infoTooltip}
        hint={resolvedHint}
        showHint={showHint}
        hintId={hintId}
        errorMessage={errorMessage}
        errorId={errorId}
        successMessage={successMessage}
        successId={successId}
        showCounter={showCounter}
        counterText={maxLength ? `${currentLength}/${maxLength}` : currentLength}
        containerClassName={containerClassName}
      >
        <div className={textFieldVariants({ size, state: effectiveState })}>
          {/* Prefix Slot with Divider */}
          {showPrefix && (
            <div className="flex shrink-0 items-center gap-8 font-medium text-primary select-none">
              <span>{resolvedPrefix}</span>
              <div
                className={cn("w-px shrink-0 bg-border-primary", dividerHeightClass)}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Left Icon */}
          {showLeftIcon && (
            <span
              className={cn("inline-flex shrink-0 items-center text-secondary", iconSizes[size])}
              aria-hidden="true"
            >
              {renderIcon(resolvedLeftIcon, iconPixelSize)}
            </span>
          )}

          {/* Native HTML Input */}
          <input
            ref={ref}
            id={inputId}
            value={value}
            defaultValue={defaultValue}
            disabled={effectiveState === "disabled"}
            maxLength={maxLength}
            placeholder={placeholder}
            aria-invalid={effectiveState === "error" || undefined}
            aria-describedby={
              errorMessage ? errorId : successMessage ? successId : showHint ? hintId : undefined
            }
            onChange={(e) => {
              setCurrentLength(e.target.value.length);
              onChange?.(e);
            }}
            className={cn(
              "w-full min-w-0 flex-1 bg-transparent text-primary outline-none placeholder:text-placeholder disabled:cursor-not-allowed",
              className,
            )}
            {...rest}
          />

          {/* Right Icon */}
          {showRightIcon && (
            <span
              className={cn("inline-flex shrink-0 items-center text-secondary", iconSizes[size])}
              aria-hidden="true"
            >
              {renderIcon(resolvedRightIcon, iconPixelSize)}
            </span>
          )}

          {/* Suffix Slot with Divider */}
          {showSuffix && (
            <div className="flex shrink-0 items-center gap-8 font-medium text-primary select-none">
              <div
                className={cn("w-px shrink-0 bg-border-primary", dividerHeightClass)}
                aria-hidden="true"
              />
              <span>{resolvedSuffix}</span>
            </div>
          )}
        </div>
      </FormFieldWrapper>
    );
  },
);

TextField.displayName = "TextField";
