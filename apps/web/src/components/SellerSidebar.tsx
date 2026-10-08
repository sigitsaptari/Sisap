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

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  activeItem: string;
  setActiveItem: (item: string) => void;
  badge?: number;
  pyClass?: string;
}

function NavItem({
  label,
  icon: Icon,
  activeItem,
  setActiveItem,
  badge,
  pyClass = "py-[4px]",
}: NavItemProps) {
  const isActive = activeItem === label;

  return (
    <button
      type="button"
      onClick={() => setActiveItem(label)}
      className={`relative flex w-full cursor-pointer items-center justify-between px-[16px] text-left transition-colors ${pyClass} ${
        isActive
          ? "bg-white font-medium text-[#009ea9]"
          : "font-normal text-[#444b55] hover:bg-[#f9fafa]"
      }`}
    >
      <div className="flex items-center gap-[8px]">
        <Icon size={20} variant="Bulk" color={isActive ? "#009ea9" : "#444b55"} />
        <span className="text-[12px] leading-[18px]">{label}</span>
      </div>
      {badge !== undefined && (
        <div className="flex h-[16px] min-w-[16px] items-center justify-center rounded-[900px] bg-[#ee3124] px-[5px]">
          <span className="text-[10px] leading-[15px] font-bold text-white">{badge}</span>
        </div>
      )}
      {isActive && (
        <div className="absolute top-0 left-0 h-[28px] w-[4px] rounded-r-[4px] bg-[#0092ac]" />
      )}
    </button>
  );
}

const TOP_ITEMS = [
  { label: "Dashboard", icon: Category, pyClass: "py-[6px]" },
  { label: "Chat", icon: Messages1, badge: 2, pyClass: "py-[6px]" },
];

const MENU_SECTIONS = [
  {
    title: "Transaksi",
    items: [
      { label: "Pesanan", icon: ReceiptItem },
      { label: "PaDi Kasir", icon: Card },
      { label: "Biaya Transaksi Penjual", icon: MoneyChange },
      { label: "Export Data Pesanan", icon: ExportCurve },
    ],
  },
  {
    title: "Produk",
    items: [
      { label: "Data Produk", icon: Box },
      { label: "Tambah Produk", icon: BoxAdd, pyClass: "py-[6px]" },
      { label: "Tambah Produk Bulk", icon: BoxAdd },
    ],
  },
  {
    title: "Pinjaman",
    items: [
      { label: "Tersedia", icon: WalletMoney },
      { label: "Berlangsung", icon: Timer1 },
    ],
  },
  {
    title: "Tender Kilat",
    items: [
      { label: "Daftar", icon: Judge },
      { label: "Data Penawaran", icon: DocumentFilter },
      { label: "Buat Penawaran", icon: Edit2 },
    ],
  },
  {
    title: "Promosi Produk",
    items: [
      { label: "Promo Koleksi", icon: DiscountShape },
      { label: "Voucher", icon: TicketDiscount },
    ],
  },
];

const UTILITY_ITEMS = [
  { label: "Ulasan", icon: Star1 },
  { label: "Dekorasi Toko", icon: Brush },
  { label: "Pengaturan", icon: Setting2 },
  { label: "Insight Seller", icon: ChartSquare },
  { label: "Bantuan Hukum", icon: ShieldSecurity },
];

export function SellerSidebar() {
  const [activeItem, setActiveItem] = useState("Tambah Produk");

  return (
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-[#dee3ed] bg-[#ffffff] font-['Ubuntu'] select-none">
      {/* Store Header Profile Card (6901:5207) */}
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between p-[16px]">
          <div className="flex items-center gap-[12px]">
            <div className="flex size-[32px] shrink-0 items-center justify-center rounded-[99px] bg-[#f1f3f7] text-[#009ea9]">
              <Shop size={16} variant="Bulk" color="#009ea9" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] leading-[21px] font-medium text-[#444b55]">
                Toko Maju Jaya
              </span>
            </div>
          </div>

          {/* Action Icons: Preview & Share */}
          <div className="flex items-center gap-[12px] text-[#8c9197]">
            <button
              type="button"
              className="flex size-[24px] cursor-pointer items-center justify-center transition-colors hover:text-[#444b55]"
              title="Lihat Toko"
            >
              <Eye size={20} variant="Bulk" color="#8c9197" />
            </button>
            <button
              type="button"
              className="flex size-[20px] cursor-pointer items-center justify-center transition-colors hover:text-[#444b55]"
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
          {TOP_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              badge={item.badge}
              pyClass={item.pyClass}
            />
          ))}
        </div>

        {/* Iterated Sections */}
        {MENU_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-[4px] py-[4px]">
            <div className="px-[16px] py-[4px]">
              <span className="text-[14px] leading-[21px] font-medium text-[#686e76]">
                {section.title}
              </span>
            </div>
            <div className="flex flex-col gap-[2px]">
              {section.items.map((item) => (
                <NavItem
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  activeItem={activeItem}
                  setActiveItem={setActiveItem}
                  pyClass={item.pyClass}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Bottom Utility Items */}
        <div className="flex flex-col gap-[2px] border-t border-[#f2f4f7] pt-[8px]">
          {UTILITY_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
}
