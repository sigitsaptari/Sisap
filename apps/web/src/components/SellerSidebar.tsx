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
  pyClass = "py-4",
}: NavItemProps) {
  const isActive = activeItem === label;

  return (
    <button
      type="button"
      onClick={() => setActiveItem(label)}
      className={`relative flex w-full cursor-pointer items-center justify-between px-16 text-left transition-colors ${pyClass} ${
        isActive
          ? "bg-surface-base font-medium text-action-primary"
          : "font-normal text-primary hover:bg-bg-canvas"
      }`}
    >
      <div className="flex items-center gap-8">
        <Icon size={20} variant="Bulk" className={isActive ? "text-action-primary" : "text-primary"} />
        <span className="text-xs">{label}</span>
      </div>
      {badge !== undefined && (
        <div className="flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1.5">
          <span className="text-[10px] leading-[15px] font-bold text-white">{badge}</span>
        </div>
      )}
      {isActive && (
        <div className="absolute top-0 left-0 h-7 w-1 rounded-r-sm bg-action-primary" />
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
      { label: "Tambah Produk", icon: BoxAdd, pyClass: "py-8" },
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
    <aside className="flex w-[280px] shrink-0 flex-col border-r border-border-subtle bg-surface-base font-sans select-none">
      {/* Store Header Profile Card (6901:5207) */}
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between p-16">
          <div className="flex items-center gap-12">
            <div className="flex size-32 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-action-primary">
              <Shop size={16} variant="Bulk" className="text-action-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-primary">
                Toko Maju Jaya
              </span>
            </div>
          </div>

          {/* Action Icons: Preview & Share */}
          <div className="flex items-center gap-12 text-placeholder">
            <button
              type="button"
              className="flex size-6 cursor-pointer items-center justify-center transition-colors hover:text-primary"
              title="Lihat Toko"
            >
              <Eye size={20} variant="Bulk" className="text-placeholder" />
            </button>
            <button
              type="button"
              className="flex size-5 cursor-pointer items-center justify-center transition-colors hover:text-primary"
              title="Bagikan Toko"
            >
              <Share size={18} variant="Linear" className="text-placeholder" />
            </button>
          </div>
        </div>

        {/* 1px Divider */}
        <div className="h-px w-full bg-border-subtle" />
      </div>

      {/* Nav Menu Items List (exact Figma paddings and hierarchy) */}
      <nav className="flex flex-1 flex-col gap-8 overflow-y-auto py-12 pb-24">
        {/* Top Items: Dashboard & Chat */}
        <div className="flex flex-col gap-4">
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
          <div key={section.title} className="flex flex-col gap-4 py-4">
            <div className="px-16 py-4">
              <span className="text-sm font-medium text-secondary">
                {section.title}
              </span>
            </div>
            <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4 border-t border-border-subtle pt-8">
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
