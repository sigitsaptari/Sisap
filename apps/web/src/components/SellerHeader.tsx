import { Notification, Sms } from "iconsax-react";

export function SellerHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-[80px] w-full items-center justify-between border-b border-[#dee3ed] bg-[#ffffff] px-[24px] py-[12px] select-none">
      {/* Brand Logo (TlLogoFixedSizes 98x55 from Figma) */}
      <div className="flex items-center">
        <div className="flex items-center gap-2.5">
          {/* Official PaDi UMKM Vector Icon */}
          <svg
            width="42"
            height="38"
            viewBox="0 0 44 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-label="Logo PaDi UMKM"
          >
            <path
              d="M16 13V10C16 6.68629 18.6863 4 22 4C25.3137 4 28 6.68629 28 10V13"
              stroke="#182958"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M8 13H36L33.6 35.5C33.45 36.9 32.25 38 30.85 38H13.15C11.75 38 10.55 36.9 10.4 35.5L8 13Z"
              fill="#182958"
            />
            <path
              d="M13 13L22 22L31 13"
              stroke="#009ea9"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <div className="flex items-baseline leading-none">
              <span className="text-[20px] font-extrabold tracking-tight text-[#009ea9]">PaDi</span>
              <span className="ml-1 text-[20px] font-black tracking-tight text-[#182958]">UMKM</span>
            </div>
            <span className="text-[8.5px] font-medium tracking-tight text-[#686e76]">
              Pasar Digital UMKM Indonesia
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Notification, Message, Profile */}
      <div className="flex items-center gap-[24px]">
        <div className="flex items-center gap-[16px]">
          {/* Notification Button with Badge */}
          <div className="relative flex size-[32px] items-center justify-center rounded-[4px] p-[4px] hover:bg-[#f2f4f7] transition-colors cursor-pointer">
            <Notification size={24} variant="Linear" color="#444b55" />
            <div className="absolute -top-[2.5px] -right-[3px] flex h-[16px] min-w-[16px] items-center justify-center rounded-[24px] border border-white bg-[#ee3124] px-[5px]">
              <span className="text-[10px] font-bold leading-[15px] text-white">2</span>
            </div>
          </div>

          {/* SMS / Message Button with Badge */}
          <div className="relative flex size-[32px] items-center justify-center rounded-[4px] p-[4px] hover:bg-[#f2f4f7] transition-colors cursor-pointer">
            <Sms size={24} variant="Linear" color="#444b55" />
            <div className="absolute -top-[2.5px] -right-[3px] flex h-[16px] min-w-[16px] items-center justify-center rounded-[24px] border border-white bg-[#ee3124] px-[5px]">
              <span className="text-[10px] font-bold leading-[15px] text-white">2</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[28px] w-px bg-[#dee3ed]" />

        {/* User Profile Avatar */}
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Profil Penjual"
            className="size-[32px] rounded-full object-cover ring-1 ring-[#dee3ed]"
          />
        </div>
      </div>
    </header>
  );
}
