import { Stepper, type StepItemData } from "@sisapds/react";

export interface AddProductStepperProps {
  currentStep: number; // 1, 2, 3, 4
  onStepClick: (step: number) => void;
}

const STEPS: StepItemData[] = [
  {
    step: 1,
    title: "Informasi Produk",
    description: "Nama, kategori, dan foto",
  },
  {
    step: 2,
    title: "Harga & Stok",
    description: "Harga jual dan jumlah unit",
  },
  {
    step: 3,
    title: "Pengiriman",
    description: "Dimensi dan Berat",
  },
  {
    step: 4,
    title: "Lainnya",
    description: "Pengaturan tambahan",
  },
];

export function AddProductStepper({ currentStep, onStepClick }: AddProductStepperProps) {
  return (
    <div className="w-[1096px] select-none">
      <Stepper
        currentStep={currentStep}
        onStepChange={onStepClick}
        steps={STEPS}
        mode="horizontal"
        textOn="right"
        className="w-full"
      />
    </div>
  );
}
