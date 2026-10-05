import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { label: "1" },
  argTypes: {
    variant: {
      control: "radio",
      options: ["counter", "notification", "default"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    shape: {
      control: "radio",
      options: ["circle", "pill"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { variant: "counter", size: "sm", label: "1" },
};

export const CounterSm: Story = {
  name: "Counter Small (sm - 14px)",
  args: { variant: "counter", size: "sm", label: "1" },
};

export const CounterMd: Story = {
  name: "Counter Medium (md - 16px)",
  args: { variant: "counter", size: "md", label: "1" },
};

export const NotificationDot: Story = {
  name: "Notification Dot (Empty)",
  args: { variant: "notification", size: "sm" },
};

export const MultiDigit: Story = {
  name: "Multi-digit Counter (99+)",
  args: { variant: "counter", size: "sm", label: "99+" },
};

export const SymmetricalCircle: Story = {
  name: "Symmetrical Circle (1:1 Dimensions)",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-6 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-sm font-semibold">
          Dimensi Simetris 1:1 (True Circle — Tidak Lonjong)
        </h3>
        <p className="text-content-muted text-xs">
          Single-digit dan counter badge otomatis memiliki aspek rasio 1:1 (lebar sama dengan
          tinggi: 14x14px untuk sm, 16x16px untuk md).
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <span className="text-content-muted font-mono text-xs">sm (14x14px)</span>
          <div className="border-border-subtle flex size-8 items-center justify-center rounded border bg-neutral-100 dark:bg-neutral-800">
            <Badge variant="counter" size="sm">
              1
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-content-muted font-mono text-xs">sm dot (14x14px)</span>
          <div className="border-border-subtle flex size-8 items-center justify-center rounded border bg-neutral-100 dark:bg-neutral-800">
            <Badge variant="counter" size="sm" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-content-muted font-mono text-xs">md (16x16px)</span>
          <div className="border-border-subtle flex size-8 items-center justify-center rounded border bg-neutral-100 dark:bg-neutral-800">
            <Badge variant="counter" size="md">
              1
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-content-muted font-mono text-xs">md (3)</span>
          <div className="border-border-subtle flex size-8 items-center justify-center rounded border bg-neutral-100 dark:bg-neutral-800">
            <Badge variant="counter" size="md">
              3
            </Badge>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-content-muted font-mono text-xs">multi-digit pill</span>
          <div className="border-border-subtle flex h-8 items-center justify-center rounded border bg-neutral-100 px-2 dark:bg-neutral-800">
            <Badge variant="counter" size="sm">
              99+
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
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
          bold) dan md (16px, font 12px). Dimensi simetris 1:1 circle.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Small (14x14px circle)</span>
            <Badge variant="counter" size="sm">
              1
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Small Multi-digit (pill)</span>
            <Badge variant="counter" size="sm">
              99+
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Medium (16x16px circle)</span>
            <Badge variant="counter" size="md">
              1
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-content-muted text-xs">Medium Multi-digit (pill)</span>
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
