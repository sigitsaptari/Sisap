import type { Meta, StoryObj } from "@storybook/react";
import { RichTextEditor } from "./RichTextEditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Components/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  args: {
    label: "Deskripsi Produk",
    placeholder: "Tulis deskripsi produk di sini...",
    isWajib: true,
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "focussed", "error", "success", "disabled"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {},
};

export const WithValueAndCounter: Story = {
  args: {
    defaultValue: "Laptop handal dengan desain tipis, performa cepat, baterai awet, cocok untuk kerja dan belajar.",
    showCounter: true,
    maxLength: 2600,
  },
};

export const ErrorState: Story = {
  args: {
    state: "error",
    errorMessage: "Deskripsi produk wajib diisi dengan minimal 20 karakter",
    defaultValue: "Laptop pendek",
    showCounter: true,
    maxLength: 2600,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Konten ini tidak dapat diedit.",
  },
};
