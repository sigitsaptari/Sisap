import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback fired when the modal should close */
  onClose: () => void;
  /** Modal header title */
  title?: ReactNode;
  /** Modal description text */
  description?: ReactNode;
  /** Modal main content */
  children?: ReactNode;
  /** Optional top illustration / image (e.g. 300x180px illustration) */
  image?: ReactNode;
  /** Modal size variant */
  size?: ModalSize;
  /** Whether to show the top-right close icon button */
  showCloseButton?: boolean;
  /** Whether to show an optional back icon button in the header */
  showBackButton?: boolean;
  /** Callback fired when the back button is clicked */
  onBack?: () => void;
  /** Whether clicking the backdrop overlay closes the modal */
  closeOnClickOutside?: boolean;
  /** Whether pressing the Escape key closes the modal */
  closeOnEscape?: boolean;
  /** Custom footer actions (replaces default Batal/Simpan buttons) */
  footer?: ReactNode;
  /** Primary / confirm button label (defaults to "Simpan") */
  confirmText?: string;
  /** Secondary / cancel button label (defaults to "Batal") */
  cancelText?: string;
  /** Callback fired when the confirm button is clicked */
  onConfirm?: () => void;
  /** Callback fired when the cancel button is clicked (falls back to onClose) */
  onCancel?: () => void;
  /** Whether confirm button is in loading state */
  confirmLoading?: boolean;
  /** Whether confirm button is disabled */
  confirmDisabled?: boolean;
  /** Whether to show the default action footer */
  showFooter?: boolean;
  /** Additional container CSS class */
  className?: string;
  /** Additional overlay CSS class */
  overlayClassName?: string;
  /** Additional content body CSS class */
  contentClassName?: string;
  /** Duration of the Mantine-style open/close animation in ms */
  transitionDuration?: number;
}

export interface ModalHeaderProps {
  children?: ReactNode;
  title?: ReactNode;
  showCloseButton?: boolean;
  showBackButton?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  className?: string;
}

export interface ModalBodyProps {
  children?: ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
  className?: string;
}
