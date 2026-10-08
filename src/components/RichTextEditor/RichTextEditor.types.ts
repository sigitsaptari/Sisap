import type { FormFieldWrapperProps } from "../common/FormFieldWrapper";

export type RichTextEditorSize = "sm" | "md" | "lg";
export type RichTextEditorState = "default" | "error" | "success" | "disabled" | "focussed";

export interface RichTextEditorProps extends Omit<FormFieldWrapperProps, "children" | "size"> {
  size?: RichTextEditorSize;
  state?: RichTextEditorState;

  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;

  maxLength?: number;

  className?: string;
  containerClassName?: string;
  editorClassName?: string;
}
