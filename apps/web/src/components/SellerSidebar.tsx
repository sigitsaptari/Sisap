import { useState } from "react";
import {
  Shop,
  Eye,
  Share,
  Category,
  Messages1,
  ReceiptItem,
  Card,
  MoneyChange,
  ExportCurve,
  Box,
  BoxAdd,
  WalletMoney,
  Timer1,
  Judge,
  DocumentFilter,
  Edit2,
  DiscountShape,
  TicketDiscount,
  Star1,
  Brush,
  Setting2,
  ChartSquare,
  ShieldSecurity,
} from "iconsax-react";

export function SellerSidebar() {
  const [activeItem, setActiveItem] = useState("Tambah Produk");

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-[#e7e8e9] bg-[#ffffff] select-none">
      {/* Store Header Card */}
      <div className="flex items-center justify-between border-b border-[#f2f4f7] px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#009ea9]/15 text-[#009ea9]">
            <Shop size={18} variant="Bulk" color="#009ea9" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate text-sm font-bold text-[#444b55]">Toko Maju Jaya</span>
            <span className="text-[11px] text-[#8c9197]">Official Store</span>
          </div>
        </div>

        {/* Store actions */}
        <div className="flex items-center gap-1 shrink-0 text-[#8c9197]">
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md hover:bg-[#f2f4f7] hover:text-[#444b55] transition-colors"
            title="Lihat Toko"
            aria-label="Lihat Toko"
          >
            <Eye size={16} variant="Linear" />
          </button>
          <button
            type="button"
            className="flex size-7 items-center justify-center rounded-md hover:bg-[#f2f4f7] hover:text-[#444b55] transition-colors"
            title="Bagikan Toko"
            aria-label="Bagikan Toko"
          >
            <Share size={16} variant="Linear" />
          </button>
        </div>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4 text-xs font-medium text-[#686e76]">
        {/* Top Single Items */}
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setActiveItem("Dashboard")}
            className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2 transition-colors ${
              activeItem === "Dashboard"
                ? "bg-[#e6f5f6] text-[#009ea9] font-bold"
                : "text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55]"
            }`}
          >
            <Category size={18} variant="Linear" color="currentColor" />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveItem("Chat")}
            className={`flex w-full items-center justify-between rounded-[6px] px-3 py-2 transition-colors ${
              activeItem === "Chat"
                ? "bg-[#e6f5f6] text-[#009ea9] font-bold"
                : "text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55]"
            }`}
          >
            <div className="flex items-center gap-3">
              <Messages1 size={18} variant="Linear" color="currentColor" />
              <span>Chat</span>
            </div>
            <span className="flex size-4 items-center justify-center rounded-full bg-[#ee3124] text-[9px] font-bold text-[#ffffff]">
              2
            </span>
          </button>
        </div>

        {/* Section: Transaksi */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold tracking-wider text-[#8c9197] uppercase">
            Transaksi
          </span>
          <button
            type="button"
            onClick={() => setActiveItem("Pesanan")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <ReceiptItem size={18} variant="Linear" color="currentColor" />
            <span>Pesanan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("PaDi Kasir")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Card size={18} variant="Linear" color="currentColor" />
            <span>PaDi Kasir</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Biaya Transaksi Penjual")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <MoneyChange size={18} variant="Linear" color="currentColor" />
            <span>Biaya Transaksi Penjual</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Export Data Pesanan")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <ExportCurve size={18} variant="Linear" color="currentColor" />
            <span>Export Data Pesanan</span>
          </button>
        </div>

        {/* Section: Produk */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold tracking-wider text-[#8c9197] uppercase">
            Produk
          </span>
          <button
            type="button"
            onClick={() => setActiveItem("Data Produk")}
            className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2 transition-colors ${
              activeItem === "Data Produk"
                ? "bg-[#e6f5f6] text-[#009ea9] font-bold"
                : "text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55]"
            }`}
          >
            <Box size={18} variant="Linear" color="currentColor" />
            <span>Data Produk</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Tambah Produk")}
            className={`flex w-full items-center gap-3 rounded-[6px] px-3 py-2 transition-colors ${
              activeItem === "Tambah Produk"
                ? "bg-[#e6f5f6] text-[#009ea9] font-bold"
                : "text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55]"
            }`}
          >
            <BoxAdd size={18} variant="Bulk" color="#009ea9" />
            <span className="text-[#009ea9]">Tambah Produk</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Tambah Produk Bulk")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <BoxAdd size={18} variant="Linear" color="currentColor" />
            <span>Tambah Produk Bulk</span>
          </button>
        </div>

        {/* Section: Pinjaman */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold tracking-wider text-[#8c9197] uppercase">
            Pinjaman
          </span>
          <button
            type="button"
            onClick={() => setActiveItem("Tersedia")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <WalletMoney size={18} variant="Linear" color="currentColor" />
            <span>Tersedia</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Berlangsung")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Timer1 size={18} variant="Linear" color="currentColor" />
            <span>Berlangsung</span>
          </button>
        </div>

        {/* Section: Tender Kilat */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold tracking-wider text-[#8c9197] uppercase">
            Tender Kilat
          </span>
          <button
            type="button"
            onClick={() => setActiveItem("Daftar")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Judge size={18} variant="Linear" color="currentColor" />
            <span>Daftar</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Data Penawaran")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <DocumentFilter size={18} variant="Linear" color="currentColor" />
            <span>Data Penawaran</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Buat Penawaran")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Edit2 size={18} variant="Linear" color="currentColor" />
            <span>Buat Penawaran</span>
          </button>
        </div>

        {/* Section: Promosi Produk */}
        <div className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold tracking-wider text-[#8c9197] uppercase">
            Promosi Produk
          </span>
          <button
            type="button"
            onClick={() => setActiveItem("Promo Koleksi")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <DiscountShape size={18} variant="Linear" color="currentColor" />
            <span>Promo Koleksi</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Voucher")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <TicketDiscount size={18} variant="Linear" color="currentColor" />
            <span>Voucher</span>
          </button>
        </div>

        {/* Bottom Utility Items */}
        <div className="border-t border-[#f2f4f7] pt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => setActiveItem("Ulasan")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Star1 size={18} variant="Linear" color="currentColor" />
            <span>Ulasan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Dekorasi Toko")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Brush size={18} variant="Linear" color="currentColor" />
            <span>Dekorasi Toko</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Pengaturan")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <Setting2 size={18} variant="Linear" color="currentColor" />
            <span>Pengaturan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Insight Seller")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <ChartSquare size={18} variant="Linear" color="currentColor" />
            <span>Insight Seller</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Bantuan Hukum")}
            className="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[#686e76] hover:bg-[#f9fafa] hover:text-[#444b55] transition-colors"
          >
            <ShieldSecurity size={18} variant="Linear" color="currentColor" />
            <span>Bantuan Hukum</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
