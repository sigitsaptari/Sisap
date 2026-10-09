import { useState, useRef, useId, useEffect } from "react";
import { cva } from "class-variance-authority";
import {
  TextBold,
  TextItalic,
  TextUnderline,
  TextalignLeft,
  TextalignCenter,
  TextalignRight,
} from "iconsax-react";
import { cn } from "../../utils/cn";
import { FormFieldWrapper } from "../common/FormFieldWrapper";
import type { RichTextEditorProps } from "./RichTextEditor.types";

const StrikethroughIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M9 16c0 1.5 1.5 2 3 2s3-.5 3-2M15 8c0-1.5-1.5-2-3-2s-3 .5-3 2"
    />
  </svg>
);

const OrderedListIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6h10M10 12h10M10 18h10M4 6h.01M4 12h.01M4 18h.01"
    />
  </svg>
);

const UnorderedListIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
    />
    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
    <circle cx="4" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

export const rteVariants = cva(
  "flex w-full flex-col overflow-hidden rounded-lg bg-surface-base dark:bg-neutral-900 transition-colors",
  {
    variants: {
      state: {
        default: "border border-border-primary dark:border-neutral-700 hover:border-action-primary",
        error: "border border-error ring-2 ring-error/20",
        success: "border border-feedback-success ring-2 ring-feedback-success/20",
        disabled:
          "border border-border-subtle bg-surface-sunken dark:bg-neutral-800 text-placeholder cursor-not-allowed",
        focussed: "border border-action-primary ring-2 ring-action-primary/20",
      },
    },
    defaultVariants: {
      state: "default",
    },
  },
);

