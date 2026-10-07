import { useState, useRef, useEffect, useId, useMemo } from "react";
import { ArrowDown2, SearchNormal1 } from "iconsax-react";
import { cn } from "../../utils/cn";
import { FormFieldWrapper } from "../common/FormFieldWrapper";
import { TextField, textFieldVariants } from "../TextField/TextField";
import { Checkbox } from "../Checkbox/Checkbox";
import type { SelectFieldProps } from "./SelectField.types";

const iconSizes: Record<string, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

export function SelectField({
  id: customId,
  size = "md",
  state: stateProp = "default",
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
  searchable = false,
  searchPlaceholder = "Search",
  onSearchChange,
  multiple = false,
  disabled = false,
  className,
  containerClassName,
  dropdownClassName,
  
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
}: SelectFieldProps) {
  const generatedId = useId();
  const inputId = customId ?? `select-${generatedId}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const successId = `${inputId}-success`;

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue ?? (multiple ? [] : "")
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Determine effective state
  let effectiveState = stateProp;
  if (disabled) effectiveState = "disabled";
  else if (errorMessage) effectiveState = "error";
  else if (successMessage) effectiveState = "success";
  else if (isOpen) effectiveState = "focussed";

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle option toggle/selection
  const handleOptionClick = (optionValue: string) => {
    if (disabled) return;
    
    if (multiple) {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      let newValues;
      
      if (currentValues.includes(optionValue)) {
        newValues = currentValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...currentValues, optionValue];
      }
      
      if (!isControlled) setInternalValue(newValues);
      onChange?.(newValues);
    } else {
      if (!isControlled) setInternalValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false); // Close dropdown on single select
    }
  };

  // Resolve display text for the trigger
  const displayText = useMemo(() => {
    if (multiple) {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      if (currentValues.length === 0) return null;
      
      const selectedLabels = options
        .filter((opt) => currentValues.includes(opt.value))
        .map((opt) => opt.label);
      
      return selectedLabels.length > 0 ? selectedLabels.join(", ") : null;
    } else {
      if (!currentValue) return null;
      const selectedOption = options.find((opt) => opt.value === currentValue);
      return selectedOption ? selectedOption.label : null;
    }
  }, [currentValue, multiple, options]);

  // Filter options if searchable
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;
    return options.filter((opt) => {
      // Very basic text search for now
      const labelStr = String(opt.label).toLowerCase();
      return labelStr.includes(searchValue.toLowerCase());
    });
  }, [options, searchable, searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearchChange?.(e.target.value);
  };

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
      showCounter={showCounter}
      counterText={counterText}
      isErrorCounter={isErrorCounter}
      containerClassName={containerClassName}
    >
      <div className="relative w-full" ref={containerRef}>
        {/* Trigger */}
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            textFieldVariants({ size, state: effectiveState }),
            "justify-between cursor-pointer text-left focus:outline-none",
            className
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              "block truncate",
              displayText ? "text-[#444b55] dark:text-neutral-100" : "text-[#b1b4b8]"
            )}
          >
            {displayText || placeholder}
          </span>
          <ArrowDown2
            size={iconSizes[size] === "size-4" ? 16 : iconSizes[size] === "size-5" ? 20 : 24}
            className={cn(
              "shrink-0 text-[#686e76] transition-transform",
              isOpen && "rotate-180"
            )}
            variant="Linear"
          />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className={cn(
              "absolute left-0 top-full z-50 mt-1 w-full max-h-[260px] overflow-hidden flex flex-col",
              "bg-white dark:bg-neutral-900 rounded-[4px] border border-[#d5d7d9] dark:border-neutral-700 shadow-lg",
              dropdownClassName
            )}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-[#d5d7d9] dark:border-neutral-700 shrink-0 bg-white dark:bg-neutral-900 z-10">
                <TextField
                  size="sm"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                  leftIcon={<SearchNormal1 size={16} />}
                />
              </div>
            )}

            {/* List */}
            <ul
              className="flex-1 overflow-y-auto py-2"
              role="listbox"
              aria-multiselectable={multiple}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(currentValue) && currentValue.includes(option.value)
                    : currentValue === option.value;

                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleOptionClick(option.value)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 cursor-pointer text-sm transition-colors",
                        "hover:bg-[#f9fafa] dark:hover:bg-neutral-800 text-[#444b55] dark:text-neutral-200",
                        isSelected && !multiple && "bg-[#f0f9fa] dark:bg-neutral-800 text-[#009ea9]"
                      )}
                    >
                      {multiple && (
                        <Checkbox
                          size="sm"
                          checked={isSelected}
                          // Prevent triggering row click twice, though row click handles it
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => handleOptionClick(option.value)}
                        />
                      )}
                      <span className="flex-1 truncate block">{option.label}</span>
                    </li>
                  );
                })
              ) : (
                <li className="px-3 py-4 text-center text-sm text-[#b1b4b8]">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </FormFieldWrapper>
  );
}
