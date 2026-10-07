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
      className="relative size-[94px] shrink-0 rounded-[8px] overflow-hidden border border-[#d5d7d9] dark:border-neutral-700 bg-[#f9fafa] dark:bg-neutral-800 group transition-all"
      data-status={status}
      title={file.name ?? (type === "image" ? "Foto Produk" : "Video Produk")}
    >
      {/* Uploading State */}
      {status === "uploading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ffffff]/95 dark:bg-neutral-900/95 p-2 z-10">
          {/* Circular Progress */}
          <div className="relative size-10 flex items-center justify-center mb-1">
            <svg className="size-10 -rotate-90 transform" viewBox="0 0 36 36">
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

          <span className="text-[10px] text-[#686e76] dark:text-neutral-400 font-medium">
            Mengunggah...
          </span>

          {/* Cancel Upload Button */}
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="absolute top-1 right-1 p-0.5 text-[#8c9197] hover:text-[#ee3124] transition-colors rounded-full focus:outline-none cursor-pointer"
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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#ffedf1] dark:bg-red-950/40 p-2 text-center z-10 border border-[#ee3124]/40 rounded-[8px]">
          {renderIcon(<Danger size={24} variant="Bulk" color="#ee3124" className="mb-1" />, 24, "#ee3124")}
          <span className="text-[9px] leading-tight text-[#ee3124] font-medium line-clamp-2 mb-1">
            {file.errorMessage || "Gagal unggah"}
          </span>
          <div className="flex gap-1">
            {onRetry && !disabled && (
              <button
                type="button"
                onClick={() => onRetry(file.id)}
                className="p-1 text-[#686e76] hover:text-[#009ea9] transition-colors cursor-pointer"
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
                className="p-1 text-[#686e76] hover:text-[#ee3124] transition-colors cursor-pointer"
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
              className="size-full object-cover rounded-[8px]"
            />
          ) : (
            <div className="relative size-full bg-[#182958] rounded-[8px] overflow-hidden flex items-center justify-center">
              {file.url ? (
                <video
                  src={file.url}
                  className="size-full object-cover rounded-[8px]"
                  controls={isPlaying}
                  playsInline
                />
              ) : (
                <div className="size-full bg-[#182958] flex items-center justify-center" />
              )}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-[#000000]/40 hover:bg-[#000000]/50 transition-colors cursor-pointer group/play"
                  title="Putar video"
                  aria-label="Putar video"
                >
                  <div className="p-1 rounded-full bg-[#000000]/60 group-hover/play:scale-110 transition-transform flex items-center justify-center text-[#ffffff]">
                    {renderIcon(<PlayCircle size={28} variant="Bulk" color="#ffffff" />, 28, "#ffffff")}
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Primary Badge (First Image) */}
          {isPrimary && type === "image" && (
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-[10px] font-medium leading-none text-[#ffffff] bg-[#009ea9] rounded-[4px] shadow-sm select-none pointer-events-none">
              Utama
            </span>
          )}

          {/* Delete Button (Figma top-right close-circle) */}
          {!disabled && (
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              className="absolute top-1 right-1 p-0.5 rounded-full bg-[#000000]/50 hover:bg-[#ee3124] text-[#ffffff] transition-all shadow-sm focus:outline-none hover:scale-110 cursor-pointer z-20"
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
