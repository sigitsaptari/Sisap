import { Notification, Sms } from "iconsax-react";

export function SellerHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-[#e7e8e9] bg-[#ffffff] px-6 shadow-xs">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* PaDi UMKM Shopping Bag Logo SVG */}
          <div className="flex items-center gap-2.5">
            <svg
              width="44"
              height="40"
              viewBox="0 0 44 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-label="Logo PaDi UMKM"
            >
              {/* Bag Handle */}
              <path
                d="M16 14V11C16 7.68629 18.6863 5 22 5C25.3137 5 28 7.68629 28 11V14"
                stroke="#182958"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              {/* Bag Body Outer */}
              <path
                d="M8.5 14H35.5L33.2 35.5C33.05 36.9 31.85 38 30.45 38H13.55C12.15 38 10.95 36.9 10.8 35.5L8.5 14Z"
                fill="#182958"
              />
              {/* Cyan Fold Accent */}
              <path
                d="M14 14L22 22L30 14"
                stroke="#009ea9"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col">
              <div className="flex items-baseline leading-none">
                <span className="text-[20px] font-extrabold tracking-tight text-[#009ea9]">PaDi</span>
                <span className="ml-1 text-[20px] font-black tracking-tight text-[#182958]">UMKM</span>
              </div>
              <span className="text-[8.5px] font-medium tracking-wide text-[#686e76]">
                Pasar Digital UMKM Indonesia
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Action Icons: Notification, Message, Profile */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-full text-[#444b55] transition-colors hover:bg-[#f2f4f7] focus:outline-none"
          title="Notifikasi"
          aria-label="Notifikasi (2 baru)"
        >
          <Notification size={22} variant="Linear" color="#444b55" />
          <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-[#ee3124] text-[9px] font-bold text-[#ffffff] ring-2 ring-[#ffffff]">
            2
          </span>
        </button>

        {/* Messages / SMS */}
        <button
          type="button"
          className="relative flex size-10 items-center justify-center rounded-full text-[#444b55] transition-colors hover:bg-[#f2f4f7] focus:outline-none"
          title="Pesan Masuk"
          aria-label="Pesan Masuk (2 baru)"
        >
          <Sms size={22} variant="Linear" color="#444b55" />
          <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-[#ee3124] text-[9px] font-bold text-[#ffffff] ring-2 ring-[#ffffff]">
            2
          </span>
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-[#e7e8e9]" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Avatar Pengguna"
            className="size-9 rounded-full object-cover ring-2 ring-[#009ea9]/30"
          />
        </div>
      </div>
    </header>
  );
}
