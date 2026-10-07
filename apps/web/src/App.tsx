import { useState, useMemo } from "react";
import {
  Danger,
  InfoCircle,
  Edit2,
  Trash,
  Box,
  CloseCircle,
  TickCircle,
} from "iconsax-react";
import {
  Button,
  TextField,
  SelectField,
  RichTextEditor,
  Uploader,
  Switch,
  Checkbox,
  Chip,
  type UploaderFile,
} from "@sisapds/react";
import { SellerHeader } from "./components/SellerHeader";
import { SellerSidebar } from "./components/SellerSidebar";
import { AddProductStepper } from "./components/AddProductStepper";
import { CertificateModal, type CertificateItem } from "./components/CertificateModal";
import { PublishSuccessModal } from "./components/PublishSuccessModal";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast timer
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ----------------------------------------------------
  // STEP 1 STATE: INFORMASI PRODUK
  // ----------------------------------------------------
  const [productType, setProductType] = useState<"Barang" | "Jasa">("Barang");
  const [productName, setProductName] = useState(
    "MacBook Pro M5 14-Inch 16/512GB 16/1TB 24/1TB Space Black Silver - 16/1 TB IBOX Original Space Grey"
  );
  const [category, setCategory] = useState("Elektronik/Komputer & Laptop");
  const [brand, setBrand] = useState("Apple");
  const [unitType, setUnitType] = useState("Unit");
  const [sku, setSku] = useState("SKU-MBP-M5-001");
  const [isPdn, setIsPdn] = useState(false);
  const [pph, setPph] = useState("Tidak Dipotong");
  const [description, setDescription] = useState(
    "Laptop handal dengan desain tipis, performa cepat, baterai awet, cocok untuk kerja dan belajar."
  );

  // Media (Fotos & Video)
  const [photos, setPhotos] = useState<UploaderFile[]>([
    {
      id: "photo-1",
      name: "macbook-angle-1.jpg",
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-2",
      name: "macbook-angle-2.jpg",
      url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-3",
      name: "macbook-angle-3.jpg",
      url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-4",
      name: "macbook-angle-4.jpg",
      url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
  ]);
  const [video, setVideo] = useState<UploaderFile[]>([
    {
      id: "video-1",
      name: "macbook-review.mp4",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      status: "success",
      progress: 100,
    },
  ]);

  // Certificates list
  const [certificates, setCertificates] = useState<CertificateItem[]>([
    {
      id: "cert-1",
      type: "TKDN (80%)",
      status: "-",
      docUrl: "#",
      webUrl: "https://kemenperin.go.id",
    },
    {
      id: "cert-2",
      type: "MUI (Sertifikat Halal)",
      number: "ID26356455565746561",
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "#",
    },
    {
      id: "cert-3",
      type: "SNI",
      number: "04-8883-1002",
      status: "Kedaluwarsa",
      expiryDate: "12-02-2025",
      docUrl: "#",
    },
    {
      id: "cert-4",
      type: "BPOM MD",
      number: "MD263564555657465",
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "#",
    },
    {
      id: "cert-5",
      type: "SPP-IRT",
      number: "P-IRT2635645556574-56",
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "#",
    },
  ]);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // ----------------------------------------------------
  // STEP 2 STATE: HARGA & STOK
  // ----------------------------------------------------
  const [showAlertBanner, setShowAlertBanner] = useState(true);
  const [priceType, setPriceType] = useState<"normal" | "tempo">("normal");
  const [unitPrice, setUnitPrice] = useState("1.000.000");
  const [showDiscount, setShowDiscount] = useState(true);
  const [priceBeforeDiscount, setPriceBeforeDiscount] = useState("2.000.000");
  const [ppnType, setPpnType] = useState<"ppn12" | "ppn1" | "noppn">("ppn12");
  const [stock, setStock] = useState("100");
  const [minPurchase, setMinPurchase] = useState("1");
  const [stockAlwaysAvailable, setStockAlwaysAvailable] = useState(false);
  const [isPreOrder, setIsPreOrder] = useState(true);
  const [processDays, setProcessDays] = useState("30");

  // ----------------------------------------------------
  // STEP 3 STATE: PENGIRIMAN
  // ----------------------------------------------------
  const [weight, setWeight] = useState("30");
  const [weightUnit, setWeightUnit] = useState("Gram");
  const [pkgLength, setPkgLength] = useState("30");
  const [pkgWidth, setPkgWidth] = useState("30");
  const [pkgHeight, setPkgHeight] = useState("30");
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  // Volume weight calculation: (P x L x T) / 6000
  const calculatedVolumeWeight = useMemo(() => {
    const l = parseFloat(pkgLength) || 0;
    const w = parseFloat(pkgWidth) || 0;
    const h = parseFloat(pkgHeight) || 0;
    const vol = (l * w * h) / 6000;
    return vol > 0 ? vol.toFixed(1) : "0";
  }, [pkgLength, pkgWidth, pkgHeight]);

  // ----------------------------------------------------
  // STEP 4 STATE: VISIBILITAS / LAINNYA
  // ----------------------------------------------------
  const [visibilityType, setVisibilityType] = useState<"publik" | "privat">("publik");
  const [allowedBumnList, setAllowedBumnList] = useState<string[]>([
    "Telkom Indonesia",
    "Pertamina",
    "PLN",
  ]);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Remove BUMN tag
  const handleRemoveBumn = (bumn: string) => {
    setAllowedBumnList((prev) => prev.filter((item) => item !== bumn));
  };

  // Add BUMN tag
  const handleAddBumn = (bumn: string) => {
    if (bumn && !allowedBumnList.includes(bumn) && allowedBumnList.length < 5) {
      setAllowedBumnList((prev) => [...prev, bumn]);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsPublishModalOpen(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleResetForm = () => {
    setCurrentStep(1);
    showToast("Formulir telah di-reset untuk produk baru!");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafa] text-[#444b55]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-8 z-50 flex items-center gap-2 rounded-[8px] bg-[#182958] px-4 py-3 text-sm font-semibold text-[#ffffff] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <TickCircle size={18} variant="Bulk" color="#009ea9" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <SellerHeader />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex flex-1">
        {/* Left Seller Sidebar */}
        <SellerSidebar />

        {/* Center Main Work Area */}
        <main className="flex-1 overflow-x-hidden p-8">
          <div className="mx-auto flex max-w-[1096px] flex-col gap-6">
            {/* Page Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#444b55]">Tambah Produk</h1>
              <span className="text-xs text-[#8c9197]">Langkah {currentStep} dari 4</span>
            </div>

            {/* Stepper Navigation */}
            <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] px-6 py-3 shadow-xs">
              <AddProductStepper
                currentStep={currentStep}
                onStepClick={(step) => setCurrentStep(step)}
              />
            </div>

            {/* ======================================================== */}
            {/* STEP 1: INFORMASI PRODUK */}
            {/* ======================================================== */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Card 1: Jenis Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Jenis Produk</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Option: Barang */}
                    <button
                      type="button"
                      onClick={() => setProductType("Barang")}
                      className={`flex items-start justify-between rounded-[8px] border p-4 text-left transition-all cursor-pointer ${
                        productType === "Barang"
                          ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                          : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-[#009ea9]/15 text-[#009ea9]">
                          <Box size={22} variant="Bulk" color="#009ea9" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#444b55]">Barang</span>
                          <span className="text-xs text-[#686e76] mt-0.5">
                            Berupa produk fisik yang memiliki dimensi berat, panjang dan lebar
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${
                          productType === "Barang"
                            ? "border-[#009ea9] bg-[#009ea9] text-[#ffffff]"
                            : "border-[#b1b4b8] bg-[#ffffff]"
                        }`}
                      >
                        {productType === "Barang" && (
                          <svg className="size-3.5" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M3 7L5.5 9.5L11 4"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Option: Jasa */}
                    <button
                      type="button"
                      onClick={() => setProductType("Jasa")}
                      className={`flex items-start justify-between rounded-[8px] border p-4 text-left transition-all cursor-pointer ${
                        productType === "Jasa"
                          ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                          : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-[6px] bg-[#182958]/10 text-[#182958]">
                          <svg className="size-5.5 text-[#182958]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.5 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#444b55]">Jasa</span>
                          <span className="text-xs text-[#686e76] mt-0.5">
                            Berupa produk non-fisik dalam bentuk layanan
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] border ${
                          productType === "Jasa"
                            ? "border-[#009ea9] bg-[#009ea9] text-[#ffffff]"
                            : "border-[#b1b4b8] bg-[#ffffff]"
                        }`}
                      >
                        {productType === "Jasa" && (
                          <svg className="size-3.5" viewBox="0 0 14 14" fill="none">
                            <path
                              d="M3 7L5.5 9.5L11 4"
                              stroke="#ffffff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Card 2: Informasi Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Informasi Produk</h2>
                  <div className="flex flex-col gap-5">
                    {/* Nama Produk */}
                    <TextField
                      label="Nama Produk"
                      required
                      description="Min. 5 karakter: Masukkan merek, jenis, warna, bahan, atau tipe. Hindari huruf kapital berlebih, multi-merek, dan kata promosi."
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      maxLength={100}
                      showCounter
                    />

                    {/* 3 Column Select Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <SelectField
                        label="Kategori Produk"
                        isWajib
                        value={category}
                        onChange={setCategory}
                        options={[
                          { label: "Elektronik/Komputer & Laptop", value: "Elektronik/Komputer & Laptop" },
                          { label: "Furniture/Furniture Perkantoran", value: "Furniture/Furniture Perkantoran" },
                          { label: "Peralatan Kantor (ATK)", value: "Peralatan Kantor (ATK)" },
                          { label: "Makanan & Minuman", value: "Makanan & Minuman" },
                        ]}
                      />

                      <SelectField
                        label="Brand Produk"
                        isWajib
                        value={brand}
                        onChange={setBrand}
                        options={[
                          { label: "Apple", value: "Apple" },
                          { label: "Fantech", value: "Fantech" },
                          { label: "Asus", value: "Asus" },
                          { label: "Lenovo", value: "Lenovo" },
                          { label: "Samsung", value: "Samsung" },
                        ]}
                      />

                      <SelectField
                        label="Jenis Satuan Produk"
                        isWajib
                        value={unitType}
                        onChange={setUnitType}
                        options={[
                          { label: "Unit", value: "Unit" },
                          { label: "Pcs", value: "Pcs" },
                          { label: "Pack", value: "Pack" },
                          { label: "Set", value: "Set" },
                          { label: "Box", value: "Box" },
                        ]}
                      />
                    </div>

                    {/* SKU */}
                    <TextField
                      label="Kode SKU"
                      optional
                      description="Kode unik untuk melacak varian produk di inventaris."
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />

                    {/* PDN Checkbox */}
                    <div className="pt-1">
                      <Checkbox
                        id="pdn-checkbox"
                        checked={isPdn}
                        onCheckedChange={(checked) => setIsPdn(Boolean(checked))}
                        text="Produk Dalam Negeri (PDN)"
                      />
                      <p className="ms-7 mt-0.5 text-xs text-[#686e76]">
                        Barang dan jasa produksi Indonesia yang memanfaatkan tenaga kerja serta bahan baku dalam negeri.
                      </p>
                    </div>

                    {/* Pajak Penghasilan (PPh) */}
                    <SelectField
                      label="Pajak Penghasilan (PPh)"
                      value={pph}
                      onChange={setPph}
                      options={[
                        { label: "Tidak Dipotong", value: "Tidak Dipotong" },
                        { label: "PPh Pasal 22 (0.5%)", value: "PPh Pasal 22 (0.5%)" },
                        { label: "PPh Pasal 22 (1.5%)", value: "PPh Pasal 22 (1.5%)" },
                        { label: "PPh Pasal 23 (2.0%)", value: "PPh Pasal 23 (2.0%)" },
                      ]}
                    />

                    {/* Deskripsi Produk */}
                    <RichTextEditor
                      label="Deskripsi Produk"
                      isWajib
                      value={description}
                      onChange={setDescription}
                      maxLength={2600}
                    />
                  </div>
                </div>

                {/* Card 3: Media Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Media Produk</h2>
                  <div className="flex flex-col gap-6">
                    {/* Foto Produk */}
                    <Uploader
                      type="image"
                      label="Foto Produk"
                      required
                      maxFiles={5}
                      files={photos}
                      onChange={setPhotos}
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
                      files={video}
                      onChange={setVideo}
                      helperRules={[
                        "Video maksimum 10MB",
                        "Format MPEG, MP4, AVI, Quicktime, dan lainnya.",
                      ]}
                    />
                  </div>
                </div>

                {/* Card 4: Sertifikat Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-bold text-[#444b55]">Sertifikat Produk</h2>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsCertModalOpen(true)}
                    >
                      Tambah Sertifikat
                    </Button>
                  </div>

                  {certificates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="font-bold text-sm text-[#444b55]">
                        Sertifikat Produk Belum ditambahkan.
                      </p>
                      <p className="text-xs text-[#8c9197] mt-1">
                        Silahkan Tambahkan dahulu sertifikat produk untuk mendukung informasi produk Anda.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-[8px] border border-[#e7e8e9]">
                      <table className="w-full text-left text-xs text-[#444b55]">
                        <thead className="bg-[#f9fafa] text-[#686e76] font-semibold border-b border-[#e7e8e9]">
                          <tr>
                            <th className="px-4 py-3">Jenis Sertifikat</th>
                            <th className="px-4 py-3">Status/Kedaluwarsa</th>
                            <th className="px-4 py-3">Lampiran</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e7e8e9]">
                          {certificates.map((cert) => (
                            <tr key={cert.id} className="hover:bg-[#f9fafa] transition-colors">
                              <td className="px-4 py-3 font-medium">
                                <div className="flex flex-col">
                                  <span>{cert.type}</span>
                                  {cert.number && (
                                    <span className="text-[11px] text-[#8c9197] font-mono">
                                      {cert.number}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                {cert.status === "-" ? (
                                  <span>-</span>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <span
                                      className={`px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${
                                        cert.status === "Aktif"
                                          ? "bg-[#edf7ee] text-[#25974c]"
                                          : "bg-[#eff0f1] text-[#8c9197]"
                                      }`}
                                    >
                                      {cert.status}
                                    </span>
                                    {cert.expiryDate && (
                                      <span className="text-[11px] text-[#686e76]">
                                        {cert.expiryDate}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2 text-[#009ea9] font-medium">
                                  {cert.docUrl && (
                                    <a href={cert.docUrl} className="hover:underline">
                                      Lihat doc.
                                    </a>
                                  )}
                                  {cert.docUrl && cert.webUrl && (
                                    <span className="text-[#d5d7d9]">|</span>
                                  )}
                                  {cert.webUrl && (
                                    <a
                                      href={cert.webUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="hover:underline"
                                    >
                                      Lihat di Web
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2 text-[#686e76]">
                                  <button
                                    type="button"
                                    className="p-1 hover:text-[#009ea9] transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 size={16} variant="Linear" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setCertificates((prev) =>
                                        prev.filter((c) => c.id !== cert.id)
                                      )
                                    }
                                    className="p-1 hover:text-[#ee3124] transition-colors"
                                    title="Hapus"
                                  >
                                    <Trash size={16} variant="Linear" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 2: HARGA & STOK */}
            {/* ======================================================== */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                {/* Card 1: Harga Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Harga Produk</h2>

                  {/* Dismissible Alert Banner */}
                  {showAlertBanner && (
                    <div className="mb-6 flex items-center justify-between rounded-[8px] border border-[#fec84b] bg-[#fffcf5] p-3 text-xs text-[#b54708]">
                      <div className="flex items-center gap-2">
                        <Danger size={18} variant="Bulk" color="#f79009" className="shrink-0" />
                        <span>
                          Mulai 1 Oktober 2024 terdapat perubahan biaya transaksi penjual.{" "}
                          <a href="#biaya" className="font-bold underline hover:text-[#7a2e0e]">
                            Lihat Selengkapnya
                          </a>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowAlertBanner(false)}
                        className="text-[#b54708] hover:text-[#7a2e0e] transition-colors"
                      >
                        <CloseCircle size={18} variant="Linear" />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-5">
                    {/* Jenis Harga */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-[#444b55]">Jenis Harga</span>
                        <span className="text-xs text-[#ee3124] italic">Wajib</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                        <button
                          type="button"
                          onClick={() => setPriceType("normal")}
                          className={`flex items-center gap-3 rounded-[8px] border p-3.5 transition-all cursor-pointer ${
                            priceType === "normal"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div
                            className={`flex size-4.5 items-center justify-center rounded-full border ${
                              priceType === "normal"
                                ? "border-[#009ea9]"
                                : "border-[#b1b4b8]"
                            }`}
                          >
                            {priceType === "normal" && (
                              <div className="size-2 rounded-full bg-[#009ea9]" />
                            )}
                          </div>
                          <span className="font-bold text-sm text-[#444b55]">Harga Normal</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPriceType("tempo")}
                          className={`flex items-center gap-3 rounded-[8px] border p-3.5 transition-all cursor-pointer ${
                            priceType === "tempo"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div
                            className={`flex size-4.5 items-center justify-center rounded-full border ${
                              priceType === "tempo"
                                ? "border-[#009ea9]"
                                : "border-[#b1b4b8]"
                            }`}
                          >
                            {priceType === "tempo" && (
                              <div className="size-2 rounded-full bg-[#009ea9]" />
                            )}
                          </div>
                          <span className="font-bold text-sm text-[#444b55]">Harga Tempo</span>
                        </button>
                      </div>
                    </div>

                    {/* Harga Satuan Diluar PPN */}
                    <TextField
                      label="Harga Satuan Diluar PPN"
                      required
                      prefix="Rp"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />

                    {/* Tampilkan Harga Diskon */}
                    <div className="flex flex-col gap-3 rounded-[8px] border border-[#e7e8e9] bg-[#f9fafa] p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#444b55]">Tampilkan Harga Diskon</span>
                        <Switch
                          checked={showDiscount}
                          onCheckedChange={setShowDiscount}
                        />
                      </div>

                      {showDiscount && (
                        <div className="flex flex-wrap items-end gap-4 pt-2">
                          <div className="flex-1 min-w-[200px]">
                            <TextField
                              label="Harga Sebelum Diskon"
                              required
                              prefix="Rp"
                              value={priceBeforeDiscount}
                              onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                            />
                          </div>

                          {/* Pratinjau Harga Diskon Box */}
                          <div className="flex flex-col gap-1.5">
                            <span className="text-xs font-medium text-[#686e76]">
                              Pratinjau Harga Diskon
                            </span>
                            <div className="flex h-11 items-center gap-2 rounded-[4px] border border-[#d5d7d9] bg-[#ffffff] px-3 text-sm">
                              <span className="font-bold text-[#444b55]">Rp{unitPrice}</span>
                              <span className="rounded bg-[#ee3124]/10 px-1 text-[11px] font-bold text-[#ee3124]">
                                50%
                              </span>
                              <span className="text-xs text-[#8c9197] line-through">
                                Rp{priceBeforeDiscount}
                              </span>
                            </div>
                          </div>

                          {/* Estimasi Pendapatan Box */}
                          <div className="flex h-11 items-center gap-2 rounded-[4px] bg-[#edf7ee] px-4 text-sm font-semibold text-[#25974c]">
                            <InfoCircle size={18} variant="Bulk" color="#25974c" />
                            <span>Estimasi pendapatan</span>
                            <span className="font-bold">Rp{unitPrice}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barang / Jasa Dikenakan PPN */}
                    <div className="flex flex-col gap-2 pt-2">
                      <span className="font-bold text-sm text-[#444b55]">
                        Barang / Jasa Dikenakan PPN
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* PPN 12% */}
                        <button
                          type="button"
                          onClick={() => setPpnType("ppn12")}
                          className={`flex flex-col p-4 rounded-[8px] border text-left transition-all cursor-pointer ${
                            ppnType === "ppn12"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div
                              className={`flex size-4 items-center justify-center rounded-full border ${
                                ppnType === "ppn12"
                                  ? "border-[#009ea9]"
                                  : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "ppn12" && (
                                <div className="size-2 rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-bold text-sm text-[#444b55]">PPN 12%</span>
                          </div>
                          <span className="text-xs text-[#686e76] leading-relaxed">
                            Transaksi dikenakan PPN 12% sesuai ketentuan PMK No. 131 Tahun 2024.
                          </span>
                        </button>

                        {/* PPN 1.1% */}
                        <button
                          type="button"
                          onClick={() => setPpnType("ppn1")}
                          className={`flex flex-col p-4 rounded-[8px] border text-left transition-all cursor-pointer ${
                            ppnType === "ppn1"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div
                              className={`flex size-4 items-center justify-center rounded-full border ${
                                ppnType === "ppn1"
                                  ? "border-[#009ea9]"
                                  : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "ppn1" && (
                                <div className="size-2 rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-bold text-sm text-[#444b55]">PPN 1.1%</span>
                          </div>
                          <span className="text-xs text-[#686e76] leading-relaxed">
                            Transaksi dikenakan PPN 1,1% dan wajib dilaporkan secara mandiri oleh pembeli.
                          </span>
                        </button>

                        {/* Tidak Dikenakan PPN */}
                        <button
                          type="button"
                          onClick={() => setPpnType("noppn")}
                          className={`flex flex-col p-4 rounded-[8px] border text-left transition-all cursor-pointer ${
                            ppnType === "noppn"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <div
                              className={`flex size-4 items-center justify-center rounded-full border ${
                                ppnType === "noppn"
                                  ? "border-[#009ea9]"
                                  : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "noppn" && (
                                <div className="size-2 rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-bold text-sm text-[#444b55]">Tidak Dikenakan PPN</span>
                          </div>
                          <span className="text-xs text-[#686e76] leading-relaxed">
                            Harga Barang / Jasa tidak dikenakan PPN.
                          </span>
                        </button>
                      </div>

                      <span className="text-xs text-[#686e76] mt-1">
                        Pastikan pemilihan pengenaan PPN pada barang/jasa Anda sesuai dengan peraturan perundangan yang berlaku.{" "}
                        <a href="#ppn-info" className="text-[#009ea9] font-semibold hover:underline">
                          Daftar Barang/Jasa Dikecualikan PPN
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Stok Produk */}
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Stok Produk</h2>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <TextField
                        label="Stok Unit"
                        required
                        suffix="Pack"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                      <TextField
                        label="Minimum Pembelian"
                        required
                        suffix="Pack"
                        value={minPurchase}
                        onChange={(e) => setMinPurchase(e.target.value)}
                      />
                    </div>

                    <Checkbox
                      id="stock-always"
                      checked={stockAlwaysAvailable}
                      onCheckedChange={(c) => setStockAlwaysAvailable(Boolean(c))}
                      text="Stok Selalu Tersedia"
                    />

                    {/* Pre-Order Toggle Card */}
                    <div className="rounded-[8px] border border-[#e7e8e9] bg-[#f9fafa] p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#444b55]">Pre-Order</span>
                          <span className="text-xs text-[#686e76]">
                            Jika kamu memerlukan waktu pengiriman yang lebih lama, silakan aktifkan opsi Pre Order.
                          </span>
                        </div>
                        <Switch checked={isPreOrder} onCheckedChange={setIsPreOrder} />
                      </div>

                      {isPreOrder && (
                        <div className="pt-2">
                          <TextField
                            label="Waktu Proses"
                            required
                            suffix="Hari"
                            value={processDays}
                            onChange={(e) => setProcessDays(e.target.value)}
                            hint="Waktu proses wajib diisi untuk memberikan perkiraan lama pemrosesan pesanan. Maksimal 180 hari."
                            showHint
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 3: PENGIRIMAN */}
            {/* ======================================================== */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Pengiriman</h2>

                  <div className="flex flex-col gap-5">
                    {/* Berat Produk */}
                    <div className="flex flex-col gap-1">
                      <TextField
                        label="Berat Produk"
                        required
                        suffix={weightUnit}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        hint="Perhatikan dengan baik berat produk agar tidak terjadi selisih data dengan pihak kurir."
                        showHint
                      />
                    </div>

                    {/* Dimensi */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-[#444b55]">Dimensi</span>
                        <span className="text-xs text-[#ee3124] italic">Wajib</span>
                      </div>
                      <p className="text-xs text-[#686e76]">
                        Masukkan ukuran produk setelah dikemas untuk menghitung berat volume. Jika terdapat angka desimal, mohon dibulatkan ke atas.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                        <TextField
                          label="Panjang"
                          suffix="CM"
                          value={pkgLength}
                          onChange={(e) => setPkgLength(e.target.value)}
                        />
                        <TextField
                          label="Lebar"
                          suffix="CM"
                          value={pkgWidth}
                          onChange={(e) => setPkgWidth(e.target.value)}
                        />
                        <TextField
                          label="Tinggi"
                          suffix="CM"
                          value={pkgHeight}
                          onChange={(e) => setPkgHeight(e.target.value)}
                        />

                        {/* Berat Volume Box */}
                        <div className="flex h-11 items-center justify-center rounded-[6px] bg-[#eff0f1] px-4 text-xs font-semibold text-[#444b55]">
                          <span>Berat Volume :&nbsp;</span>
                          <span className="font-bold text-[#182958]">{calculatedVolumeWeight} Kilogram</span>
                        </div>
                      </div>

                      <span className="text-xs text-[#686e76] mt-1">
                        Ongkir dihitung berdasarkan berat volume ({calculatedVolumeWeight} kilogram) karena lebih besar dari berat aktual.
                      </span>
                    </div>

                    {/* Gratis Ongkos Kirim Toggle */}
                    <div className="rounded-[8px] border border-[#e7e8e9] bg-[#f9fafa] p-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#444b55]">Gratis Ongkos Kirim</span>
                        <span className="text-xs text-[#686e76]">
                          Jika Gratis Ongkir aktif, ongkir ditanggung penjual dan dipotong dari total penjualan.
                        </span>
                      </div>
                      <Switch
                        checked={isFreeShipping}
                        onCheckedChange={setIsFreeShipping}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 4: VISIBILITAS / LAINNYA */}
            {/* ======================================================== */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div className="rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] p-6 shadow-xs">
                  <h2 className="mb-4 text-base font-bold text-[#444b55]">Visibilitas Produk</h2>

                  <div className="flex flex-col gap-6">
                    {/* Jenis Visibilitas Produk */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-[#444b55]">Jenis Visibilitas Produk</span>
                        <span className="text-xs text-[#ee3124] italic">Wajib</span>
                      </div>
                      <span className="text-xs text-[#686e76]">
                        Tentukan jenis visibilitas produk dari sistem pencarian dan halaman penjual PaDi UMKM
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md pt-1">
                        {/* Option: Publik */}
                        <button
                          type="button"
                          onClick={() => setVisibilityType("publik")}
                          className={`flex items-center gap-3 rounded-[8px] border p-3.5 transition-all cursor-pointer ${
                            visibilityType === "publik"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div
                            className={`flex size-4.5 items-center justify-center rounded-full border ${
                              visibilityType === "publik"
                                ? "border-[#009ea9]"
                                : "border-[#b1b4b8]"
                            }`}
                          >
                            {visibilityType === "publik" && (
                              <div className="size-2 rounded-full bg-[#009ea9]" />
                            )}
                          </div>
                          <span className="font-bold text-sm text-[#444b55]">Publik</span>
                        </button>

                        {/* Option: Privat */}
                        <button
                          type="button"
                          onClick={() => setVisibilityType("privat")}
                          className={`flex items-center gap-3 rounded-[8px] border p-3.5 transition-all cursor-pointer ${
                            visibilityType === "privat"
                              ? "border-[#009ea9] bg-[#009ea9]/5 ring-1 ring-[#009ea9]"
                              : "border-[#d5d7d9] bg-[#ffffff] hover:border-[#b1b4b8]"
                          }`}
                        >
                          <div
                            className={`flex size-4.5 items-center justify-center rounded-full border ${
                              visibilityType === "privat"
                                ? "border-[#009ea9]"
                                : "border-[#b1b4b8]"
                            }`}
                          >
                            {visibilityType === "privat" && (
                              <div className="size-2 rounded-full bg-[#009ea9]" />
                            )}
                          </div>
                          <span className="font-bold text-sm text-[#444b55]">Privat</span>
                        </button>
                      </div>
                    </div>

                    {/* Daftar BUMN yang diizinkan */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-sm text-[#444b55]">Daftar BUMN yang diizinkan</span>
                        <span className="text-xs text-[#8c9197] italic">Opsional</span>
                      </div>
                      <span className="text-xs text-[#686e76]">
                        Anda dapat secara opsional menentukan BUMN mana saja yang dapat mengakses produk Anda
                      </span>

                      {/* Chip Multi-select Box */}
                      <div className="flex min-h-11 flex-wrap items-center gap-2 rounded-[4px] border border-[#d5d7d9] bg-[#ffffff] p-2">
                        {allowedBumnList.map((bumn) => (
                          <Chip
                            key={bumn}
                            label={bumn}
                            type="soft"
                            color="grey"
                            size="md"
                            removable
                            onDismiss={() => handleRemoveBumn(bumn)}
                          />
                        ))}

                        {/* Quick Add BUMN Select Dropdown if less than 5 */}
                        {allowedBumnList.length < 5 && (
                          <div className="w-44 ml-auto">
                            <SelectField
                              size="sm"
                              placeholder="+ Tambah BUMN"
                              value=""
                              onChange={(val) => handleAddBumn(val)}
                              options={[
                                { label: "Bank Mandiri", value: "Bank Mandiri" },
                                { label: "BRI", value: "BRI" },
                                { label: "KAI", value: "KAI" },
                                { label: "Garuda Indonesia", value: "Garuda Indonesia" },
                                { label: "Pos Indonesia", value: "Pos Indonesia" },
                                { label: "Bio Farma", value: "Bio Farma" },
                              ].filter((opt) => !allowedBumnList.includes(opt.value))}
                            />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-[#8c9197]">Maksimal 5 BUMN</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Sticky Bottom Action Bar */}
      <footer className="sticky bottom-0 z-30 flex items-center justify-end gap-3 border-t border-[#e7e8e9] bg-[#ffffff] px-8 py-3.5 shadow-lg">
        {currentStep > 1 && (
          <Button variant="outline" size="md" onClick={handlePrev}>
            Kembali
          </Button>
        )}
        <Button
          variant="outline"
          size="md"
          onClick={() => showToast("Draf produk berhasil disimpan!")}
        >
          Simpan Draft
        </Button>
        <Button variant="primary" size="md" onClick={handleNext}>
          {currentStep === 4 ? "Selesai" : "Selanjutnya"}
        </Button>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onAdd={(newCert) => {
          setCertificates((prev) => [...prev, newCert]);
          showToast("Sertifikat berhasil ditambahkan!");
        }}
      />

      {/* Publish Success Celebration Modal */}
      <PublishSuccessModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        productData={{
          name: productName,
          category,
          price: unitPrice,
          stock,
          imageUrl: photos[0]?.url,
        }}
        onReset={handleResetForm}
      />
    </div>
  );
}
