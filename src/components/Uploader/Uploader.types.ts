import type { ReactNode } from "react";

export type UploaderFileType = "image" | "video";

export type UploadItemStatus = "uploading" | "success" | "error";

export interface UploaderFile {
  id: string;
  file?: File;
  url: string;
  name?: string;
  size?: number;
  progress?: number;
  status?: UploadItemStatus;
  errorMessage?: string;
}

export interface UploaderProps {
  /**
   * The type of media being uploaded.
   * @default "image"
   */
  type?: UploaderFileType;

  /**
   * Label for the uploader section (e.g. "Foto Produk" or "Video Produk")
   */
  label?: ReactNode;

  /**
   * Whether this uploader is required. Shows red italic "Wajib" indicator.
   * @default false
   */
  required?: boolean;

  /**
   * Maximum number of files allowed.
   * @default 5 for image, 1 for video
   */
  maxFiles?: number;

  /**
   * Maximum file size in Megabytes.
   * @default 5 for image, 10 for video
   */
  maxSizeMb?: number;

  /**
   * HTML input accept string.
   * Defaults to "image/jpeg,image/png,image/jpg" for image, "video/*" for video.
   */
  accept?: string;

  /**
   * List of rules/instructions shown below the uploader.
   */
  helperRules?: ReactNode[];

  /**
   * Controlled file list.
   */
  files?: UploaderFile[];

  /**
   * Default initial files.
   */
  defaultFiles?: UploaderFile[];

  /**
   * Callback invoked when the file list changes.
   */
  onChange?: (files: UploaderFile[]) => void;

  /**
   * Optional custom upload handler.
   */
  onUpload?: (file: File, updateProgress: (pct: number) => void) => Promise<string>;

  /**
   * Automatically simulate upload progress if onUpload is not provided.
   * @default true
   */
  simulateUpload?: boolean;

  /**
   * Whether the uploader is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Optional custom labels for each slot when showing fixed slots (e.g. ["Foto Utama", "Foto 1", ...])
   */
  slotLabels?: string[];

  /**
   * Custom CSS classes.
   */
  className?: string;

  /**
   * ID for accessibility / input linkage.
   */
  id?: string;
}

export interface UploaderItemProps {
  file: UploaderFile;
  type: UploaderFileType;
  isPrimary?: boolean;
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
  disabled?: boolean;
}

export interface UploaderTriggerProps {
  type: UploaderFileType;
  currentCount: number;
  maxFiles: number;
  label?: string;
  onClick: () => void;
  isDragging?: boolean;
  disabled?: boolean;
}
