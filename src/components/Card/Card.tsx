import { cn } from "../../utils/cn";
import type {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from "./Card.types";

export const Card = ({ className, ...props }: CardProps) => (
  <div
    className={cn("rounded-card border-card-border bg-card-bg shadow-card border", className)}
    {...props}
  />
);
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

/** Renders an `<h3>` by default; pass `asChild`-style needs via a different heading level in your markup. */
export const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3
    className={cn(
      "text-card-title-fg text-lg leading-tight font-semibold tracking-tight",
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <p className={cn("text-card-description-fg text-sm leading-relaxed", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div className={cn("flex items-center gap-3 p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";
