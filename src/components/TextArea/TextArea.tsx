import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormFieldWrapper } from "../common/FormFieldWrapper";
import type { TextAreaProps, TextAreaState } from "./TextArea.types";

export const textAreaVariants = cva(
  "w-full rounded-[4px] border border-solid transition-[border-color,box-shadow] outline-none text-[#444b55] placeholder:text-[#b1b4b8] dark:text-neutral-100 dark:placeholder:text-neutral-500",
  {
    variants: {
      size: {
        sm: "min-h-[72px] p-2 text-xs leading-[18px]",
        md: "min-h-[96px] p-2 text-sm leading-[21px]",
        lg: "min-h-[120px] p-2 text-base leading-[24px]",
      },
      state: {
        default:
          "border-[#d5d7d9] bg-white dark:border-neutral-700 dark:bg-neutral-900 hover:border-[#009ea9] focus:border-[#009ea9] focus:ring-2 focus:ring-[#009ea9]/20 focus:shadow-[0px_0px_0px_2px_#eee9fa]",
        hover: "border-[#009ea9] bg-white dark:bg-neutral-900",
        focussed:
          "border-[#009ea9] bg-white dark:bg-neutral-900 ring-2 ring-[#009ea9]/20 shadow-[0px_0px_0px_2px_#eee9fa]",
        filled:
          "border-[#d5d7d9] bg-white dark:border-neutral-700 dark:bg-neutral-900 hover:border-[#009ea9] focus:border-[#009ea9] focus:ring-2 focus:ring-[#009ea9]/20 focus:shadow-[0px_0px_0px_2px_#eee9fa]",
        error: "border-[#ee3124] bg-white dark:bg-neutral-900 ring-2 ring-[#ee3124]/20",
        "error counter": "border-[#ee3124] bg-white dark:bg-neutral-900 ring-2 ring-[#ee3124]/20",
        success: "border-[#25974c] bg-white dark:bg-neutral-900 ring-2 ring-[#25974c]/20",
        disabled:
          "border-[#dee3ed] bg-[#eff0f1] text-[#8c9197] cursor-not-allowed dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-500",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
      resize: "vertical",
    },
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      hint,
      hintText,
      showHint: showHintProp,
      errorMessage,
      successMessage,
      showCounter,
      counterText: counterTextProp,
      maxLength,
      resize = "vertical",
      autoResize = false,
      value,
      defaultValue,
      onChange,
      disabled,
      className,
      containerClassName,
      placeholder = "placeholder",
      rows,
      ...rest
    },
    forwardedRef,
  ) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);
    const generatedId = useId();
    const textareaId = customId ?? `textarea-${generatedId}`;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;
    const successId = `${textareaId}-success`;

    const [currentLength, setCurrentLength] = useState<number>(() => {
      if (typeof value === "string") return value.length;
      if (typeof defaultValue === "string") return defaultValue.length;
      return 0;
    });

    // Content resolution with Figma property fallbacks
    const resolvedLabel = labelText ?? label;
    const showLabel = showLabelProp ?? Boolean(resolvedLabel);

    const resolvedDescription = descriptionText ?? description;
    const showDescription = showDescriptionProp ?? Boolean(resolvedDescription);

    const isWajib = Boolean(showWajib ?? required);
    const isOpsional = Boolean(showOpsional ?? optional);

    const resolvedHint = hintText ?? hint;
    const showHint = showHintProp ?? Boolean(resolvedHint);

    const hasInfoTooltip = Boolean(showInfoTooltip ?? infoTooltip);

    // Track character length when value changes externally
    useEffect(() => {
      if (typeof value === "string") {
        setCurrentLength(value.length);
      }
    }, [value]);

    // Determine effective visual state
    const isOverLimit = typeof maxLength === "number" && currentLength > maxLength;
    let effectiveState: TextAreaState = stateProp ?? "default";

    if (disabled) {
      effectiveState = "disabled";
    } else if (isOverLimit || stateProp === "error counter") {
      effectiveState = "error counter";
    } else if (errorMessage || stateProp === "error") {
      effectiveState = "error";
    } else if (successMessage || stateProp === "success") {
      effectiveState = "success";
    } else if (stateProp === "hover") {
      effectiveState = "hover";
    } else if (stateProp === "focussed") {
      effectiveState = "focussed";
    } else if (currentLength > 0 && !stateProp) {
      effectiveState = "filled";
    }

    const isSm = size === "sm";
    const isLg = size === "lg";

    // Auto-resize textarea height logic
    const handleAutoResize = (textareaEl: HTMLTextAreaElement) => {
      if (!autoResize) return;
      textareaEl.style.height = "auto";
      textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    };

    // Formatted counter string
    const resolvedCounterText =
      counterTextProp ??
      (typeof maxLength === "number" ? `${currentLength}/${maxLength}` : `${currentLength}`);

    const isErrorCounter = effectiveState === "error counter";
    const isError = effectiveState === "error";

    return (
      <FormFieldWrapper
        id={textareaId}
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
        counterText={resolvedCounterText}
        isErrorCounter={isErrorCounter}
        containerClassName={containerClassName}
      >
        <textarea
          ref={(node) => {
            internalRef.current = node;
            if (typeof forwardedRef === "function") {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
          }}
          id={textareaId}
          value={value}
          defaultValue={defaultValue}
          disabled={effectiveState === "disabled"}
          maxLength={maxLength}
          rows={rows ?? (isSm ? 3 : isLg ? 5 : 4)}
          placeholder={placeholder}
          aria-invalid={isError || isErrorCounter ? true : undefined}
          aria-describedby={
            isError ? errorId : successMessage ? successId : showHint ? hintId : undefined
          }
          onChange={(e) => {
            setCurrentLength(e.target.value.length);
            handleAutoResize(e.target);
            onChange?.(e);
          }}
          className={cn(
            textAreaVariants({
              size,
              state: effectiveState,
              resize: autoResize ? "none" : resize,
            }),
            className,
          )}
          {...rest}
        />
      </FormFieldWrapper>
    );
  },
);

TextArea.displayName = "TextArea";
