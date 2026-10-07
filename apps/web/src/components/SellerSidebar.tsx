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
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#dee3ed] bg-[#ffffff] select-none font-['Ubuntu']">
      {/* Store Header Profile Card (6901:5207) */}
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between p-[16px] w-full">
          <div className="flex items-center gap-[12px]">
            <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[99px] bg-[#f1f3f7] text-[#009ea9]">
              <Shop size={16} variant="Bulk" color="#009ea9" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-[14px] leading-[21px] text-[#444b55]">
                Toko Maju Jaya
              </span>
            </div>
          </div>

          {/* Action Icons: Preview & Share */}
          <div className="flex items-center gap-[12px] text-[#8c9197]">
            <button
              type="button"
              className="flex size-[24px] items-center justify-center hover:text-[#444b55] transition-colors cursor-pointer"
              title="Lihat Toko"
            >
              <Eye size={20} variant="Bulk" color="#8c9197" />
            </button>
            <button
              type="button"
              className="flex size-[20px] items-center justify-center hover:text-[#444b55] transition-colors cursor-pointer"
              title="Bagikan Toko"
            >
              <Share size={18} variant="Linear" color="#8c9197" />
            </button>
          </div>
        </div>

        {/* 1px Divider */}
        <div className="h-px w-full bg-[#dee3ed]" />
      </div>

      {/* Nav Menu Items List (exact Figma paddings and hierarchy) */}
      <nav className="flex flex-1 flex-col gap-[8px] overflow-y-auto py-[12px] pb-[24px]">
        {/* Top Items: Dashboard & Chat */}
        <div className="flex flex-col gap-[4px]">
          <button
            type="button"
            onClick={() => setActiveItem("Dashboard")}
            className={`relative flex w-full items-center gap-[8px] px-[16px] py-[6px] text-left transition-colors cursor-pointer ${
              activeItem === "Dashboard"
                ? "text-[#009ea9] font-medium"
                : "text-[#444b55] hover:bg-[#f9fafa] font-normal"
            }`}
          >
            <Category size={20} variant="Bulk" color={activeItem === "Dashboard" ? "#009ea9" : "#444b55"} />
            <span className="text-[12px] leading-[18px]">Dashboard</span>
            {activeItem === "Dashboard" && (
              <div className="absolute left-0 top-0 h-[28px] w-[4px] rounded-r-[4px] bg-[#0092ac]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveItem("Chat")}
            className={`relative flex w-full items-center justify-between px-[16px] py-[6px] text-left transition-colors cursor-pointer ${
              activeItem === "Chat"
                ? "text-[#009ea9] font-medium"
                : "text-[#444b55] hover:bg-[#f9fafa] font-normal"
            }`}
          >
            <div className="flex items-center gap-[8px]">
              <Messages1 size={20} variant="Bulk" color={activeItem === "Chat" ? "#009ea9" : "#444b55"} />
              <span className="text-[12px] leading-[18px]">Chat</span>
            </div>
            <div className="flex h-[16px] min-w-[16px] items-center justify-center rounded-[900px] bg-[#ee3124] px-[5px]">
              <span className="text-[10px] font-bold leading-[15px] text-white">2</span>
            </div>
            {activeItem === "Chat" && (
              <div className="absolute left-0 top-0 h-[28px] w-[4px] rounded-r-[4px] bg-[#0092ac]" />
            )}
          </button>
        </div>

        {/* Section: Transaksi */}
        <div className="flex flex-col gap-[4px] py-[4px]">
          <div className="px-[16px] py-[4px]">
            <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
              Transaksi
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => setActiveItem("Pesanan")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <ReceiptItem size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Pesanan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("PaDi Kasir")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <Card size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">PaDi Kasir</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Biaya Transaksi Penjual")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <MoneyChange size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Biaya Transaksi Penjual</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Export Data Pesanan")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <ExportCurve size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Export Data Pesanan</span>
            </button>
          </div>
        </div>

        {/* Section: Produk */}
        <div className="flex flex-col gap-[4px] py-[4px]">
          <div className="px-[16px] py-[4px]">
            <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
              Produk
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => setActiveItem("Data Produk")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <Box size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Data Produk</span>
            </button>

            {/* Tambah Produk (Active Item with exact Figma #0092ac indicator) */}
            <button
              type="button"
              onClick={() => setActiveItem("Tambah Produk")}
              className="relative flex w-full items-center gap-[8px] px-[16px] py-[6px] text-[#009ea9] font-medium cursor-pointer bg-white"
            >
              <BoxAdd size={20} variant="Bulk" color="#009ea9" />
              <span className="text-[12px] leading-[18px] text-[#009ea9]">
                Tambah Produk
              </span>
              <div className="absolute left-0 top-0 h-[28px] w-[4px] rounded-r-[4px] bg-[#0092ac]" />
            </button>

            <button
              type="button"
              onClick={() => setActiveItem("Tambah Produk Bulk")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <BoxAdd size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Tambah Produk Bulk</span>
            </button>
          </div>
        </div>

        {/* Section: Pinjaman */}
        <div className="flex flex-col gap-[4px] py-[4px]">
          <div className="px-[16px] py-[4px]">
            <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
              Pinjaman
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => setActiveItem("Tersedia")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <WalletMoney size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Tersedia</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Berlangsung")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <Timer1 size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Berlangsung</span>
            </button>
          </div>
        </div>

        {/* Section: Tender Kilat */}
        <div className="flex flex-col gap-[4px] py-[4px]">
          <div className="px-[16px] py-[4px]">
            <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
              Tender Kilat
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => setActiveItem("Daftar")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <Judge size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Daftar</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Data Penawaran")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <DocumentFilter size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Data Penawaran</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Buat Penawaran")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <Edit2 size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Buat Penawaran</span>
            </button>
          </div>
        </div>

        {/* Section: Promosi Produk */}
        <div className="flex flex-col gap-[4px] py-[4px]">
          <div className="px-[16px] py-[4px]">
            <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
              Promosi Produk
            </span>
          </div>
          <div className="flex flex-col gap-[2px]">
            <button
              type="button"
              onClick={() => setActiveItem("Promo Koleksi")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <DiscountShape size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Promo Koleksi</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveItem("Voucher")}
              className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
            >
              <TicketDiscount size={20} variant="Bulk" color="#444b55" />
              <span className="text-[12px] leading-[18px]">Voucher</span>
            </button>
          </div>
        </div>

        {/* Bottom Utility Items */}
        <div className="flex flex-col gap-[2px] pt-[8px] border-t border-[#f2f4f7]">
          <button
            type="button"
            onClick={() => setActiveItem("Ulasan")}
            className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
          >
            <Star1 size={20} variant="Bulk" color="#444b55" />
            <span className="text-[12px] leading-[18px]">Ulasan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Dekorasi Toko")}
            className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
          >
            <Brush size={20} variant="Bulk" color="#444b55" />
            <span className="text-[12px] leading-[18px]">Dekorasi Toko</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Pengaturan")}
            className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
          >
            <Setting2 size={20} variant="Bulk" color="#444b55" />
            <span className="text-[12px] leading-[18px]">Pengaturan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Insight Seller")}
            className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
          >
            <ChartSquare size={20} variant="Bulk" color="#444b55" />
            <span className="text-[12px] leading-[18px]">Insight Seller</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveItem("Bantuan Hukum")}
            className="flex w-full items-center gap-[8px] px-[16px] py-[4px] text-[#444b55] hover:bg-[#f9fafa] cursor-pointer font-normal"
          >
            <ShieldSecurity size={20} variant="Bulk" color="#444b55" />
            <span className="text-[12px] leading-[18px]">Bantuan Hukum</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
