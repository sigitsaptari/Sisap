import { useState } from "react";
import {
  Button,
  TextField,
  SelectField,
  RichTextEditor,
  Uploader,
  Switch,
  type UploaderFile,
} from "@sisapds/react";

export default function App() {
  const [productPhotos, setProductPhotos] = useState<UploaderFile[]>([]);
  const [productVideo, setProductVideo] = useState<UploaderFile[]>([]);
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="min-h-screen bg-[#f9fafa] text-[#444b55]">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 border-b border-[#e7e8e9] bg-[#ffffff] px-6 py-4 shadow-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#009ea9]">PaDi UMKM</span>
            <span className="text-sm font-medium text-[#8c9197]">/ Tambah Produk Baru</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="md">
              Batal
            </Button>
            <Button variant="primary" size="md">
              Simpan Produk
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-[#444b55]">Informasi Produk</h1>
          <p className="text-sm text-[#686e76]">
            Lengkapi data produk yang akan Anda jual di katalog PaDi UMKM.
          </p>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-6">
          {/* Card: Media Produk */}
          <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
            <h2 className="mb-4 text-base font-bold text-[#444b55]">Media Produk</h2>
            <div className="flex flex-col gap-6">
              {/* Foto Produk */}
              <Uploader
                type="image"
                label="Foto Produk"
                required
                maxFiles={5}
                files={productPhotos}
                onChange={setProductPhotos}
                helperRules={[
                  "Wajib memiliki 1 foto produk, maksimal pilih foto hingga 5 gambar.",
                  "Resolusi minimal 1000 x 1000 px, ukuran disarankan 1 MB (maksimal 5 MB), format gambar JPG/PNG.",
                ]}
              />

              {/* Video Produk */}
              <Uploader
                type="video"
                label="Video Produk"
                maxFiles={1}
                files={productVideo}
                onChange={setProductVideo}
                helperRules={[
                  "Video maksimum 10MB",
                  "Format MPEG, MP4, AVI, Quicktime, dan lainnya.",
                ]}
              />
            </div>
          </div>

          {/* Card: Detail Informasi Produk */}
          <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
            <h2 className="mb-4 text-base font-bold text-[#444b55]">Detail Informasi</h2>
            <div className="flex flex-col gap-5">
              <TextField
                label="Nama Produk"
                required
                placeholder="Contoh: Laptop Handal 14 Inch Core i5"
                maxLength={100}
                showCounter
              />

              <SelectField
                label="Kategori Produk"
                isWajib
                placeholder="Pilih Kategori"
                options={[
                  { label: "Elektronik & Gadget", value: "elektronik" },
                  { label: "Peralatan Kantor (ATK)", value: "atk" },
                  { label: "Makanan & Minuman", value: "fnb" },
                  { label: "Jasa Konsultasi", value: "jasa" },
                ]}
              />

              <RichTextEditor
                label="Deskripsi Produk"
                isWajib
                placeholder="Jelaskan spesifikasi, keunggulan, dan kelengkapan produk secara detail..."
                maxLength={2600}
                showCounter
              />
            </div>
          </div>

          {/* Card: Status Produk */}
          <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#444b55]">Status Produk</h2>
                <p className="text-xs text-[#686e76]">
                  Jika aktif, produk dapat dicari dan dibeli oleh pembeli di katalog.
                </p>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                label={isActive ? "Aktif" : "Nonaktif"}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" size="lg">
              Batal
            </Button>
            <Button variant="primary" size="lg">
              Simpan & Terbitkan
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
