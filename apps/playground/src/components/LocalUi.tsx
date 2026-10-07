import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
} from "react";
import { cn } from "@sisapds/react";

// ==========================================
// Card Components (Playground local container)
// ==========================================
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-border-default bg-bg-surface text-fg-default rounded-xl border shadow-sm transition-colors",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-fg-default leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-fg-muted text-sm", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

// ==========================================
// Dialog Components (Local modal)
// ==========================================
interface DialogContextType {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const DialogContext = createContext<DialogContextType>({ open: false, setOpen: () => {} });

export function Dialog({
  children,
  open: controlledOpen,
}: {
  children: ReactNode;
  open?: boolean;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  return (
    <DialogContext.Provider value={{ open, setOpen: setUncontrolledOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { setOpen } = useContext(DialogContext);
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(true),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export function DialogContent({ className, children }: HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useContext(DialogContext);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "border-border-default bg-bg-surface relative z-10 w-full max-w-lg rounded-xl border p-6 shadow-xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-fg-default text-lg font-semibold", className)} {...props} />;
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-fg-muted text-sm", className)} {...props} />;
}

export function DialogClose({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { setOpen } = useContext(DialogContext);
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(false),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(false)}>
      {children}
    </button>
  );
}

// ==========================================
// Drawer Components (Local slide-over)
// ==========================================
const DrawerContext = createContext<DialogContextType>({ open: false, setOpen: () => {} });

export function Drawer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
}

export function DrawerTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { setOpen } = useContext(DrawerContext);
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(true),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export function DrawerContent({
  className,
  children,
}: HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }) {
  const { open, setOpen } = useContext(DrawerContext);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "border-border-default bg-bg-surface relative z-10 flex h-full w-full max-w-md flex-col border-l shadow-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-2", className)} {...props} />;
}

export function DrawerTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-fg-default text-lg font-semibold", className)} {...props} />;
}

export function DrawerDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-fg-muted text-sm", className)} {...props} />;
}

export function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("border-border-default mt-auto flex gap-2 border-t p-6", className)}
      {...props}
    />
  );
}

export function DrawerClose({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  const { setOpen } = useContext(DrawerContext);
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(false),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(false)}>
      {children}
    </button>
  );
}

// ==========================================
// DropdownMenu Components (Local menu)
// ==========================================
const DropdownContext = createContext<DialogContextType>({ open: false, setOpen: () => {} });

export function DropdownMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactNode;
}) {
  const { open, setOpen } = useContext(DropdownContext);
  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(!open),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(!open)}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ className, children }: HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useContext(DropdownContext);
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        className={cn(
          "border-border-default bg-bg-surface absolute right-0 z-50 mt-2 min-w-48 rounded-lg border p-1 shadow-lg",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function DropdownMenuLabel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-fg-muted px-3 py-1.5 text-xs font-semibold", className)} {...props} />
  );
}

export function DropdownMenuItem({
  className,
  variant,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "destructive" }) {
  const { setOpen } = useContext(DropdownContext);
  return (
    <button
      type="button"
      className={cn(
        "hover:bg-action-ghost-hover flex w-full items-center rounded-md px-3 py-1.5 text-left text-sm transition-colors",
        variant === "destructive"
          ? "text-feedback-danger hover:bg-feedback-danger-bg"
          : "text-fg-default",
        className,
      )}
      onClick={(e) => {
        setOpen(false);
        props.onClick?.(e);
      }}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({ className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-border-default -mx-1 my-1 h-px", className)} />;
}
