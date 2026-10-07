import type { Meta, StoryObj } from "@storybook/react";
import { TickCircle } from "iconsax-react";
import { Chip } from "./Chip";
import type { ChipColor, ChipSize, ChipType } from "./Chip.types";

const colors: ChipColor[] = ["tosca", "grey", "green", "red", "orange", "blue", "dark-blue"];
const types: ChipType[] = ["soft", "outline", "solid"];
const sizes: ChipSize[] = ["sm", "md", "lg"];

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: {
    label: "chip_text",
    color: "tosca",
    type: "soft",
    size: "sm",
    showIconR: true,
  },
  argTypes: {
    color: {
      control: "select",
      options: colors,
    },
    type: {
      control: "radio",
      options: types,
    },
    size: {
      control: "radio",
      options: sizes,
    },
    showIconR: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {};

export const Soft: Story = {
  args: { type: "soft", color: "tosca", label: "Diproses" },
};

export const Outline: Story = {
  args: { type: "outline", color: "green", label: "Terkirim" },
};

export const Solid: Story = {
  args: { type: "solid", color: "red", label: "Dibatalkan" },
};

export const WithIcon: Story = {
  render: (args) => (
    <Chip {...args} icon={<TickCircle />} label="Terverifikasi" color="green" showIconR />
  ),
  args: {
    type: "soft",
    color: "green",
    label: "Terverifikasi",
    showIconR: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <span className="text-content-muted text-xs">Small (16px)</span>
        <Chip size="sm" label="Small Chip" showIconR />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-content-muted text-xs">Medium (20px)</span>
        <Chip size="md" label="Medium Chip" showIconR />
      </div>
      <div className="flex flex-col items-center gap-2">
        <span className="text-content-muted text-xs">Large (24px)</span>
        <Chip size="lg" label="Large Chip" showIconR />
      </div>
    </div>
  ),
};

export const FigmaMatrix: Story = {
  name: "Figma Node 91105:6246 (Complete Matrix)",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-8 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-sm font-semibold">
          Figma Node 91105:6246 — PaDi DS v3.0 Chip / Tag Status
        </h3>
        <p className="text-content-muted text-xs">
          Matrix lengkap 7 warna (Tosca, Grey, Green, Red, Orange, Blue, Dark Blue) × 3 tipe (Soft,
          Outline, Solid) × 3 ukuran (sm 16px, md 20px, lg 24px).
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-border-subtle text-content-muted border-b">
              <th className="py-2 pr-4 font-medium">Color</th>
              <th className="py-2 pr-4 font-medium">Soft (sm / md / lg)</th>
              <th className="py-2 pr-4 font-medium">Outline (sm / md / lg)</th>
              <th className="py-2 font-medium">Solid (sm / md / lg)</th>
            </tr>
          </thead>
          <tbody className="divide-border-subtle divide-y">
            {colors.map((c) => (
              <tr key={c}>
                <td className="text-content-primary py-3 pr-4 font-mono font-medium capitalize">
                  {c}
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip color={c} type="soft" size="sm" label="chip_text" showIconR />
                    <Chip color={c} type="soft" size="md" label="chip_text" showIconR />
                    <Chip color={c} type="soft" size="lg" label="chip_text" showIconR />
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip color={c} type="outline" size="sm" label="chip_text" showIconR />
                    <Chip color={c} type="outline" size="md" label="chip_text" showIconR />
                    <Chip color={c} type="outline" size="lg" label="chip_text" showIconR />
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip color={c} type="solid" size="sm" label="chip_text" showIconR />
                    <Chip color={c} type="solid" size="md" label="chip_text" showIconR />
                    <Chip color={c} type="solid" size="lg" label="chip_text" showIconR />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};
