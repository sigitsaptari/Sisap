import { useState, useRef, useEffect, useCallback, type DragEvent, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import { UploaderItem } from "./UploaderItem";
import { UploaderTrigger } from "./UploaderTrigger";
import type { UploaderProps, UploaderFile } from "./Uploader.types";

const DEFAULT_IMAGE_RULES = [
  "Wajib memiliki 1 foto produk, maksimal pilih foto hingga 5 gambar.",
  "Resolusi minimal 1000 x 1000 px, ukuran disarankan 1 MB (maksimal 5 MB), format gambar JPG/PNG.",
];

const DEFAULT_VIDEO_RULES = [
  "Video maksimum 10MB",
  "Format MPEG, MP4, AVI, Quicktime, dan lainnya.",
];

const MAX_PROGRESS = 100;

export function Uploader({
  type = "image",
  label,
  required = false,
  maxFiles = type === "image" ? 5 : 1,
  maxSizeMb = type === "image" ? 5 : 10,
  accept = type === "image"
    ? "image/jpeg,image/png,image/jpg"
    : "video/mp4,video/mpeg,video/avi,video/quicktime,video/*",
  helperRules,
  files: controlledFiles,
  defaultFiles = [],
  onChange,
  onUpload,
  simulateUpload = true,
  disabled = false,
  slotLabels,
  className,
  id,
}: UploaderProps) {
  const [internalFiles, setInternalFiles] = useState<UploaderFile[]>(defaultFiles);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = controlledFiles !== undefined ? controlledFiles : internalFiles;

  // Active uploads map to manage interval timers per file id
  const activeUploadsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());

  // Track latest files and onChange callback
  const latestFilesRef = useRef(files);
  useEffect(() => {
    latestFilesRef.current = files;
  }, [files]);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Clean up object URLs and active timers on unmount
  useEffect(() => {
    return () => {
      activeUploadsRef.current.forEach((intervalId) => clearInterval(intervalId));
      activeUploadsRef.current.clear();
      internalFiles.forEach((f) => {
        if (f.url && f.url.startsWith("blob:")) {
          URL.revokeObjectURL(f.url);
        }
      });
    };
  }, [internalFiles]);

  const updateFiles = useCallback(
    (newFiles: UploaderFile[]) => {
      latestFilesRef.current = newFiles;
      if (controlledFiles === undefined) {
        setInternalFiles(newFiles);
      }
      onChangeRef.current?.(newFiles);
    },
    [controlledFiles],
  );

  const updateFileItem = useCallback(
    (id: string, patch: Partial<UploaderFile>) => {
      const nextList = latestFilesRef.current.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      );
      latestFilesRef.current = nextList;
      if (controlledFiles === undefined) {
        setInternalFiles(nextList);
      }
      onChangeRef.current?.(nextList);
    },
    [controlledFiles],
  );

  const processUpload = useCallback(
    (fileItem: UploaderFile, rawFile: File) => {
      // Clear any prior timer for this file
      if (activeUploadsRef.current.has(fileItem.id)) {
        clearInterval(activeUploadsRef.current.get(fileItem.id)!);
        activeUploadsRef.current.delete(fileItem.id);
      }

      if (onUpload) {
        onUpload(rawFile, (progressPct) => {
          updateFileItem(fileItem.id, { progress: progressPct });
        })
          .then((resultUrl) => {
            updateFileItem(fileItem.id, {
              url: typeof resultUrl === "string" ? resultUrl : fileItem.url,
              status: "success",
              progress: MAX_PROGRESS,
            });
          })
          .catch((err) => {
            updateFileItem(fileItem.id, {
              status: "error",
              errorMessage: err instanceof Error ? err.message : "Gagal mengunggah",
            });
          });
      } else if (simulateUpload) {
        // Realistic simulated upload
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.floor(Math.random() * 20) + 12;
          if (currentProgress >= MAX_PROGRESS) {
            currentProgress = MAX_PROGRESS;
            clearInterval(interval);
            activeUploadsRef.current.delete(fileItem.id);
            updateFileItem(fileItem.id, { progress: MAX_PROGRESS, status: "success" });
          } else {
            updateFileItem(fileItem.id, { progress: currentProgress });
          }
        }, 200);
        activeUploadsRef.current.set(fileItem.id, interval);
      }
    },
    [onUpload, simulateUpload, updateFileItem],
  );

  const handleFilesAdded = useCallback(
    (rawFiles: FileList | File[]) => {
      const remainingSlots = maxFiles - files.length;
      if (remainingSlots <= 0) return;

      const fileArray = Array.from(rawFiles).slice(0, remainingSlots);
      const newItems: { item: UploaderFile; raw: File }[] = [];

      fileArray.forEach((raw) => {
        const id = `file-${Date.now()}-${crypto.randomUUID()}`;
        const sizeMb = raw.size / (1024 * 1024);

        if (sizeMb > maxSizeMb) {
          newItems.push({
            item: {
              id,
              file: raw,
              url: "",
              name: raw.name,
              size: raw.size,
              status: "error",
              errorMessage: `Ukuran melebihi ${maxSizeMb}MB`,
            },
            raw,
          });
          return;
        }

        const previewUrl = URL.createObjectURL(raw);
        newItems.push({
          item: {
            id,
            file: raw,
            url: previewUrl,
            name: raw.name,
            size: raw.size,
            progress: 0,
            status: "uploading",
          },
          raw,
        });
      });

      const updated = [...files, ...newItems.map((n) => n.item)];
      updateFiles(updated);

      // Start upload process for valid items
      newItems.forEach(({ item, raw }) => {
        if (item.status === "uploading") {
          processUpload(item, raw);
        }
      });
    },
    [files, maxFiles, maxSizeMb, processUpload, updateFiles],
  );

  const handleRemove = useCallback(
    (id: string) => {
      if (activeUploadsRef.current.has(id)) {
        clearInterval(activeUploadsRef.current.get(id)!);
        activeUploadsRef.current.delete(id);
      }
      const target = latestFilesRef.current.find((f) => f.id === id);
      if (target?.url && target.url.startsWith("blob:")) {
        URL.revokeObjectURL(target.url);
      }
      const next = latestFilesRef.current.filter((f) => f.id !== id);
      updateFiles(next);
    },
    [updateFiles],
  );

  const handleRetry = useCallback(
    (id: string) => {
      const target = latestFilesRef.current.find((f) => f.id === id);
      if (!target || !target.file) return;

      const updated = latestFilesRef.current.map((f) =>
        f.id === id
          ? {
              ...f,
              status: "uploading" as const,
              progress: 0,
              errorMessage: undefined,
              url: f.url || URL.createObjectURL(target.file!),
            }
          : f,
      );
      updateFiles(updated);
      processUpload(target, target.file);
    },
    [processUpload, updateFiles],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(e.target.files);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = "";
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && files.length < maxFiles) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled || files.length >= maxFiles) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const defaultLabel = type === "image" ? "Foto Produk" : "Video Produk";
  const displayLabel = label !== undefined ? label : defaultLabel;
  const rules = helperRules || (type === "image" ? DEFAULT_IMAGE_RULES : DEFAULT_VIDEO_RULES);

  return (
    <div
      className={cn("flex w-full flex-col gap-8", className)}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header Label */}
      {displayLabel && (
        <div className="flex items-center gap-4">
          <span className="text-[14px] leading-[21px] font-medium text-primary">
            {displayLabel}
          </span>
          {required && (
            <span className="text-[12px] leading-[18px] font-normal text-error italic">
              Wajib
            </span>
          )}
        </div>
      )}

      {/* Upload Items & Trigger Row */}
      <div className="flex w-full flex-col gap-16">
        <div className="flex min-h-[94px] flex-wrap items-start gap-12">
          {slotLabels && slotLabels.length > 0 ? (
            // Fixed slots mode (e.g. 5 slots for photos or 1 slot for video)
            Array.from({ length: maxFiles }).map((_, idx) => {
              const file = files[idx];
              if (file) {
                return (
                  <UploaderItem
                    key={file.id}
                    file={file}
                    type={type}
                    isPrimary={idx === 0 && type === "image"}
                    onRemove={handleRemove}
                    onRetry={handleRetry}
                    disabled={disabled}
                  />
                );
              }
              return (
                <UploaderTrigger
                  key={`slot-${idx}`}
                  type={type}
                  currentCount={files.length}
                  maxFiles={maxFiles}
                  label={slotLabels[idx] || (type === "image" ? `Foto ${idx}` : "Tambah Video")}
                  onClick={() => inputRef.current?.click()}
                  isDragging={isDragging}
                  disabled={disabled}
                />
              );
            })
          ) : (
            // Dynamic mode (backward-compatible)
            <>
              {files.map((file, idx) => (
                <UploaderItem
                  key={file.id}
                  file={file}
                  type={type}
                  isPrimary={idx === 0 && type === "image"}
                  onRemove={handleRemove}
                  onRetry={handleRetry}
                  disabled={disabled}
                />
              ))}

              {/* Upload Trigger Button */}
              {files.length < maxFiles && (
                <UploaderTrigger
                  type={type}
                  currentCount={files.length}
                  maxFiles={maxFiles}
                  onClick={() => inputRef.current?.click()}
                  isDragging={isDragging}
                  disabled={disabled}
                />
              )}
            </>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          disabled={disabled}
          className="hidden"
          onChange={handleInputChange}
          tabIndex={-1}
          aria-hidden="true"
        />

        {/* Helper Rules List */}
        {rules && rules.length > 0 && (
          <ul className="ms-[21px] flex list-disc flex-col gap-0 text-[14px] leading-[21px] text-secondary">
            {rules.map((rule, idx) => (
              <li key={idx} className="marker:text-secondary">
                {rule}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
