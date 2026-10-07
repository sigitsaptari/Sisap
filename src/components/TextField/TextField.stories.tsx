import type { Meta, StoryObj } from "@storybook/react";
import { ArrowDown2, SearchNormal1 } from "iconsax-react";
import { TextField } from "./TextField";
import type { TextFieldSize, TextFieldState } from "./TextField.types";

const states: TextFieldState[] = [
  "default",
  "hover",
  "focussed",
  "filled",
  "error",
  "success",
  "disabled",
];

const sizes: TextFieldSize[] = ["sm", "md", "lg"];

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  args: {
    label: "Label",
    description: "Description",
    placeholder: "placeholder",
    hint: "Hint Text",
    prefix: "Prefix",
    suffix: "Suffix",
    required: true,
    optional: true,
    showInfoTooltip: true,
    size: "md",
    state: "default",
  },
  argTypes: {
    size: {
      control: "radio",
      options: sizes,
    },
    state: {
      control: "select",
      options: states,
    },
    required: { control: "boolean" },
    optional: { control: "boolean" },
    showInfoTooltip: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    leftIcon: <SearchNormal1 className="size-full" />,
    rightIcon: <ArrowDown2 className="size-full" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <TextField
        size="sm"
        label="Small (36px)"
        description="Ukuran ringkas untuk form padat"
        prefix="Rp"
        suffix="IDR"
        leftIcon={<SearchNormal1 className="size-full" />}
        rightIcon={<ArrowDown2 className="size-full" />}
        placeholder="Input small"
        required
        showInfoTooltip
        hint="Tinggi 36px"
      />
      <TextField
        size="md"
        label="Medium (44px) - Default"
        description="Ukuran standar formulir PaDi"
        prefix="Prefix"
        suffix="Suffix"
        leftIcon={<SearchNormal1 className="size-full" />}
        rightIcon={<ArrowDown2 className="size-full" />}
        placeholder="Input medium"
        required
        showInfoTooltip
        hint="Tinggi 44px"
      />
      <TextField
        size="lg"
        label="Large (52px)"
        description="Ukuran besar untuk hero / search input"
        prefix="Search"
        suffix="GO"
        leftIcon={<SearchNormal1 className="size-full" />}
        placeholder="Input large"
        optional
        showInfoTooltip
        hint="Tinggi 52px"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
      <TextField
        state="default"
        label="Default State"
        placeholder="default state"
        hint="Border abu-abu standar"
      />
      <TextField
        state="hover"
        label="Hover State"
        placeholder="hover state"
        hint="Border tosca saat kursor mendekat"
      />
      <TextField
        state="focussed"
        label="Focussed State"
        placeholder="focussed state"
        hint="Border tosca + focus ring"
      />
      <TextField
        state="filled"
        label="Filled State"
        defaultValue="Nilai terisi"
        hint="Input sudah memiliki nilai"
      />
      <TextField
        state="error"
        label="Error State"
        defaultValue="email-salah"
        errorMessage="Format email tidak valid"
      />
      <TextField
        state="success"
        label="Success State"
        defaultValue="PROMO2026"
        successMessage="Kode promo valid (Diskon 20%)"
      />
      <TextField
        disabled
        label="Disabled State"
        defaultValue="Tidak dapat diedit"
        hint="Field dinonaktifkan"
      />
    </div>
  ),
};

export const FigmaMatrix: Story = {
  name: "Figma Node 88848:20885 (Complete Matrix)",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-8 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-sm font-semibold">
          Figma Node 88848:20885 — PaDi DS v3.0 Text Field
        </h3>
        <p className="text-content-muted text-xs">
          Input teks terstandar dengan 3 ukuran (sm 36px, md 44px, lg 52px) dan 7 status (Default,
          Hover, Focussed, Filled, Error, Success, Disabled).
        </p>
      </div>

      <div className="space-y-8">
        {states.map((st) => (
          <div key={st} className="border-border-subtle border-t pt-4">
            <span className="text-content-primary mb-3 block text-xs font-bold tracking-wider uppercase">
              State: {st}
            </span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <TextField
                size="sm"
                state={st}
                label="Label"
                description="Description"
                prefix="Prefix"
                suffix="Suffix"
                leftIcon={<SearchNormal1 className="size-full" />}
                rightIcon={<ArrowDown2 className="size-full" />}
                placeholder="placeholder"
                required
                optional
                showInfoTooltip
                hint="Hint Text"
                errorMessage={st === "error" ? "Information" : undefined}
                successMessage={st === "success" ? "Information" : undefined}
                disabled={st === "disabled"}
                defaultValue={st === "filled" ? "Filled Value" : undefined}
              />
              <TextField
                size="md"
                state={st}
                label="Label"
                description="Description"
                prefix="Prefix"
                suffix="Suffix"
                leftIcon={<SearchNormal1 className="size-full" />}
                rightIcon={<ArrowDown2 className="size-full" />}
                placeholder="placeholder"
                required
                optional
                showInfoTooltip
                hint="Hint Text"
                errorMessage={st === "error" ? "Information" : undefined}
                successMessage={st === "success" ? "Information" : undefined}
                disabled={st === "disabled"}
                defaultValue={st === "filled" ? "Filled Value" : undefined}
              />
              <TextField
                size="lg"
                state={st}
                label="Label"
                description="Description"
                prefix="Prefix"
                suffix="Suffix"
                leftIcon={<SearchNormal1 className="size-full" />}
                rightIcon={<ArrowDown2 className="size-full" />}
                placeholder="placeholder"
                required
                optional
                showInfoTooltip
                hint="Hint Text"
                errorMessage={st === "error" ? "Information" : undefined}
                successMessage={st === "success" ? "Information" : undefined}
                disabled={st === "disabled"}
                defaultValue={st === "filled" ? "Filled Value" : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
