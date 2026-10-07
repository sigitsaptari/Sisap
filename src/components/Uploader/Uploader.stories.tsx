import type { Meta, StoryObj } from "@storybook/react";
import { Uploader } from "./Uploader";

const SAMPLE_IMAGE_1 = "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80";
const SAMPLE_IMAGE_2 = "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&q=80";
const SAMPLE_IMAGE_3 = "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&q=80";

const meta: Meta<typeof Uploader> = {
  title: "Components/Uploader",
  component: Uploader,
  tags: ["autodocs"],
  args: {
    type: "image",
    label: "Foto Produk",
    required: true,
    maxFiles: 5,
    maxSizeMb: 5,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["image", "video"],
    },
    required: { control: "boolean" },
    maxFiles: { control: "number" },
    maxSizeMb: { control: "number" },
    disabled: { control: "boolean" },
    simulateUpload: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Uploader>;

export const FotoProduk: Story = {
  name: "Foto Produk (Interactive)",
  args: {
    type: "image",
    label: "Foto Produk",
    required: true,
    maxFiles: 5,
  },
};

export const VideoProduk: Story = {
  name: "Video Produk (Interactive)",
  args: {
    type: "video",
    label: "Video Produk",
    required: false,
    maxFiles: 1,
    maxSizeMb: 10,
  },
};

export const UploadingState: Story = {
  name: "Proses Upload (Uploading State)",
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <Uploader
        type="image"
        label="Foto Produk"
        required
        simulateUpload={false}
        defaultFiles={[
          {
            id: "file-uploading-1",
            url: SAMPLE_IMAGE_1,
            name: "laptop-macbook.jpg",
            status: "uploading",
            progress: 45,
          },
          {
            id: "file-uploading-2",
            url: SAMPLE_IMAGE_2,
            name: "laptop-side.jpg",
            status: "uploading",
            progress: 82,
          },
        ]}
      />
    </div>
  ),
};

export const SuccessState: Story = {
  name: "Sukses Upload (Success State)",
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <Uploader
        type="image"
        label="Foto Produk"
        required
        defaultFiles={[
          {
            id: "img-1",
            url: SAMPLE_IMAGE_1,
            name: "foto-utama.jpg",
            status: "success",
          },
          {
            id: "img-2",
            url: SAMPLE_IMAGE_2,
            name: "foto-tampak-depan.jpg",
            status: "success",
          },
          {
            id: "img-3",
            url: SAMPLE_IMAGE_3,
            name: "foto-tampak-samping.jpg",
            status: "success",
          },
        ]}
      />

      <Uploader
        type="video"
        label="Video Produk"
        defaultFiles={[
          {
            id: "vid-1",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            name: "demo-produk.mp4",
            status: "success",
          },
        ]}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  name: "Error / Validation State",
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Uploader
        type="image"
        label="Foto Produk"
        defaultFiles={[
          {
            id: "img-err",
            url: "",
            name: "file-terlalu-besar.png",
            status: "error",
            errorMessage: "Ukuran melebihi 5MB",
          },
        ]}
      />
    </div>
  ),
};

export const CompleteFigmaForm: Story = {
  name: "Figma Form (Foto & Video)",
  render: () => (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-neutral-900 rounded-lg max-w-4xl shadow-sm border border-neutral-100 dark:border-neutral-800">
      <Uploader
        type="image"
        label="Foto Produk"
        required
        maxFiles={5}
        maxSizeMb={5}
      />
      <Uploader
        type="video"
        label="Video Produk"
        required={false}
        maxFiles={1}
        maxSizeMb={10}
      />
    </div>
  ),
};
