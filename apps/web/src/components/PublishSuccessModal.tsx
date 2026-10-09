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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-md rounded-modal border border-border-default bg-surface-base p-6 text-center shadow-2xl duration-200">
        {/* Success Icon */}
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-circle bg-feedback-success-bg text-feedback-success">
          <TickCircle size={44} variant="Bulk" className="text-feedback-success" />
        </div>

        <h3 className="text-xl font-bold text-primary">Produk Berhasil Diterbitkan!</h3>
        <p className="mt-1 text-sm text-secondary">
          Produk Anda kini telah aktif dan dapat dicari serta dibeli oleh ribuan pembeli BUMN di
          katalog PaDi UMKM.
        </p>

        {/* Product Summary Card */}
        <div className="my-20 flex items-center gap-12 rounded-card border border-border-default bg-bg-canvas p-12 text-left">
          {productData.imageUrl ? (
            <img
              src={productData.imageUrl}
              alt={productData.name}
              className="size-16 shrink-0 rounded-image border border-border-primary object-cover"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-image bg-border-subtle text-xs font-bold text-placeholder">
              Foto
            </div>
          )}
          <div className="flex min-w-0 flex-col">
            <span className="line-clamp-1 text-sm font-bold text-primary">
              {productData.name || "MacBook Pro M5 14-Inch 16/512GB"}
            </span>
            <span className="text-xs text-placeholder">
              {productData.category || "Elektronik & Gadget"}
            </span>
            <div className="mt-4 flex items-center gap-8">
              <span className="text-sm font-extrabold text-action-primary">
                Rp {productData.price || "1.000.000"}
              </span>
              <span className="text-xs text-secondary">
                • Stok: {productData.stock || "100"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-8">
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
