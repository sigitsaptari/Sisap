import { useCallback, useState } from "react";

export interface UseDisclosureReturn {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

/** Tiny state helper for overlays (Dialog, Popover, …). */
export function useDisclosure(initial = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(initial);

  const setOpen = useCallback((open: boolean) => setIsOpen(open), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, setOpen, open, close, toggle };
}
