import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "./SelectField";

const meta: Meta<typeof SelectField> = {
  title: "Components/SelectField",
  component: SelectField,
  tags: ["autodocs"],
  args: {
    label: "Select Label",
    placeholder: "Pilih salah satu",
    size: "md",
    options: [
      { label: "Option 1", value: "opt1" },
      { label: "Option 2", value: "opt2" },
      { label: "Option 3", value: "opt3" },
    ],
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "focussed", "filled", "error", "success", "disabled"],
    },
    multiple: { control: "boolean" },
    searchable: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  args: {},
};

export const SingleSelect: Story = {
  args: {
    label: "Pilih Kategori",
    options: [
      { label: "Elektronik", value: "elektronik" },
      { label: "Pakaian", value: "pakaian" },
      { label: "Makanan", value: "makanan" },
    ],
  },
};

export const MultiSelect: Story = {
  args: {
    label: "Pilih Kategori (Multiple)",
    multiple: true,
    placeholder: "Pilih beberapa opsi",
    options: [
      { label: "Elektronik", value: "elektronik" },
      { label: "Pakaian", value: "pakaian" },
      { label: "Makanan", value: "makanan" },
      { label: "Buku", value: "buku" },
    ],
  },
};

export const SearchableSelect: Story = {
  args: {
    label: "Cari Kategori",
    searchable: true,
    options: [
      { label: "Elektronik", value: "elektronik" },
      { label: "Pakaian", value: "pakaian" },
      { label: "Makanan", value: "makanan" },
      { label: "Otomotif", value: "otomotif" },
      { label: "Olahraga", value: "olahraga" },
      { label: "Perawatan & Kecantikan", value: "kecantikan" },
    ],
  },
};

export const SearchableMultiSelect: Story = {
  args: {
    label: "Cari & Pilih Kategori (Multiple)",
    multiple: true,
    searchable: true,
    options: [
      { label: "Elektronik", value: "elektronik" },
      { label: "Pakaian", value: "pakaian" },
      { label: "Makanan", value: "makanan" },
      { label: "Otomotif", value: "otomotif" },
      { label: "Olahraga", value: "olahraga" },
      { label: "Perawatan & Kecantikan", value: "kecantikan" },
    ],
  },
};

export const ErrorState: Story = {
  args: {
    state: "error",
    errorMessage: "Pilihan ini wajib diisi",
  },
};

export const SuccessState: Story = {
  args: {
    state: "success",
    successMessage: "Pilihan tersimpan",
    value: "opt1",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Pilihan dinonaktifkan",
  },
};
