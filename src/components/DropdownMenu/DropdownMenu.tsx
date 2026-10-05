import * as MenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";
import type {
  DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuLabelProps,
  DropdownMenuSeparatorProps,
} from "./DropdownMenu.types";

export const DropdownMenu = MenuPrimitive.Root;
export const DropdownMenuTrigger = MenuPrimitive.Trigger;
export const DropdownMenuGroup = MenuPrimitive.Group;
export const DropdownMenuPortal = MenuPrimitive.Portal;

export const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  ref,
  ...props
}: DropdownMenuContentProps) => (
  <MenuPrimitive.Portal>
    <MenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "rounded-dropdown-menu border-dropdown-menu-border bg-dropdown-menu-bg shadow-dropdown-menu motion-safe:data-[state=open]:animate-fade-in motion-safe:data-[state=closed]:animate-fade-out z-(--ds-z-index-dropdown) min-w-40 overflow-hidden border p-1 outline-none",
        className,
      )}
      {...props}
    />
  </MenuPrimitive.Portal>
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const dropdownMenuItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-dropdown-menu-item-bg-highlight data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "text-dropdown-menu-item-fg",
        danger: "text-dropdown-menu-item-danger-fg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export const DropdownMenuItem = ({ variant, className, ref, ...props }: DropdownMenuItemProps) => (
  <MenuPrimitive.Item
    ref={ref}
    className={cn(dropdownMenuItemVariants({ variant }), className)}
    {...props}
  />
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = ({
  className,
  children,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(dropdownMenuItemVariants(), "pl-8", className)}
    {...props}
  >
    <span className="absolute left-2 inline-flex size-4 items-center justify-center">
      <MenuPrimitive.ItemIndicator>
        <Check className="size-4" aria-hidden="true" />
      </MenuPrimitive.ItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
);
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuLabel = ({ className, ref, ...props }: DropdownMenuLabelProps) => (
  <MenuPrimitive.Label
    ref={ref}
    className={cn("text-dropdown-menu-label-fg px-2 py-1.5 text-xs font-medium", className)}
    {...props}
  />
);
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = ({ className, ref, ...props }: DropdownMenuSeparatorProps) => (
  <MenuPrimitive.Separator
    ref={ref}
    className={cn("bg-dropdown-menu-separator-bg -mx-1 my-1 h-px", className)}
    {...props}
  />
);
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";
