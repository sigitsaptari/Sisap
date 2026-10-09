import type { ReactNode } from "react";
import { Danger, InfoCircle, TickCircle } from "iconsax-react";
import { cn } from "../../utils/cn";

export type FormFieldSize = "sm" | "md" | "lg";

export interface FormFieldWrapperProps {
  id?: string;
  size?: FormFieldSize;
  label?: ReactNode;
  showLabel?: boolean;
  isWajib?: boolean;
  isOpsional?: boolean;
  description?: ReactNode;
  showDescription?: boolean;
  hasInfoTooltip?: boolean;
  infoTooltip?: ReactNode;
  hint?: ReactNode;
  showHint?: boolean;
  hintId?: string;
  errorMessage?: ReactNode;
  errorId?: string;
  successMessage?: ReactNode;
  successId?: string;
  showCounter?: boolean;
  counterText?: ReactNode;
  isErrorCounter?: boolean;
  containerClassName?: string;
  children: ReactNode;
}

const statusIconSizes: Record<FormFieldSize, { sizePx: number; className: string }> = {
  sm: { sizePx: 12, className: "size-3" },
  md: { sizePx: 16, className: "size-4" },
  lg: { sizePx: 20, className: "size-5" },
};

export function FormFieldWrapper({
  id,
  size = "md",
  label,
  showLabel = true,
  isWajib = false,
  isOpsional = false,
  description,
  showDescription = true,
  hasInfoTooltip = false,
  infoTooltip,
  hint,
  showHint = false,
  hintId,
  errorMessage,
  errorId,
  successMessage,
  successId,
  showCounter = false,
  counterText,
  isErrorCounter = false,
  containerClassName,
  children,
}: FormFieldWrapperProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  const labelSizeClass = isSm ? "text-xs" : isLg ? "text-base" : "text-sm";
  const descSizeClass = isSm ? "text-xs" : isLg ? "text-base" : "text-sm";
  const badgeSizeClass = isSm ? "text-[10px]" : isLg ? "text-sm" : "text-xs";
  const hintSizeClass = isSm ? "text-[10px]" : isLg ? "text-sm" : "text-xs";
  const statusMsgSizeClass = isSm ? "text-xs" : isLg ? "text-base" : "text-sm";
  const statusGapClass = isSm ? "gap-4" : isLg ? "gap-8" : "gap-4";

  const hasHeader = Boolean(showLabel && label);
  const displayStatusRow = Boolean(errorMessage || successMessage);
  const displayHintRow = Boolean((showHint && hint) || showCounter);

  return (
    <div className={cn("flex w-full flex-col gap-8", containerClassName)}>
      {/* Header row: Label + Wajib/Opsional + Info Tooltip + Description */}
      {hasHeader && (
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center gap-8">
            <label
              htmlFor={id}
              className={cn(
                "font-medium text-primary select-none",
                labelSizeClass,
              )}
            >
              {label}
            </label>

            {isWajib && (
              <span className={cn("font-normal text-[#ee3124] text-error italic select-none", badgeSizeClass)}>
                Wajib
              </span>
            )}

            {isOpsional && (
              <span className={cn("font-normal text-[#8c9197] text-placeholder italic select-none", badgeSizeClass)}>
                Opsional
              </span>
            )}

            {hasInfoTooltip && (
              <span
                title={typeof infoTooltip === "string" ? infoTooltip : undefined}
                className="inline-flex cursor-help items-center text-secondary transition-colors hover:text-primary"
                aria-label="Informasi tambahan"
              >
                <InfoCircle color="currentColor" size={16} className="size-16" aria-hidden="true" />
              </span>
            )}
          </div>

          {showDescription && description && (
            <p
              className={cn(
                "leading-normal font-normal text-secondary",
                descSizeClass,
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Main control slot (Input, Textarea, Select, etc.) */}
      {children}

      {/* Status Caption Row: Error or Success message with standard icon */}
      {displayStatusRow && (
        <div
          id={errorMessage ? errorId : successId}
          className={cn("flex w-full items-center", statusGapClass)}
        >
          {errorMessage ? (
            <>
              <Danger
                color="currentColor"
                size={statusIconSizes[size].sizePx}
                className={cn("shrink-0 text-error", statusIconSizes[size].className)}
                aria-hidden="true"
              />
              <span className={cn("leading-normal font-normal text-error", statusMsgSizeClass)}>
                {errorMessage}
              </span>
            </>
          ) : successMessage ? (
            <>
              <TickCircle
                color="currentColor"
                size={statusIconSizes[size].sizePx}
                className={cn("shrink-0 text-status-success", statusIconSizes[size].className)}
                aria-hidden="true"
              />
              <span className={cn("leading-normal font-normal text-status-success", statusMsgSizeClass)}>
                {successMessage}
              </span>
            </>
          ) : null}
        </div>
      )}

      {/* Footer Hint Row: Hint Text (left) and Character Counter (right) */}
      {displayHintRow && (
        <div className="flex w-full items-center justify-between gap-8">
          {showHint && hint ? (
            <p
              id={hintId}
              className={cn(
                "leading-normal font-normal text-secondary",
                hintSizeClass,
              )}
            >
              {hint}
            </p>
          ) : (
            <span />
          )}

          {showCounter && counterText !== undefined && (
            <span
              className={cn(
                "ml-auto shrink-0 text-right font-normal transition-colors select-none",
                hintSizeClass,
                isErrorCounter
                  ? "font-medium text-error"
                  : "text-secondary",
              )}
            >
              {counterText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
