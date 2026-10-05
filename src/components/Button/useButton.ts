import type { ButtonProps } from "./Button.types";

/**
 * Behavior layer for Button: derives the native `<button>` state attributes
 * (disabled / aria-busy) from props. Keeps Button.tsx purely presentational.
 */
export function useButton({
  isLoading = false,
  disabled,
}: Pick<ButtonProps, "isLoading" | "disabled">) {
  return {
    disabled: disabled || isLoading,
    "aria-busy": isLoading || undefined,
  } as const;
}
