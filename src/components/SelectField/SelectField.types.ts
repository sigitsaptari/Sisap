import type { ReactNode } from "react";
import type { FormFieldWrapperProps } from "../common/FormFieldWrapper";

export type SelectFieldSize = "sm" | "md" | "lg";
export type SelectFieldState = "default" | "error" | "success" | "disabled" | "focussed" | "filled";

export interface SelectOption {
  value: string;
  label: ReactNode;
}

export interface SelectFieldProps extends Omit<FormFieldWrapperProps, "children" | "size"> {
  size?: SelectFieldSize;
  state?: SelectFieldState;
  
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: any) => void;
  
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (search: string) => void;
  
  multiple?: boolean;
  disabled?: boolean;
  
  className?: string;
  containerClassName?: string;
  dropdownClassName?: string;
}