export function RichTextEditor({
  id: customId,
  size = "md",
  state: stateProp = "default",
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  className,
  containerClassName,
  editorClassName,

  // FormFieldWrapper props
  label,
  showLabel,
  isWajib,
  isOpsional,
  description,
  showDescription,
  hasInfoTooltip,
  infoTooltip,
  hint,
  showHint,
  errorMessage,
  successMessage,
  showCounter,
  counterText,
  isErrorCounter,
}: RichTextEditorProps) {
  const generatedId = useId();
  const inputId = customId ?? `rte-${generatedId}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const successId = `${inputId}-success`;

  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");
  const [currentLength, setCurrentLength] = useState(0);

  // Derive state
  let effectiveState = stateProp;
  if (disabled) effectiveState = "disabled";
  else if (errorMessage) effectiveState = "error";
  else if (successMessage) effectiveState = "success";
  else if (isFocused) effectiveState = "focussed";

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (editorRef.current && currentValue !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = currentValue;
      setCurrentLength(editorRef.current.innerText.trim().length);
    }
  }, [currentValue]);

  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  const updateActiveFormats = () => {
    if (disabled || !editorRef.current) return;
    const formats = [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "insertOrderedList",
      "insertUnorderedList",
    ];
    const current: Record<string, boolean> = {};

    formats.forEach((cmd) => {
      try {
        current[cmd] = document.queryCommandState(cmd);
      } catch (_e) {
        current[cmd] = false;
      }
    });

    try {
      const block = document.queryCommandValue("formatBlock");
      current["H1"] = block.toLowerCase() === "h1";
      current["H2"] = block.toLowerCase() === "h2";
    } catch (_e) {
      current["H1"] = false;
      current["H2"] = false;
    }

    setActiveFormats(current);
  };

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const text = editorRef.current.innerText.trim();
      setCurrentLength(text.length);
      if (!isControlled) setInternalValue(html);
      onChange?.(html);
      updateActiveFormats();
    }
  };

  const executeCommand = (command: string, arg?: string) => {
    if (disabled) return;
    document.execCommand(command, false, arg);
    editorRef.current?.focus();
    handleInput();
    updateActiveFormats();
  };

  const ToolbarButton = ({
    icon,
    onClick,
    title,
    text,
    isActive,
  }: {
    icon?: React.ReactNode;
    onClick: () => void;
    title: string;
    text?: string;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded p-1 text-primary transition-all dark:text-neutral-200",
        disabled
          ? "cursor-not-allowed opacity-50"
          : cn(
              "cursor-pointer",
              isActive
                ? "bg-brand-soft text-action-primary dark:bg-action-primary/20"
                : "hover:bg-neutral-200 dark:hover:bg-neutral-800",
            ),
      )}
    >
      {text ? <span className="text-sm font-bold">{text}</span> : icon}
    </button>
  );

  return (
    <FormFieldWrapper
      id={inputId}
      size={size}
      label={label}
      showLabel={showLabel}
      isWajib={isWajib}
      isOpsional={isOpsional}
      description={description}
      showDescription={showDescription}
      hasInfoTooltip={hasInfoTooltip}
      infoTooltip={infoTooltip}
      hint={hint}
      showHint={showHint}
      hintId={hintId}
      errorMessage={errorMessage}
      errorId={errorId}
      successMessage={successMessage}
      successId={successId}
      showCounter={false} // We handle counter inside for RTE
      containerClassName={containerClassName}
    >
      <div className={cn(rteVariants({ state: effectiveState }), className)}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-4 border-b border-border-primary bg-bg-canvas px-16 py-8 dark:border-neutral-700 dark:bg-neutral-800/50">
          <ToolbarButton
            text="H1"
            title="Heading 1"
            isActive={activeFormats["H1"]}
            onClick={() => executeCommand("formatBlock", "H1")}
          />
          <ToolbarButton
            text="H2"
            title="Heading 2"
            isActive={activeFormats["H2"]}
            onClick={() => executeCommand("formatBlock", "H2")}
          />
          <div className="mx-8 h-16 w-px bg-border-primary dark:bg-neutral-700" />

          <ToolbarButton
            icon={<TextBold size={18} />}
            title="Bold"
            isActive={activeFormats["bold"]}
            onClick={() => executeCommand("bold")}
          />
          <ToolbarButton
            icon={<TextItalic size={18} />}
            title="Italic"
            isActive={activeFormats["italic"]}
            onClick={() => executeCommand("italic")}
          />
          <ToolbarButton
            icon={<TextUnderline size={18} />}
            title="Underline"
            isActive={activeFormats["underline"]}
            onClick={() => executeCommand("underline")}
          />
          <ToolbarButton
            icon={<StrikethroughIcon className="size-[18px]" />}
            title="Strikethrough"
            isActive={activeFormats["strikeThrough"]}
            onClick={() => executeCommand("strikeThrough")}
          />
          <div className="mx-8 h-16 w-px bg-border-primary dark:bg-neutral-700" />

          <ToolbarButton
            icon={<TextalignLeft size={18} />}
            title="Align Left"
            isActive={activeFormats["justifyLeft"]}
            onClick={() => executeCommand("justifyLeft")}
          />
          <ToolbarButton
            icon={<TextalignCenter size={18} />}
            title="Align Center"
            isActive={activeFormats["justifyCenter"]}
            onClick={() => executeCommand("justifyCenter")}
          />
          <ToolbarButton
            icon={<TextalignRight size={18} />}
            title="Align Right"
            isActive={activeFormats["justifyRight"]}
            onClick={() => executeCommand("justifyRight")}
          />
          <div className="mx-8 h-16 w-px bg-border-primary dark:bg-neutral-700" />

          <ToolbarButton
            icon={<OrderedListIcon className="size-[18px]" />}
            title="Ordered List"
            isActive={activeFormats["insertOrderedList"]}
            onClick={() => executeCommand("insertOrderedList")}
          />
          <ToolbarButton
            icon={<UnorderedListIcon className="size-[18px]" />}
            title="Unordered List"
            isActive={activeFormats["insertUnorderedList"]}
            onClick={() => executeCommand("insertUnorderedList")}
          />
        </div>

        {/* Editor Area */}
        <div className="relative flex w-full flex-col">
          {placeholder && (!currentValue || currentLength === 0) && (
            <div
              className="pointer-events-none absolute top-12 right-16 left-16 text-sm leading-normal text-placeholder select-none"
              aria-hidden="true"
            >
              {placeholder}
            </div>
          )}
          <div
            ref={editorRef}
            id={inputId}
            contentEditable={!disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onInput={handleInput}
            onKeyUp={updateActiveFormats}
            onMouseUp={updateActiveFormats}
            className={cn(
              "min-h-[110px] w-full px-16 py-12 text-sm leading-normal text-primary outline-none dark:text-neutral-100",
              "focus:outline-none",
              editorClassName,
            )}
            data-placeholder={placeholder}
            aria-disabled={disabled}
            aria-invalid={effectiveState === "error"}
          />

          {/* Internal Counter (bottom right) */}
          {(showCounter || maxLength) && (
            <div
              className={cn(
                "absolute right-16 bottom-8 text-[10px] sm:text-xs",
                isErrorCounter || (maxLength && currentLength > maxLength)
                  ? "font-medium text-error"
                  : "text-placeholder",
              )}
            >
              {counterText || (maxLength ? `${currentLength}/${maxLength}` : currentLength)}
            </div>
          )}
        </div>
      </div>
    </FormFieldWrapper>
  );
}
