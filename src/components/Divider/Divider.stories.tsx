import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: {
    type: "horizontal",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    decorative: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-md space-y-4 p-4">
      <p className="text-sm text-neutral-600">Konten bagian atas</p>
      <Divider {...args} />
      <p className="text-sm text-neutral-600">Konten bagian bawah</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-4 p-4 text-sm text-neutral-700">
      <span>Dashboard</span>
      <Divider type="vertical" />
      <span>Pengadaan</span>
      <Divider type="vertical" />
      <span>Laporan</span>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6 p-4">
      <Divider label="ATAU" />
      <Divider label="Langkah 1 Selesai" labelPosition="left" />
      <Divider label="Lanjutkan di Bawah" labelPosition="right" />
    </div>
  ),
};

export const FigmaMatrix: Story = {
  name: "Figma (92134:1068)",
  render: () => (
    <div className="w-full max-w-xl space-y-8 p-6">
      <div>
        <h3 className="text-lg font-bold text-primary">
          Figma PaDi DS v3.0 Divider — Node 92134:1068
        </h3>
        <p className="text-sm text-secondary">
          Types: Horizontal (w-full, h-px), Vertical (h-full, w-px).
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
        <h4 className="text-xs font-semibold text-action-primary uppercase">1. Horizontal Type</h4>
        <div className="w-full py-2">
          <Divider type="horizontal" />
        </div>
      </div>

      <div className="space-y-4 rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
        <h4 className="text-xs font-semibold text-action-primary uppercase">2. Vertical Type</h4>
        <div className="flex h-16 items-center gap-6 py-2">
          <span className="text-sm text-neutral-600">Kolom 1</span>
          <Divider type="vertical" />
          <span className="text-sm text-neutral-600">Kolom 2</span>
          <Divider type="vertical" />
          <span className="text-sm text-neutral-600">Kolom 3</span>
        </div>
      </div>
    </div>
  ),
};
