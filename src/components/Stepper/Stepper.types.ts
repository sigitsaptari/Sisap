import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type StepperMode = "horizontal" | "vertical" | "Horizontal" | "Vertical";
export type StepperPosition = "first" | "middle" | "last" | "First" | "Middle" | "Last";
export type StepperState = "default" | "active" | "success" | "Default" | "Active" | "Success";
export type StepperTextOn = "bottom" | "right" | "Bottom" | "Right";

export interface StepperItemProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Mode orientation of the step (horizontal or vertical) */
  mode?: StepperMode;
  /** Position in sequence (first, middle, last) */
  position?: StepperPosition;
  /** Visual state of the step (default, active, success) */
  state?: StepperState;
  /** Placement of label text relative to indicator (bottom or right) */
  textOn?: StepperTextOn;
  /** Step number displayed inside indicator */
  step?: number | string;
  /** Title of the step */
  title?: ReactNode;
  /** Description caption of the step */
  description?: ReactNode;
  /** Custom icon inside the indicator */
  icon?: ReactNode;
  /** Interactive callback when step is clicked */
  onClick?: () => void;
}

export interface StepItemData {
  title: ReactNode;
  description?: ReactNode;
  step?: number | string;
  icon?: ReactNode;
  state?: StepperState;
  onClick?: () => void;
}

export interface StepperProps extends ComponentPropsWithoutRef<"div"> {
  /** 1-based index of current active step */
  currentStep?: number;
  /** Mode orientation of the stepper */
  mode?: StepperMode;
  /** Placement of label text relative to indicator */
  textOn?: StepperTextOn;
  /** List of step item data (data-driven) */
  steps?: StepItemData[];
  /** Callback triggered when a step is clicked */
  onStepChange?: (stepIndex: number) => void;
  /** Compound children (Step / StepperItem) */
  children?: ReactNode;
}
