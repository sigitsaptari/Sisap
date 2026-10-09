import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Stepper, StepperItem } from "./Stepper";
import type { StepperPosition, StepperState } from "./Stepper.types";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    currentStep: 2,
    mode: "horizontal",
    textOn: "bottom",
  },
  argTypes: {
    mode: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    textOn: {
      control: "radio",
      options: ["bottom", "right"],
    },
    currentStep: {
      control: { type: "number", min: 1, max: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const sampleSteps = [
  { title: "Verifikasi Berkas", description: "Upload dokumen legalitas" },
  { title: "Review Tim Kurasi", description: "Pengecekan spesifikasi barang" },
  { title: "Terbitkan Kontrak", description: "Penandatanganan SPK online" },
  { title: "Pencairan Dana", description: "Transfer ke rekening vendor" },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl p-4">
      <Stepper {...args} steps={sampleSteps} />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [current, setCurrent] = useState(2);
    return (
      <div className="w-full max-w-4xl space-y-8 p-4">
        <Stepper currentStep={current} onStepChange={setCurrent} steps={sampleSteps} />
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            disabled={current <= 1}
            onClick={() => setCurrent((c) => Math.max(1, c - 1))}
          >
            Sebelumnya
          </Button>
          <Button
            variant="primary"
            disabled={current >= sampleSteps.length}
            onClick={() => setCurrent((c) => Math.min(sampleSteps.length, c + 1))}
          >
            Langkah Berikutnya
          </Button>
          <span className="text-sm text-neutral-500">
            Langkah aktif: {current} dari {sampleSteps.length}
          </span>
        </div>
      </div>
    );
  },
};

export const HorizontalTextRight: Story = {
  render: () => (
    <div className="w-full max-w-4xl p-4">
      <Stepper currentStep={2} mode="horizontal" textOn="right" steps={sampleSteps.slice(0, 3)} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => {
    const [current, setCurrent] = useState(2);
    return (
      <div className="max-w-md p-4">
        <Stepper
          currentStep={current}
          mode="vertical"
          onStepChange={setCurrent}
          steps={sampleSteps}
        />
      </div>
    );
  },
};

export const FigmaMatrix: Story = {
  name: "Figma Matrix (82763:3220)",
  render: () => {
    const states: StepperState[] = ["Default", "Active", "Success"];
    const positions: StepperPosition[] = ["First", "Middle", "Last"];

    return (
      <div className="space-y-12 p-4">
        <div>
          <h3 className="text-lg font-bold text-primary">
            Figma PaDi DS v3.0 Stepper Matrix — Node 82763:3220
          </h3>
          <p className="text-sm text-secondary">
            Representasi lengkap semua variasi: State (Default, Active, Success) × Position (First,
            Middle, Last) × Mode (Horizontal, Vertical) × Text On (Bottom, Right).
          </p>
        </div>

        {/* 1. Horizontal - Text On Bottom */}
        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h4 className="mb-4 font-semibold text-action-primary">Mode: Horizontal — Text On: Bottom</h4>
          <div className="space-y-6">
            {states.map((st) => (
              <div key={st}>
                <span className="mb-2 block text-xs font-semibold text-neutral-500 uppercase">
                  State: {st}
                </span>
                <div className="flex w-full max-w-2xl items-start">
                  {positions.map((pos, idx) => (
                    <StepperItem
                      key={pos}
                      mode="Horizontal"
                      position={pos}
                      state={st}
                      textOn="Bottom"
                      step={idx + 1}
                      title="Title"
                      description="Description"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Horizontal - Text On Right */}
        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h4 className="mb-4 font-semibold text-action-primary">Mode: Horizontal — Text On: Right</h4>
          <div className="space-y-6">
            {states.map((st) => (
              <div key={st}>
                <span className="mb-2 block text-xs font-semibold text-neutral-500 uppercase">
                  State: {st}
                </span>
                <div className="flex w-full max-w-3xl items-center">
                  {positions.map((pos, idx) => (
                    <StepperItem
                      key={pos}
                      mode="Horizontal"
                      position={pos}
                      state={st}
                      textOn="Right"
                      step={idx + 1}
                      title="Title"
                      description="Description"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Vertical - Text On Right */}
        <div className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
          <h4 className="mb-4 font-semibold text-action-primary">Mode: Vertical — Text On: Right</h4>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {states.map((st) => (
              <div key={st} className="flex flex-col">
                <span className="mb-3 block text-xs font-semibold text-neutral-500 uppercase">
                  State: {st}
                </span>
                <div className="flex flex-col">
                  {positions.map((pos, idx) => (
                    <StepperItem
                      key={pos}
                      mode="Vertical"
                      position={pos}
                      state={st}
                      textOn="Right"
                      step={idx + 1}
                      title="Title"
                      description="Description"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
