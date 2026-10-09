import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
import { TextField } from "../TextField/TextField";
import { SelectField } from "../SelectField/SelectField";
import { Checkbox } from "../Checkbox/Checkbox";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    showCloseButton: { control: "boolean" },
    showBackButton: { control: "boolean" },
    closeOnClickOutside: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    transitionDuration: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Varian 1: Modal Text (Figma 91213:2119 / 91074:15880)
 * Menampilkan judul modal dan pesan teks penjelasan dengan animasi transisi Mantine.
 */
export const ModalText: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex h-[300px] items-center justify-center">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Buka Modal Text
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Title"
          description="Content"
          confirmText="Simpan"
          cancelText="Batal"
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * Varian 2: Modal Image (Figma 91074:3605 / 91074:3606)
 * Menampilkan ilustrasi header, teks terpusat, dan tombol aksi.
 */
export const ModalImage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex h-[300px] items-center justify-center">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Buka Modal Image
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          image={
            <div className="flex size-full items-center justify-center rounded-lg bg-brand-soft text-action-primary">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          }
          title="Title"
          description="Content"
          confirmText="Simpan"
          cancelText="Batal"
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

/**
 * Varian 3: Modal Form (Figma 92578:1089 / 92578:1090)
 * Menampilkan form interaktif di dalam dialog modal.
 */
export const ModalForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [agree, setAgree] = useState(false);

    return (
      <div className="flex h-[300px] items-center justify-center">
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Buka Modal Form
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Tambah Data Pengguna"
          confirmText="Simpan"
          cancelText="Batal"
          onConfirm={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
        >
          <div className="flex flex-col gap-16 py-8">
            <TextField
              label="Nama Lengkap"
              placeholder="Masukkan nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <SelectField
              label="Peran / Role"
              placeholder="Pilih peran"
              options={[
                { value: "admin", label: "Administrator" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
            <Checkbox
              text="Saya menyetujui syarat & ketentuan"
              checked={agree}
              onCheckedChange={(val) => setAgree(val as boolean)}
            />
          </div>
        </Modal>
      </div>
    );
  },
};
