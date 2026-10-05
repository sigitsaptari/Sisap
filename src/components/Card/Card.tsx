import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./Card.types";

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-card border-card-border bg-card-bg shadow-card border", className)}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-card-title-fg text-lg leading-tight font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-card-description-fg text-sm leading-relaxed", className)}
      {...props}
    />
  ),
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
