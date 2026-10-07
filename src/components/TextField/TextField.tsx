import { forwardRef, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { Danger, InfoCircle, TickCircle } from "iconsax-react";
import { cn } from "../../utils/cn";
import { renderIcon } from "../../utils/icon";
import type { TextFieldProps, TextFieldSize, TextFieldState } from "./TextField.types";

export const textFieldVariants = cva(
  "flex w-full items-center border border-solid rounded-chip transition-colors bg-white dark:bg-neutral-900",
  {
    variants: {
      size: {
        sm: "h-9 px-3 gap-2 text-xs",
        md: "h-11 px-4 gap-3 text-sm",
        lg: "h-[52px] px-5 gap-4 text-base",
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
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
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
    const labelSizeClass = isSm ? "text-xs" : isLg ? "text-base" : "text-sm";

    const descSizeClass = isSm ? "text-xs" : isLg ? "text-base" : "text-sm";

    const badgeSizeClass = isSm ? "text-[10px]" : "text-xs";
    const hintSizeClass = isSm ? "text-[10px]" : isLg ? "text-sm" : "text-xs";
    const dividerHeightClass = isSm ? "h-3.5" : isLg ? "h-6" : "h-5";

    const hasInfoTooltip = Boolean(showInfoTooltip ?? infoTooltip);

    return (
      <div className={cn("flex w-full flex-col gap-2", containerClassName)}>
        {/* Header row: Label + Wajib/Opsional + Info Tooltip + Description */}
        {showLabel && (
          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full items-center gap-1.5">
              <label
                htmlFor={inputId}
                className={cn(
                  "font-medium text-[#444b55] select-none dark:text-neutral-200",
                  labelSizeClass,
                )}
              >
                {resolvedLabel}
              </label>

              {isWajib && (
                <span
                  className={cn("font-normal text-[#ee3124] italic select-none", badgeSizeClass)}
                >
                  Wajib
                </span>
              )}

              {isOpsional && (
                <span
                  className={cn("font-normal text-[#b1b4b8] italic select-none", badgeSizeClass)}
                >
                  Opsional
                </span>
              )}

              {hasInfoTooltip && (
                <span
                  title={typeof infoTooltip === "string" ? infoTooltip : undefined}
                  className="inline-flex cursor-help items-center text-[#686e76] transition-colors hover:text-[#444b55] dark:hover:text-neutral-300"
                  aria-label="Informasi tambahan"
                >
                  <InfoCircle
                    color="currentColor"
                    size={16}
                    className="size-4"
                    aria-hidden="true"
                  />
                </span>
              )}
            </div>

            {showDescription && (
              <p
                className={cn(
                  "leading-normal font-normal text-[#686e76] dark:text-neutral-400",
                  descSizeClass,
                )}
              >
                {resolvedDescription}
              </p>
            )}
          </div>
        )}

        {/* Input Container Box: Prefix | IconL | Input | IconR | Suffix */}
        <div className={textFieldVariants({ size, state: effectiveState })}>
          {/* Prefix Slot with Divider */}
          {showPrefix && (
            <div className="flex shrink-0 items-center gap-2.5 font-medium text-[#444b55] select-none dark:text-neutral-300">
              <span>{resolvedPrefix}</span>
              <div
                className={cn("w-px shrink-0 bg-[#d5d7d9] dark:bg-neutral-700", dividerHeightClass)}
                aria-hidden="true"
              />
            </div>
          )}

          {/* Left Icon */}
          {showLeftIcon && (
            <span
              className={cn("inline-flex shrink-0 items-center text-[#686e76]", iconSizes[size])}
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
              "w-full min-w-0 flex-1 bg-transparent text-[#444b55] outline-none placeholder:text-[#b1b4b8] disabled:cursor-not-allowed dark:text-neutral-100",
              className,
            )}
            {...rest}
          />

          {/* Right Icon */}
          {showRightIcon && (
            <span
              className={cn("inline-flex shrink-0 items-center text-[#686e76]", iconSizes[size])}
              aria-hidden="true"
            >
              {renderIcon(resolvedRightIcon, iconPixelSize)}
            </span>
          )}

          {/* Suffix Slot with Divider */}
          {showSuffix && (
            <div className="flex shrink-0 items-center gap-2.5 font-medium text-[#444b55] select-none dark:text-neutral-300">
              <div
                className={cn("w-px shrink-0 bg-[#d5d7d9] dark:bg-neutral-700", dividerHeightClass)}
                aria-hidden="true"
              />
              <span>{resolvedSuffix}</span>
            </div>
          )}
        </div>

        {/* Footer row: Error / Success / Hint message + Counter */}
        {(errorMessage || successMessage || showHint || showCounter) && (
          <div className="flex w-full items-center justify-between gap-2">
            {errorMessage ? (
              <p
                id={errorId}
                className={cn(
                  "flex items-center gap-1.5 leading-normal font-medium text-[#ee3124]",
                  hintSizeClass,
                )}
              >
                <Danger
                  color="currentColor"
                  size={14}
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{errorMessage}</span>
              </p>
            ) : successMessage ? (
              <p
                id={successId}
                className={cn(
                  "flex items-center gap-1.5 leading-normal font-medium text-[#25974c]",
                  hintSizeClass,
                )}
              >
                <TickCircle
                  color="currentColor"
                  size={14}
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{successMessage}</span>
              </p>
            ) : showHint ? (
              <p
                id={hintId}
                className={cn(
                  "leading-normal font-normal text-[#686e76] dark:text-neutral-400",
                  hintSizeClass,
                )}
              >
                {resolvedHint}
              </p>
            ) : (
              <span />
            )}

            {showCounter && (
              <span
                className={cn(
                  "ml-auto shrink-0 font-mono text-[#b1b4b8] dark:text-neutral-500",
                  hintSizeClass,
                )}
              >
                {maxLength ? `${currentLength}/${maxLength}` : currentLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
