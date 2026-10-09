import { useState } from "react";
import { CloseCircle, PlayCircle, Refresh2, Danger } from "iconsax-react";
import { renderIcon } from "../../utils/icon";
import type { UploaderItemProps } from "./Uploader.types";

export function UploaderItem({
  file,
  type,
  isPrimary = false,
  onRemove,
  onRetry,
  disabled = false,
}: UploaderItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const status = file.status ?? "success";
  const progress = Math.min(100, Math.max(0, file.progress ?? 0));

  return (
    <div
      className="group relative size-[94px] shrink-0 overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-[#f9fafa] transition-all dark:border-neutral-700 dark:bg-neutral-800"
      data-status={status}
      title={file.name ?? (type === "image" ? "Foto Produk" : "Video Produk")}
    >
      {/* Uploading State */}
      {status === "uploading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#ffffff]/95 p-8 dark:bg-neutral-900/95">
          {/* Circular Progress */}
          <div className="relative mb-4 flex size-40 items-center justify-center">
            <svg className="size-40 -rotate-90 transform" viewBox="0 0 36 36">
              <path
                className="text-[#e7e8e9] dark:text-neutral-700"
                stroke="currentColor"
                strokeWidth="3.5"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#009ea9] transition-all duration-300 ease-out"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray={`${progress}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[10px] font-semibold text-[#444b55] dark:text-neutral-200">
              {Math.round(progress)}%
            </span>
          </div>

          <span className="text-[10px] font-medium text-[#686e76] dark:text-neutral-400">
            Mengunggah...
          </span>

          {/* Cancel Upload Button */}
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="absolute top-1 right-1 cursor-pointer rounded-full p-0.5 text-[#8c9197] transition-colors hover:text-[#ee3124] focus:outline-none"
              title="Batal unggah"
              aria-label="Batal unggah"
            >
              {renderIcon(<CloseCircle size={18} variant="Bulk" color="#ee3124" />, 18, "#ee3124")}
            </button>
          )}
        </div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[8px] border border-[#ee3124]/40 bg-[#ffedf1] p-2 text-center dark:bg-red-950/40">
          {renderIcon(
            <Danger size={24} variant="Bulk" color="#ee3124" className="mb-1" />,
            24,
            "#ee3124",
          )}
          <span className="mb-1 line-clamp-2 text-[9px] leading-tight font-medium text-[#ee3124]">
            {file.errorMessage || "Gagal unggah"}
          </span>
          <div className="flex gap-1">
            {onRetry && !disabled && (
              <button
                type="button"
                onClick={() => onRetry(file.id)}
                className="cursor-pointer p-1 text-[#686e76] transition-colors hover:text-[#009ea9]"
                title="Coba lagi"
                aria-label="Coba lagi"
              >
                {renderIcon(<Refresh2 size={14} color="#009ea9" />, 14, "#009ea9")}
              </button>
            )}
            {!disabled && (
              <button
                type="button"
                onClick={() => onRemove(file.id)}
                className="cursor-pointer p-1 text-[#686e76] transition-colors hover:text-[#ee3124]"
                title="Hapus"
                aria-label="Hapus"
              >
                {renderIcon(<CloseCircle size={14} color="#ee3124" />, 14, "#ee3124")}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Success / Loaded Media */}
      {status === "success" && (
        <>
          {type === "image" ? (
            <img
              src={file.url}
              alt={file.name ?? "Foto Produk"}
              className="size-full rounded-[8px] object-cover"
            />
          ) : (
            <div className="relative flex size-full items-center justify-center overflow-hidden rounded-[8px] bg-[#182958]">
              {file.url ? (
                <video
                  src={file.url}
                  className="size-full rounded-[8px] object-cover"
                  controls={isPlaying}
                  playsInline
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[#182958]" />
              )}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group/play absolute inset-0 flex cursor-pointer items-center justify-center bg-[#000000]/40 transition-colors hover:bg-[#000000]/50"
                  title="Putar video"
                  aria-label="Putar video"
                >
                  <div className="flex items-center justify-center rounded-full bg-[#000000]/60 p-1 text-[#ffffff] transition-transform group-hover/play:scale-110">
                    {renderIcon(
                      <PlayCircle size={28} variant="Bulk" color="#ffffff" />,
                      28,
                      "#ffffff",
                    )}
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Primary Badge (First Image) */}
          {isPrimary && type === "image" && (
            <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-[4px] bg-[#009ea9] px-1.5 py-0.5 text-[10px] leading-none font-medium text-[#ffffff] shadow-sm select-none">
              Utama
            </span>
          )}

          {/* Delete Button (Figma top-right close-circle) */}
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="absolute top-1 right-1 z-20 cursor-pointer rounded-full bg-[#000000]/50 p-0.5 text-[#ffffff] shadow-sm transition-all hover:scale-110 hover:bg-[#ee3124] focus:outline-none"
              title="Hapus file"
              aria-label="Hapus file"
            >
              {renderIcon(<CloseCircle size={18} variant="Bulk" color="#ffffff" />, 18, "#ffffff")}
            </button>
          )}
        </>
      )}
    </div>
  );
}
