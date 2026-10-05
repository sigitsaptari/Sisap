import type { ElementType } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type { TypographyProps, TypographyVariant } from "./Typography.types";

export const typographyVariants = cva("text-typography-fg", {
  variants: {
    variant: {
      h1: "text-4xl font-bold leading-tight tracking-tight",
      h2: "text-3xl font-semibold leading-tight tracking-tight",
      h3: "text-2xl font-semibold leading-tight",
      h4: "text-xl font-semibold leading-tight",
      body: "text-md leading-relaxed",
      small: "text-sm leading-normal",
      muted: "text-sm leading-normal text-typography-fg-muted",
      code: "rounded-typography-code bg-typography-code-bg px-1.5 py-0.5 font-mono text-sm",
    },
  },
  defaultVariants: { variant: "body" },
});

const defaultElement: Record<TypographyVariant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "small",
  muted: "p",
  code: "code",
};

export const Typography = ({
  variant = "body",
  as,
  asChild = false,
  className,
  ...rest
}: TypographyProps) => {
  const Component: ElementType = asChild ? Slot : (as ?? defaultElement[variant]);
  return <Component className={cn(typographyVariants({ variant }), className)} {...rest} />;
};

Typography.displayName = "Typography";
