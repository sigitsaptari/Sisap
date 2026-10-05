/**
 * Shared prop helpers. React 19 treats `ref` as a regular prop, so components
 * extend `ComponentPropsWithRef<"element">` and receive `ref` without forwardRef.
 */
export type { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from "react";
