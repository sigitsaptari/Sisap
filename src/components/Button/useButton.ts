import type { ButtonProps } from "./Button.types";

/**
 * Behavior layer for Button: derives the native `<button>` state attributes
 * (disabled / aria-busy / aria-disabled) from props. Keeps Button.tsx purely presentational.
 */
export function useButton({
  isLoading = false,
  disabled,
}: Pick<ButtonProps, "isLoading" | "disabled">) {
  const isDisabled = Boolean(disabled || isLoading);
  return {
    disabled: isDisabled,
    "aria-disabled": isDisabled || undefined,
    "aria-busy": isLoading || undefined,
  } as const;
}
