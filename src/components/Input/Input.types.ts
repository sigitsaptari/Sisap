import type { ComponentPropsWithRef } from "react";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<ComponentPropsWithRef<"input">, "size"> {
  /** Control height & typography. Defaults to "md". */
  size?: InputSize;
  /** Marks the field invalid (sets `aria-invalid` and the error border). */
  invalid?: boolean;
}
