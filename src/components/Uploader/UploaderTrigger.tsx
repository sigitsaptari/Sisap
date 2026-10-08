import { Gallery, VideoPlay } from "iconsax-react";
import { renderIcon } from "../../utils/icon";
import { cn } from "../../utils/cn";
import type { UploaderTriggerProps } from "./Uploader.types";

export function UploaderTrigger({
  type,
  currentCount,
  maxFiles,
  onClick,
  isDragging = false,
  disabled = false,
}: UploaderTriggerProps) {
  const isImage = type === "image";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative flex size-[94px] shrink-0 flex-col items-center justify-center gap-1 rounded-[8px] border border-dashed p-0 transition-all select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009ea9]/50",
        disabled
          ? "cursor-not-allowed opacity-50 hover:border-[#b1b4b8] hover:bg-transparent active:scale-100"
          : "cursor-pointer",
        isDragging
          ? "scale-[1.02] border-[#009ea9] bg-[#009ea9]/10"
          : "border-[#b1b4b8] bg-transparent hover:border-[#009ea9] hover:bg-[#009ea9]/5 active:scale-[0.98] dark:border-neutral-600",
      )}
      aria-label={isImage ? `Tambah Foto (${currentCount}/${maxFiles})` : "Tambah Video"}
    >
      {/* Icon */}
      <div className="flex size-6 shrink-0 items-center justify-center">
        {isImage
          ? renderIcon(<Gallery size={24} variant="Bulk" color="#009ea9" />, 24, "#009ea9")
          : renderIcon(<VideoPlay size={24} variant="Bulk" color="#009ea9" />, 24, "#009ea9")}
      </div>

      {/* Description */}
      <div className="flex flex-col items-center text-center text-[12px] leading-[18px] font-normal text-[#686e76] dark:text-neutral-400">
        <span>Tambah</span>
        <span className="whitespace-nowrap">
          {isImage ? `Foto (${currentCount}/${maxFiles})` : "Video"}
        </span>
      </div>
    </button>
  );
}
