import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge.types";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["neutral", "brand", "success", "warning", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: "neutral" } };
export const Brand: Story = { args: { variant: "brand", children: "New" } };
export const Success: Story = { args: { variant: "success", children: "Paid" } };
export const Warning: Story = { args: { variant: "warning", children: "Pending" } };
export const Danger: Story = { args: { variant: "destructive", children: "Failed" } };

export const CounterSm: Story = {
  name: "Counter / Notification (sm - 14px)",
  args: { variant: "counter", size: "sm", label: "1" },
};

export const CounterMd: Story = {
  name: "Counter / Notification (md - 16px)",
  args: { variant: "counter", size: "md", label: "1" },
};

export const FigmaPaDiBadge: Story = {
  name: "Figma Node 91797:378 (PaDi Counter Badge)",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-6 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-sm font-semibold">
          Figma Node 91797:378 — PaDi DS v3.0 Badge Indikator Angka/Notifikasi
        </h3>
        <p className="text-content-muted text-xs">
          Warna PaDi Red (#ee3124), teks putih (#ffffff). Ukuran sm (14px, border putih, font 10px
          bold) dan md (16px, font 12px).
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Small (14px)</span>
            <Badge variant="counter" size="sm">
              1
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Small Multi-digit</span>
            <Badge variant="counter" size="sm">
              99+
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Medium (16px)</span>
            <Badge variant="counter" size="md">
              1
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Medium Multi-digit</span>
            <Badge variant="counter" size="md">
              99+
            </Badge>
          </div>
        </div>

        <div className="border-border-subtle border-t pt-4">
          <span className="text-content-muted mb-3 block text-xs font-medium">
            Contoh Penggunaan Nyata (Keranjang & Notifikasi):
          </span>
          <div className="flex items-center gap-4">
            <div className="relative inline-flex">
              <button
                type="button"
                className="rounded-button border-border-strong bg-surface-base text-content-primary inline-flex h-10 items-center gap-2 border px-4 text-sm font-medium"
              >
                Keranjang Belanja
              </button>
              <span className="absolute -top-1.5 -right-1.5">
                <Badge variant="counter" size="sm">
                  3
                </Badge>
              </span>
            </div>

            <div className="relative inline-flex">
              <button
                type="button"
                className="rounded-button border-border-strong bg-surface-base text-content-primary flex size-10 items-center justify-center border"
                aria-label="Notifikasi"
              >
                🔔
              </button>
              <span className="absolute -top-1 -right-1">
                <Badge variant="counter" size="md">
                  12
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
