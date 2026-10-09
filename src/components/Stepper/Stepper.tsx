import { Children, cloneElement, forwardRef, isValidElement, type ReactElement } from "react";
import { cn } from "../../utils/cn";
import { renderIcon } from "../../utils/icon";
import type {
  StepperItemProps,
  StepperPosition,
  StepperProps,
  StepperState,
  StepperTextOn,
} from "./Stepper.types";

/**
 * Individual Stepper Item component (Figma node 82763:3220 .LgnStepperItem)
 */
export const StepperItem = forwardRef<HTMLDivElement, StepperItemProps>(
  (
    {
      mode = "horizontal",
      position = "middle",
      state = "default",
      textOn,
      step = 1,
      title = "Title",
      description = "Description",
      icon,
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const normalizedMode = (mode?.toLowerCase() ?? "horizontal") as "horizontal" | "vertical";
    const normalizedPosition = (position?.toLowerCase() ?? "middle") as StepperPosition;
    const normalizedState = (state?.toLowerCase() ?? "default") as StepperState;
    const defaultTextOn: StepperTextOn = normalizedMode === "vertical" ? "right" : "bottom";
    const normalizedTextOn = (textOn?.toLowerCase() ?? defaultTextOn) as "bottom" | "right";

    const isFirst = normalizedPosition === "first";
    const isLast = normalizedPosition === "last";
    const isVertical = normalizedMode === "vertical";
    const isSuccess = normalizedState === "success";
    const isActive = normalizedState === "active";
    const isInteractive = Boolean(onClick);

    // Indicator content: Checkmark if success, custom icon or step number otherwise
    const indicatorContent = isSuccess ? (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-20 text-white"
        aria-hidden="true"
      >
        <path
          d="M4.5 10.5L8.5 14.5L15.5 6.5"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : icon ? (
      <span className="inline-flex items-center justify-center">{renderIcon(icon, 20)}</span>
    ) : (
      <span>{step}</span>
    );

    // Common Indicator circle styles matching Figma (44px, 2px border)
    const indicatorElement = (
      <div
        className={cn(
          "z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-solid font-sans text-sm font-bold transition-colors select-none",
          isSuccess
            ? "border-[#009ea9] bg-[#009ea9] text-white"
            : isActive
              ? "border-[#009ea9] bg-white text-[#444b55] dark:border-[#009ea9] dark:bg-neutral-900 dark:text-neutral-100"
              : "border-[#d5d7d9] bg-white text-[#444b55] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
        )}
      >
        {indicatorContent}
      </div>
    );

    // Horizontal Layout - Text on Bottom
    if (!isVertical && normalizedTextOn === "bottom") {
      return (
        <div
          ref={ref}
          role="listitem"
          aria-current={isActive ? "step" : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onClick={onClick}
          onKeyDown={
            isInteractive
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                  }
                }
              : undefined
          }
          className={cn(
            "relative flex min-w-[108px] flex-1 flex-col items-center text-center",
            isInteractive && "group cursor-pointer",
            className,
          )}
          {...rest}
        >
          {/* Connector + Indicator Row */}
          <div className="relative flex w-full items-center justify-center py-2">
            {/* Left Flow Line */}
            <div
              className={cn(
                "h-[2px] flex-1 transition-colors",
                isFirst
                  ? "invisible"
                  : isActive || isSuccess
                    ? "bg-[#009ea9]"
                    : "bg-[#dee3ed] dark:bg-neutral-700",
              )}
              aria-hidden="true"
            />

            {/* Step Indicator Circle */}
            {indicatorElement}

            {/* Right Flow Line */}
            <div
              className={cn(
                "h-[2px] flex-1 transition-colors",
                isLast
                  ? "invisible"
                  : isSuccess
                    ? "bg-[#009ea9]"
                    : "bg-[#dee3ed] dark:bg-neutral-700",
              )}
              aria-hidden="true"
            />
          </div>

          {/* Label Column (Title + Description) */}
          <div className="flex w-full flex-col items-center px-2 text-center">
            {title && (
              <p className="text-base leading-6 font-medium text-[#444b55] dark:text-neutral-100">
                {title}
              </p>
            )}
            {description && (
              <p className="mt-0.5 text-sm leading-[21px] font-normal text-[#686e76] dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>
        </div>
      );
    }

    // Horizontal Layout - Text on Right
    if (!isVertical && normalizedTextOn === "right") {
      return (
        <div
          ref={ref}
          role="listitem"
          aria-current={isActive ? "step" : undefined}
          tabIndex={isInteractive ? 0 : undefined}
          onClick={onClick}
          onKeyDown={
            isInteractive
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onClick?.();
                  }
                }
              : undefined
          }
          className={cn(
            "relative flex min-w-[185px] flex-1 items-center py-2",
            isInteractive && "group cursor-pointer",
            className,
          )}
          {...rest}
        >
          {/* Left Flow Line */}
          <div
            className={cn(
              "h-[2px] min-w-3 flex-1 transition-colors",
              isFirst
                ? "invisible"
                : isActive || isSuccess
                  ? "bg-[#009ea9]"
                  : "bg-[#d5d7d9] dark:bg-neutral-700",
            )}
            aria-hidden="true"
          />

          {/* Indicator */}
          {indicatorElement}

          {/* Label */}
          <div className="flex shrink-0 flex-col justify-center px-8 text-left">
            {title && (
              <p className="text-base leading-6 font-medium text-[#444b55] dark:text-neutral-100">
                {title}
              </p>
            )}
            {description && (
              <p className="text-sm leading-[21px] font-normal text-[#686e76] dark:text-neutral-400">
                {description}
              </p>
            )}
          </div>

          {/* Right Flow Line */}
          <div
            className={cn(
              "h-[2px] min-w-12 flex-1 transition-colors",
              isLast
                ? "invisible"
                : isSuccess
                  ? "bg-[#009ea9]"
                  : "bg-[#d5d7d9] dark:bg-neutral-700",
            )}
            aria-hidden="true"
          />
        </div>
      );
    }

    // Vertical Layout - Text on Right
    return (
      <div
        ref={ref}
        role="listitem"
        aria-current={isActive ? "step" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={
          isInteractive
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          "relative flex min-h-[104px] items-stretch gap-12",
          isInteractive && "group cursor-pointer",
          className,
        )}
        {...rest}
      >
        {/* Left Column: Top line + Indicator + Bottom line */}
        <div className="relative flex w-11 shrink-0 flex-col items-center self-stretch">
          {/* Top Line */}
          <div
            className={cn(
              "w-[2px] transition-colors",
              isFirst ? "invisible h-0" : "min-h-12 flex-1",
              isActive || isSuccess ? "bg-[#009ea9]" : "bg-[#dee3ed] dark:bg-neutral-700",
            )}
            aria-hidden="true"
          />

          {/* Indicator */}
          {indicatorElement}

          {/* Bottom Line */}
          <div
            className={cn(
              "w-[2px] transition-colors",
              isLast ? "invisible h-0" : "min-h-12 flex-1",
              isSuccess ? "bg-[#009ea9]" : "bg-[#dee3ed] dark:bg-neutral-700",
            )}
            aria-hidden="true"
          />
        </div>

        {/* Right Column: Title and Description */}
        <div className="flex flex-col justify-start pt-2.5 pb-4 text-left">
          {title && (
            <p className="text-base leading-6 font-medium text-[#444b55] dark:text-neutral-100">
              {title}
            </p>
          )}
          {description && (
            <p className="mt-0.5 text-sm leading-[21px] font-normal text-[#686e76] dark:text-neutral-400">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  },
);

StepperItem.displayName = "StepperItem";

/**
 * Convenient alias for StepperItem
 */
export const Step = StepperItem;

/**
 * Stepper Container component managing sequences of steps
 */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      currentStep = 1,
      mode = "horizontal",
      textOn,
      steps,
      onStepChange,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isVertical = mode?.toLowerCase() === "vertical";
    const defaultTextOn: StepperTextOn = isVertical ? "right" : "bottom";
    const resolvedTextOn = textOn ?? defaultTextOn;

    // Data-driven rendering if steps prop is provided
    if (steps && steps.length > 0) {
      const totalSteps = steps.length;
      return (
        <div
          ref={ref}
          role="list"
          className={cn(isVertical ? "flex flex-col" : "flex w-full items-stretch", className)}
          {...rest}
        >
          {steps.map((stepData, index) => {
            const stepNumber = index + 1;
            const position: StepperPosition =
              index === 0 ? "first" : index === totalSteps - 1 ? "last" : "middle";

            let state: StepperState = stepData.state ?? "default";
            if (!stepData.state) {
              if (stepNumber < currentStep) state = "success";
              else if (stepNumber === currentStep) state = "active";
              else state = "default";
            }

            return (
              <StepperItem
                key={stepNumber}
                mode={mode}
                position={position}
                state={state}
                textOn={resolvedTextOn}
                step={stepData.step ?? stepNumber}
                title={stepData.title}
                description={stepData.description}
                icon={stepData.icon}
                onClick={onStepChange ? () => onStepChange(stepNumber) : stepData.onClick}
              />
            );
          })}
        </div>
      );
    }

    // Compound children rendering
    const validChildren = Children.toArray(children).filter(isValidElement);
    const totalSteps = validChildren.length;

    return (
      <div
        ref={ref}
        role="list"
        className={cn(isVertical ? "flex flex-col" : "flex w-full items-stretch", className)}
        {...rest}
      >
        {validChildren.map((child, index) => {
          const stepNumber = index + 1;
          const position: StepperPosition =
            index === 0 ? "first" : index === totalSteps - 1 ? "last" : "middle";

          let state: StepperState =
            (child as ReactElement<StepperItemProps>).props.state ?? "default";
          if (!(child as ReactElement<StepperItemProps>).props.state) {
            if (stepNumber < currentStep) state = "success";
            else if (stepNumber === currentStep) state = "active";
            else state = "default";
          }

          return cloneElement(child as ReactElement<StepperItemProps>, {
            mode: (child as ReactElement<StepperItemProps>).props.mode ?? mode,
            position: (child as ReactElement<StepperItemProps>).props.position ?? position,
            state,
            textOn: (child as ReactElement<StepperItemProps>).props.textOn ?? resolvedTextOn,
            step: (child as ReactElement<StepperItemProps>).props.step ?? stepNumber,
            onClick:
              (child as ReactElement<StepperItemProps>).props.onClick ??
              (onStepChange ? () => onStepChange(stepNumber) : undefined),
          });
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
