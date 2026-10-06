import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";
import type { TextAreaSize, TextAreaState } from "./TextArea.types";

const states: TextAreaState[] = [
  "default",
  "hover",
  "focussed",
  "filled",
  "error",
  "error counter",
  "success",
  "disabled",
];

const sizes: TextAreaSize[] = ["sm", "md", "lg"];

const meta: Meta<typeof TextArea> = {
  title: "Components/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  args: {
    label: "Label",
    description: "Description",
    placeholder: "placeholder",
    hint: "Hint Text",
    counterText: "0/200",
    showCounter: true,
    showHint: true,
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
    showCounter: { control: "boolean" },
    showHint: { control: "boolean" },
    disabled: { control: "boolean" },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="max-w-xl space-y-6">
      <TextArea
        size="sm"
        label="Small (sm)"
        description="Ukuran ringkas untuk form padat (text 12px, min-h 72px)"
        placeholder="placeholder"
        hint="Hint Text"
        showCounter
        counterText="0/200"
        required
        showInfoTooltip
      />
      <TextArea
        size="md"
        label="Medium (md) — Default"
        description="Ukuran standar PaDi (text 14px, min-h 96px)"
        placeholder="placeholder"
        hint="Hint Text"
        showCounter
        counterText="0/200"
        required
        showInfoTooltip
      />
      <TextArea
        size="lg"
        label="Large (lg)"
        description="Ukuran luas untuk catatan pengadaan atau tender (text 16px, min-h 120px)"
        placeholder="placeholder"
        hint="Hint Text"
        showCounter
        counterText="0/200"
        optional
        showInfoTooltip
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
      <TextArea
        label="Default State"
        state="default"
        placeholder="Ketik sesuatu di sini..."
        hint="Hint Text"
        showCounter
        counterText="0/200"
      />
      <TextArea
        label="Hover State"
        state="hover"
        placeholder="Border tosca saat kursor mendekat"
        hint="Hint Text"
        showCounter
        counterText="0/200"
      />
      <TextArea
        label="Focussed State"
        state="focussed"
        placeholder="Fokus dengan ring tosca lembut"
        hint="Hint Text"
        showCounter
        counterText="0/200"
      />
      <TextArea
        label="Filled State"
        state="filled"
        defaultValue="Teks telah terisi oleh pengguna..."
        hint="Hint Text"
        showCounter
        counterText="35/200"
      />
      <TextArea
        label="Error State"
        state="error"
        defaultValue="Format deskripsi salah atau tidak valid"
        errorMessage="Information"
        hint="Hint Text"
        showCounter
        counterText="41/200"
      />
      <TextArea
        label="Error Counter State"
        state="error counter"
        defaultValue="Teks melebihi batas kuota karakter yang telah ditentukan oleh sistem"
        hint="Hint Text"
        showCounter
        counterText="215/200"
      />
      <TextArea
        label="Success State"
        state="success"
        defaultValue="Spesifikasi telah lengkap dan lolos verifikasi"
        successMessage="Information"
        hint="Hint Text"
        showCounter
        counterText="46/200"
      />
      <TextArea
        label="Disabled State"
        state="disabled"
        disabled
        defaultValue="Field catatan dikunci oleh sistem"
        hint="Hint Text"
        showCounter
        counterText="34/200"
      />
    </div>
  ),
};

export const FigmaMatrix: Story = {
  render: () => (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-lg font-bold text-[#444b55]">
          Figma PaDi DS v3.0 Matrix — Sizes & States
        </h3>
        <p className="mb-6 text-sm text-[#686e76]">
          Representasi lengkap node Figma 92211:8704 (sm, md, lg across all states)
        </p>
      </div>

      {(["sm", "md", "lg"] as TextAreaSize[]).map((size) => (
        <div
          key={size}
          className="rounded-lg border border-neutral-200 p-6 dark:border-neutral-800"
        >
          <h4 className="mb-4 font-semibold tracking-wider text-[#009ea9] uppercase">
            Size: {size.toUpperCase()}
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <TextArea
              size={size}
              label="Label"
              description="Description"
              placeholder="placeholder"
              hint="Hint Text"
              counterText="0/200"
              showCounter
              showHint
              required
              optional
              showInfoTooltip
            />
            <TextArea
              size={size}
              label="Label"
              description="Description"
              placeholder="placeholder"
              hint="Hint Text"
              counterText="0/200"
              state="focussed"
              showCounter
              showHint
              required
              optional
              showInfoTooltip
            />
            <TextArea
              size={size}
              label="Label"
              description="Description"
              placeholder="placeholder"
              hint="Hint Text"
              counterText="0/200"
              state="error"
              errorMessage="Information"
              showCounter
              showHint
              required
              optional
              showInfoTooltip
            />
            <TextArea
              size={size}
              label="Label"
              description="Description"
              placeholder="placeholder"
              hint="Hint Text"
              counterText="0/200"
              state="success"
              successMessage="Information"
              showCounter
              showHint
              required
              optional
              showInfoTooltip
            />
          </div>
        </div>
      ))}
    </div>
  ),
};
