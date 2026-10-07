import { TickCircle } from "iconsax-react";
import { Button } from "@sisapds/react";

interface PublishSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: {
    name: string;
    category: string;
    price: string;
    stock: string;
    imageUrl?: string;
  };
  onReset: () => void;
}

export function PublishSuccessModal({
  isOpen,
  onClose,
  productData,
  onReset,
}: PublishSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-[16px] bg-[#ffffff] p-6 text-center shadow-2xl border border-[#e7e8e9] animate-in fade-in zoom-in-95 duration-200">
        {/* Success Icon */}
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#edf7ee] text-[#25974c]">
          <TickCircle size={44} variant="Bulk" color="#25974c" />
        </div>

        <h3 className="text-xl font-bold text-[#444b55]">Produk Berhasil Diterbitkan!</h3>
        <p className="mt-1 text-sm text-[#686e76]">
          Produk Anda kini telah aktif dan dapat dicari serta dibeli oleh ribuan pembeli BUMN di katalog PaDi UMKM.
        </p>

        {/* Product Summary Card */}
        <div className="my-5 flex items-center gap-3.5 rounded-[10px] border border-[#e7e8e9] bg-[#f9fafa] p-3 text-left">
          {productData.imageUrl ? (
            <img
              src={productData.imageUrl}
              alt={productData.name}
              className="size-16 rounded-[8px] object-cover shrink-0 border border-[#d5d7d9]"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-[8px] bg-[#dee3ed] text-[#8c9197] font-bold text-xs">
              Foto
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="line-clamp-1 font-bold text-sm text-[#444b55]">
              {productData.name || "MacBook Pro M5 14-Inch 16/512GB"}
            </span>
            <span className="text-xs text-[#8c9197]">{productData.category || "Elektronik & Gadget"}</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#009ea9]">
                Rp {productData.price || "1.000.000"}
              </span>
              <span className="text-[11px] text-[#686e76]">• Stok: {productData.stock || "100"}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => {
              onReset();
              onClose();
            }}
          >
            Tambah Produk Lainnya
          </Button>
          <Button variant="outline" size="md" className="w-full" onClick={onClose}>
            Lihat di Halaman Produk
          </Button>
        </div>
      </div>
    </div>
  );
}
