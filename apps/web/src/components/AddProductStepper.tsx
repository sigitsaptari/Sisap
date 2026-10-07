export interface AddProductStepperProps {
  currentStep: number; // 1, 2, 3, 4
  onStepClick: (step: number) => void;
}

const STEPS = [
  {
    step: 1,
    title: "Informasi Produk",
    subtitle: "Nama, kategori, dan foto",
  },
  {
    step: 2,
    title: "Harga & Stok",
    subtitle: "Harga jual dan jumlah unit",
  },
  {
    step: 3,
    title: "Pengiriman",
    subtitle: "Dimensi dan Berat",
  },
  {
    step: 4,
    title: "Lainnya",
    subtitle: "Pengaturan tambahan",
  },
];

export function AddProductStepper({ currentStep, onStepClick }: AddProductStepperProps) {
  return (
    <div className="flex w-full items-center justify-between py-2 select-none">
      {STEPS.map((s, idx) => {
        const isCompleted = s.step < currentStep;
        const isActive = s.step === currentStep;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={s.step} className="flex flex-1 items-center">
            {/* Step Item (Circle + Labels) */}
            <button
              type="button"
              onClick={() => onStepClick(s.step)}
              className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
            >
              {/* Circle Indicator */}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isCompleted
                    ? "bg-[#009ea9] text-[#ffffff] shadow-xs"
                    : isActive
                      ? "border-2 border-[#009ea9] bg-[#ffffff] text-[#009ea9] ring-4 ring-[#009ea9]/15"
                      : "border-2 border-[#d5d7d9] bg-[#ffffff] text-[#8c9197] group-hover:border-[#b1b4b8]"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="size-5"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 10.5L8.5 14.5L15.5 6.5"
                      stroke="#ffffff"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span>{s.step}</span>
                )}
              </div>

              {/* Text Description */}
              <div className="flex flex-col">
                <span
                  className={`text-sm leading-tight transition-colors ${
                    isActive
                      ? "font-bold text-[#444b55]"
                      : isCompleted
                        ? "font-semibold text-[#444b55]"
                        : "font-medium text-[#8c9197] group-hover:text-[#686e76]"
                  }`}
                >
                  {s.title}
                </span>
                <span className="text-xs leading-normal text-[#8c9197]">{s.subtitle}</span>
              </div>
            </button>

            {/* Connecting Flow Line */}
            {!isLast && (
              <div
                className={`mx-4 h-[2px] flex-1 transition-colors ${
                  s.step < currentStep ? "bg-[#009ea9]" : "bg-[#e7e8e9]"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
