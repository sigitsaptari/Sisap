import { useState, useMemo, useRef, useEffect } from "react";
import {
  Danger,
  CloseCircle,
  TickCircle,
  ArrowDown2,
  SearchNormal1,
} from "iconsax-react";
import {
  Button,
  TextField,
  SelectField,
  RichTextEditor,
  Uploader,
  Switch,
  Checkbox,
  RadioCard,
  Chip,
  Divider,
  cn,
  type UploaderFile,
} from "@sisapds/react";
import { PublishSuccessModal } from "./PublishSuccessModal";

const BUMN_OPTIONS = [
  { label: "Telkom Indonesia", value: "Telkom Indonesia" },
  { label: "Pertamina", value: "Pertamina" },
  { label: "Pelni", value: "Pelni" },
  { label: "PLN", value: "PLN" },
  { label: "Bank Mandiri", value: "Bank Mandiri" },
  { label: "BRI", value: "BRI" },
  { label: "BNI", value: "BNI" },
  { label: "BTN", value: "BTN" },
  { label: "KAI", value: "KAI" },
  { label: "Garuda Indonesia", value: "Garuda Indonesia" },
  { label: "Pos Indonesia", value: "Pos Indonesia" },
  { label: "Bio Farma", value: "Bio Farma" },
  { label: "Pupuk Indonesia", value: "Pupuk Indonesia" },
  { label: "Semen Indonesia (SIG)", value: "Semen Indonesia (SIG)" },
  { label: "Kimia Farma", value: "Kimia Farma" },
  { label: "Jasa Marga", value: "Jasa Marga" },
  { label: "Antam", value: "Antam" },
  { label: "Krakatau Steel", value: "Krakatau Steel" },
];

const COURIER_OPTIONS = [
  { label: "JNE", value: "jne" },
  { label: "J&T Express", value: "jnt" },
  { label: "SiCepat", value: "sicepat" },
  { label: "Anteraja", value: "anteraja" },
  { label: "Pos Indonesia", value: "pos" },
];

function formatCurrency(val: string): string {
  const digits = val.replace(/\D/g, "");
  if (!digits) return "";
  return new Intl.NumberFormat("id-ID").format(parseInt(digits, 10));
}

interface Prototype2Props {
  onShowToast?: (msg: string) => void;
}

export function Prototype2({ onShowToast }: Prototype2Props) {
  // ----------------------------------------------------
  // FORM STATE
  // ----------------------------------------------------
  const [productType, setProductType] = useState<"Barang" | "Jasa">("Barang");
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [unitType, setUnitType] = useState("");
  const [sku, setSku] = useState("");
  const [isPdn, setIsPdn] = useState(false);
  const [pph, setPph] = useState("");
  const [description, setDescription] = useState("");

  // Media
  const [photos, setPhotos] = useState<UploaderFile[]>([]);
  const [video, setVideo] = useState<UploaderFile[]>([]);

  // Harga & Diskon
  const [showAlertBanner, setShowAlertBanner] = useState(true);
  const [priceType, setPriceType] = useState<"normal" | "tempo">("normal");
  const [unitPrice, setUnitPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [ppnType, setPpnType] = useState<"ppn12" | "ppn1" | "noppn">("ppn12");

  // Perhitungan diskon & estimasi pendapatan (Harga Produk 6923:24880)
  const { discountPercent, estimatedIncome, showDiscountCaption } = useMemo(() => {
    const hasPriceInput = unitPrice.trim().length > 0;
    const hasDiscountInput = discountPrice.trim().length > 0;

    // Jika dua-duanya belum diisi, gunakan baseline placeholder (1.000.000 & 500.000)
    if (!hasPriceInput && !hasDiscountInput) {
      return {
        discountPercent: 50,
        estimatedIncome: "10.000.500.000",
        showDiscountCaption: true,
      };
    }

    const rawPrice = hasPriceInput ? parseInt(unitPrice.replace(/\D/g, ""), 10) || 0 : 1000000;
    const rawDiscount = hasDiscountInput ? parseInt(discountPrice.replace(/\D/g, ""), 10) || 0 : 0;

    let percent = 0;
    if (rawPrice > 0 && rawDiscount > 0) {
      percent = Math.round((rawDiscount / rawPrice) * 100);
    }

    const income = Math.max(0, rawPrice - rawDiscount);
    const formattedIncome = new Intl.NumberFormat("id-ID").format(income);

    return {
      discountPercent: percent,
      estimatedIncome: formattedIncome,
      showDiscountCaption: rawDiscount > 0 || (!hasPriceInput && !hasDiscountInput),
    };
  }, [unitPrice, discountPrice]);

  // Stok
  const [stock, setStock] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [stockAlwaysAvailable, setStockAlwaysAvailable] = useState(false);
  const [isPreOrder, setIsPreOrder] = useState(true);
  const [processDays, setProcessDays] = useState("30");

  // Pengiriman
  const [weight, setWeight] = useState("");
  const [pkgLength, setPkgLength] = useState("");
  const [pkgWidth, setPkgWidth] = useState("");
  const [pkgHeight, setPkgHeight] = useState("");
  const [courier, setCourier] = useState("");
  const [isFreeShipping, setIsFreeShipping] = useState(false);

  // Volume weight calculation: (P x L x T) / 6000
  const calculatedVolumeWeight = useMemo(() => {
    const hasDimensions = pkgLength !== "" || pkgWidth !== "" || pkgHeight !== "";
    const l = parseFloat(pkgLength) || (hasDimensions ? 0 : 30);
    const w = parseFloat(pkgWidth) || (hasDimensions ? 0 : 30);
    const h = parseFloat(pkgHeight) || (hasDimensions ? 0 : 30);
    const vol = (l * w * h) / 6000;
    return vol > 0 ? (Number.isInteger(vol) ? vol.toString() : vol.toFixed(1)) : "4.5";
  }, [pkgLength, pkgWidth, pkgHeight]);

  // Visibilitas
  const [visibilityType, setVisibilityType] = useState<"publik" | "privat">("publik");
  const [allowedBumnList, setAllowedBumnList] = useState<string[]>([
    "Telkom Indonesia",
    "Pertamina",
    "Pelni",
  ]);
  const [isBumnDropdownOpen, setIsBumnDropdownOpen] = useState(false);
  const [bumnSearch, setBumnSearch] = useState("");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const bumnDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close BUMN dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bumnDropdownRef.current && !bumnDropdownRef.current.contains(event.target as Node)) {
        setIsBumnDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredBumnOptions = useMemo(() => {
    const query = bumnSearch.toLowerCase().trim();
    return BUMN_OPTIONS.filter((opt) => opt.label.toLowerCase().includes(query));
  }, [bumnSearch]);

  const handleToggleBumn = (bumnValue: string) => {
    if (allowedBumnList.includes(bumnValue)) {
      setAllowedBumnList((prev) => prev.filter((item) => item !== bumnValue));
    } else if (allowedBumnList.length < 5) {
      setAllowedBumnList((prev) => [...prev, bumnValue]);
    }
  };

  const handleRemoveBumn = (bumnValue: string) => {
    setAllowedBumnList((prev) => prev.filter((item) => item !== bumnValue));
  };

  const handleSaveDraft = () => {
    onShowToast?.("Draf produk berhasil disimpan!");
  };

  const handleResetForm = () => {
    setProductName("");
    setCategory("");
    setBrand("");
    setUnitType("");
    setSku("");
    setIsPdn(false);
    setPph("");
    setDescription("");
    setPhotos([]);
    setVideo([]);
    setUnitPrice("");
    setDiscountPrice("");
    setStock("");
    setMinPurchase("");
    setWeight("");
    setPkgLength("");
    setPkgWidth("");
    setPkgHeight("");
    setCourier("");
    onShowToast?.("Formulir telah di-reset untuk produk baru!");
  };

  return (
    <div className="animate-in fade-in flex w-full flex-col gap-32 duration-200">
      {/* ======================================================== */}
      {/* TOP HEADER: Title + Actions (Figma node 6901:10015) */}
      {/* ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16">
        <h1 className="font-sans text-[24px] leading-[32px] font-bold text-primary">
          Tambah Produk
        </h1>
        <div className="flex items-center gap-16 shrink-0">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={handleSaveDraft}
            className="h-10 rounded-sm border border-action-primary bg-white px-12 py-8 text-sm font-medium text-action-primary hover:bg-surface-sunken"
          >
            Simpan & Tambah Baru
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => setIsPublishModalOpen(true)}
            className="h-10 rounded-sm bg-action-primary px-12 py-8 text-sm font-medium text-white hover:bg-action-hover"
          >
            Simpan
          </Button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 1: JENIS PRODUK (Figma node 6901:13166) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Jenis Produk
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col sm:flex-row gap-24 p-24">
          {/* Option: Barang (Figma 6901:13127) */}
          <div
            onClick={() => setProductType("Barang")}
            className={cn(
              "flex h-[60px] flex-1 cursor-pointer items-center justify-between rounded-sm border px-12 py-8 transition-all select-none",
              productType === "Barang"
                ? "border-action-primary bg-white"
                : "border-border-primary bg-white hover:border-placeholder",
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-16">
              {/* Device icon (40x40) */}
              <div className="relative flex size-[40px] shrink-0 items-center justify-center">
                <svg
                  className="size-[40px]"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M26.6667 3.33333H10C4.66667 3.33333 3.33333 4.66667 3.33333 10V19.8334C3.38333 24.8834 4.78333 26.1667 10 26.1667H13.75V32.0833H8.25002C7.56669 32.0833 7.00002 32.65 7.00002 33.3333C7.00002 34.0167 7.56669 34.5833 8.25002 34.5833H20.4167C20.1667 33.9333 20.05 33.1167 20.0333 32.0833H16.25V26.1667H20.0333V19.8334V17.65C20.0333 14.0834 21.2167 12.9 24.7833 12.9H31.9167C32.4333 12.9 32.9167 12.9333 33.3333 12.9833V10C33.3333 4.66667 32 3.33333 26.6667 3.33333Z"
                    fill="#009EA9"
                  />
                  <path
                    d="M33.3333 12.9833C32.9167 12.9333 32.4333 12.9 31.9167 12.9H24.7833C21.2167 12.9 20.0333 14.0834 20.0333 17.65V32.0833C20.05 33.1167 20.1667 33.9333 20.4167 34.5833C21 36.1 22.3167 36.6667 24.7833 36.6667H31.9167C35.4833 36.6667 36.6667 35.4834 36.6667 31.9167V17.65C36.6667 14.6 35.8 13.3 33.3333 12.9833ZM28.35 16.8167C29.8 16.8167 30.9666 17.9833 30.9666 19.4333C30.9666 20.8833 29.8 22.05 28.35 22.05C26.9 22.05 25.7333 20.8833 25.7333 19.4333C25.7333 17.9833 26.9 16.8167 28.35 16.8167ZM28.35 31.9167C26.3834 31.9167 24.7833 30.3167 24.7833 28.35C24.7833 27.5333 25.0667 26.7667 25.5333 26.1667C26.1833 25.3334 27.2 24.7833 28.35 24.7833C29.25 24.7833 30.0667 25.1167 30.6833 25.65C31.4333 26.3167 31.9167 27.2834 31.9167 28.35C31.9167 30.3167 30.3167 31.9167 28.35 31.9167Z"
                    fill="#009EA9"
                  />
                  <path
                    opacity="0.4"
                    d="M31.9167 28.35C31.9167 30.3167 30.3167 31.9167 28.35 31.9167C26.3834 31.9167 24.7833 30.3167 24.7833 28.35C24.7833 27.5333 25.0667 26.7667 25.5333 26.1667C26.1833 25.3334 27.2 24.7833 28.35 24.7833C29.25 24.7833 30.0667 25.1167 30.6833 25.65C31.4333 26.3167 31.9167 27.2833 31.9167 28.35Z"
                    fill="#009EA9"
                  />
                  <path
                    opacity="0.4"
                    d="M28.35 22.05C29.7952 22.05 30.9666 20.8784 30.9666 19.4333C30.9666 17.9881 29.7952 16.8167 28.35 16.8167C26.9049 16.8167 25.7333 17.9881 25.7333 19.4333C25.7333 20.8784 26.9049 22.05 28.35 22.05Z"
                    fill="#009EA9"
                  />
                </svg>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4 text-left">
                <p className="font-sans text-[12px] leading-[18px] font-medium text-primary">
                  Barang
                </p>
                <p className="font-sans text-[12px] leading-[18px] font-normal text-primary">
                  Berupa produk fisik yang memiliki dimensi berat, panjang dan lebar
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex size-[20px] shrink-0 items-center justify-center rounded-sm drop-shadow-[0px_1px_1px_rgba(31,41,55,0.08)]",
                productType === "Barang"
                  ? "bg-action-primary"
                  : "border border-placeholder bg-white",
              )}
            >
              {productType === "Barang" && (
                <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="white"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Option: Jasa (Figma 6901:13134) */}
          <div
            onClick={() => setProductType("Jasa")}
            className={cn(
              "flex h-[60px] flex-1 cursor-pointer items-center justify-between rounded-sm border px-12 py-8 transition-all select-none",
              productType === "Jasa"
                ? "border-action-primary bg-white"
                : "border-border-primary bg-white hover:border-placeholder",
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-16">
              {/* Jasa icon (40x40) */}
              <div className="relative flex size-[40px] shrink-0 items-center justify-center">
                <svg
                  className="h-[40.5px] w-[36.24px]"
                  viewBox="0 0 36.242 40.5026"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M32.3495 16.2763C31.7667 15.4395 30.7357 14.9614 29.5553 14.9614H23.429C23.0256 14.9614 22.652 14.797 22.398 14.4981C22.1291 14.1993 22.0245 13.7809 22.0842 13.3476L21.6821 11.9344C22.0108 10.4701 21.0396 8.82643 19.5752 8.33334C18.2155 7.82531 16.6167 8.51264 15.9742 9.48388L10.8328 15.3648L10.6535 15.6636V28.8724L10.8777 29.0966L15.6143 32.7574C16.2419 33.3849 17.6614 33.7286 18.6625 33.7286H24.4899C26.4921 33.7286 28.5093 32.2195 28.9576 30.3816L32.6333 19.19C33.0218 18.1291 32.9172 17.0981 32.3495 16.2763Z"
                    fill="#444B55"
                  />
                  <path
                    d="M24.8793 6.63772L25.9535 10.6466L29.9623 9.5724L32.571 5.05417C33.5229 6.23132 34.2856 10.5623 32.6552 13.3862C31.0248 16.2101 27.3275 16.9621 25.8864 16.6321L20.8034 13.6975C19.7971 12.6144 18.5997 9.03647 20.23 6.21257C22.4474 2.37207 25.9925 1.88364 27.4879 2.11949L24.8793 6.63772Z"
                    fill="#182958"
                  />
                  <path
                    d="M7.78483 10.8224H6.24579C3.92977 10.8224 2.98842 11.7189 2.98842 13.9303V28.9621C2.98842 31.1735 3.92977 32.07 6.24579 32.07H7.78483C10.1009 32.07 11.0422 31.1735 11.0422 28.9621V13.9303C11.0422 11.7189 10.1009 10.8224 7.78483 10.8224Z"
                    fill="#444B55"
                  />
                  <path
                    d="M12.4197 38.5083C12.097 38.3219 11.8219 38.1053 11.5882 37.8688C9.66102 35.9186 11.3483 32.8874 13.1097 30.7862L18.7622 34.0497C17.8232 36.6257 16.0418 39.6025 13.3893 38.9087C13.0676 38.8246 12.7425 38.6946 12.4197 38.5083Z"
                    fill="#182958"
                  />
                </svg>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-4 text-left">
                <p className="font-sans text-[12px] leading-[18px] font-medium text-primary">
                  Jasa
                </p>
                <p className="font-sans text-[12px] leading-[18px] font-normal text-primary">
                  Berupa produk non-fisik dalam bentuk layanan
                </p>
              </div>
            </div>
            <div
              className={cn(
                "flex size-[20px] shrink-0 items-center justify-center rounded-sm drop-shadow-[0px_1px_1px_rgba(31,41,55,0.08)]",
                productType === "Jasa"
                  ? "bg-action-primary"
                  : "border border-placeholder bg-white",
              )}
            >
              {productType === "Jasa" && (
                <svg className="size-[16px]" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13.3333 4L6 11.3333L2.66667 8"
                    stroke="white"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 2: INFORMASI PRODUK (Figma node 6935:6833) */}
      {/* ======================================================== */}
      <div className="w-full rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Informasi Produk
          </h2>
        </div>
        <Divider />
        <div className="flex flex-col gap-24 p-24">
          {/* Nama Produk */}
          <TextField
            label="Nama Produk"
            required
            description="Min. 5 karakter: Masukkan merek, jenis, warna, bahan, atau tipe. Hindari huruf kapital berlebih, multi-merek, dan kata promosi."
            placeholder="MacBook Pro M5 14-Inch 16/512GB 16/1TB 24/1TB Space Black Silver - 16/1 TB IBOX Original Space Grey "
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            maxLength={100}
            suffix={`${productName.length}/100`}
          />

          {/* 3 Column Select Fields (Kategori, Brand, Satuan) */}
          <div className="relative z-20 flex flex-col md:flex-row w-full items-start gap-24">
            <div className="min-w-0 flex-1 w-full">
              <SelectField
                label="Kategori Produk"
                placeholder="Pilih Kategori Produk"
                placeholderClassName="text-primary"
                value={category}
                onChange={(val) => setCategory(String(val))}
                options={[
                  {
                    label: "Furniture/Furniture Perkantoran",
                    value: "Furniture/Furniture Perkantoran",
                  },
                  {
                    label: "Elektronik/Komputer & Laptop",
                    value: "Elektronik/Komputer & Laptop",
                  },
                  { label: "Peralatan Kantor (ATK)", value: "Peralatan Kantor (ATK)" },
                  { label: "Makanan & Minuman", value: "Makanan & Minuman" },
                ]}
              />
            </div>

            <div className="w-full md:w-[300px] shrink-0">
              <SelectField
                label="Brand Produk"
                placeholder="Pilih Brand Produk"
                placeholderClassName="text-primary"
                value={brand}
                onChange={(val) => setBrand(String(val))}
                options={[
                  { label: "Fantech", value: "Fantech" },
                  { label: "Apple", value: "Apple" },
                  { label: "Asus", value: "Asus" },
                  { label: "Lenovo", value: "Lenovo" },
                  { label: "Samsung", value: "Samsung" },
                ]}
              />
            </div>

            <div className="w-full md:w-[233.33px] shrink-0">
              <SelectField
                label="Jenis Satuan Produk"
                placeholder="Pilih Jenis Satuan Produk"
                placeholderClassName="text-primary"
                value={unitType}
                onChange={(val) => setUnitType(String(val))}
                options={[
                  { label: "Unit", value: "Unit" },
                  { label: "Pcs", value: "Pcs" },
                  { label: "Box", value: "Box" },
                  { label: "Pack", value: "Pack" },
                  { label: "Lusin", value: "Lusin" },
                ]}
              />
            </div>
          </div>

          {/* Deskripsi Produk */}
          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
                Deskripsi Produk
              </span>
              <span className="font-sans text-[14px] leading-[21px] font-medium text-error">
                *
              </span>
            </div>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Laptop handal dengan desain tipis, performa cepat, baterai awet, cocok untuk kerja dan belajar."
              maxLength={2600}
            />
            <div className="flex justify-end pt-1">
              <span className="font-sans text-[12px] leading-[18px] text-placeholder">
                {description.replace(/<[^>]*>/g, "").length}/2600
              </span>
            </div>
          </div>

          {/* 2 Column (Kode SKU & Pajak Penghasilan) */}
          <div className="flex flex-col md:flex-row w-full items-start gap-24">
            <div className="flex-1 w-full">
              <TextField
                label="Kode SKU"
                optional
                description="Kode unik untuk melacak varian produk di inventaris."
                placeholder="0"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full">
              <SelectField
                label="Pajak Penghasilan (PPh)"
                placeholder="Pilih Pajak Penghasilan (PPh)"
                placeholderClassName="text-primary"
                value={pph}
                onChange={(val) => setPph(String(val))}
                options={[
                  { label: "PPh 21 (0.5%)", value: "pph21" },
                  { label: "PPh 22 (1.5%)", value: "pph22" },
                  { label: "PPh 23 (2%)", value: "pph23" },
                  { label: "Bebas PPh", value: "none" },
                ]}
              />
            </div>
          </div>

          {/* Checkbox: Produk Dalam Negeri (PDN) */}
          <div className="flex flex-col gap-4 pt-8">
            <Checkbox
              id="pdn-checkbox-p2"
              checked={isPdn}
              onCheckedChange={(checked) => setIsPdn(Boolean(checked))}
              size="md"
              text="Produk Dalam Negeri (PDN)"
            />
            <p className="pl-32 font-sans text-[14px] leading-[21px] font-normal text-secondary">
              Barang dan jasa produksi Indonesia yang memanfaatkan tenaga kerja serta bahan baku dalam negeri.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 3: MEDIA PRODUK (Figma node 6923:25642) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Media Produk
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col lg:flex-row gap-24 p-24 items-start w-full">
          {/* Kolom Kiri: Foto Produk */}
          <div className="flex-1 min-w-0 w-full">
            <Uploader
              type="image"
              label="Foto Produk"
              required
              maxFiles={5}
              files={photos}
              onChange={setPhotos}
              slotLabels={["Foto Utama", "Foto 1", "Foto 2", "Foto 3", "Foto 4"]}
              helperRules={[
                "Wajib memiliki 1 foto produk, maksimal pilih foto hingga 5 gambar.",
                "Resolusi minimal 1000 x 1000 px, ukuran disarankan 1 MB (maksimal 5 MB)",
                "Format gambar JPG/PNG.",
              ]}
            />
          </div>

          {/* Kolom Kanan: Video Produk */}
          <div className="w-full lg:w-[466px] shrink-0">
            <Uploader
              type="video"
              label="Video Produk"
              maxFiles={1}
              files={video}
              onChange={setVideo}
              slotLabels={["Tambah Video"]}
              helperRules={[
                "Video maksimum 10MB",
                "Format MPEG, MP4, AVI, Quicktime, dan lainnya.",
              ]}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 4: HARGA PRODUK (Figma node 6923:25072) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Harga Produk
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col gap-24 p-24">
          {/* Dismissible Alert Banner */}
          {showAlertBanner && (
            <div className="flex w-full items-center justify-between gap-12 rounded-lg border border-feedback-warning bg-feedback-warning-bg px-16 py-16">
              <div className="flex items-center gap-12">
                <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-feedback-warning text-white">
                  <Danger size={20} variant="Bulk" color="#ffffff" />
                </div>
                <p className="font-sans text-[14px] leading-[21px] text-primary">
                  Mulai 1 Oktober 2024 terdapat perubahan biaya transaksi penjual.{" "}
                  <a href="#biaya" className="font-medium text-action-primary hover:underline">
                    Lihat Selengkapnya
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAlertBanner(false)}
                className="flex size-24 shrink-0 cursor-pointer items-center justify-center text-primary transition-colors hover:text-black"
                aria-label="Tutup notifikasi"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* Jenis Harga */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
                Jenis Harga
              </span>
              <span className="font-sans text-[14px] leading-[21px] font-medium text-error">*</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-16">
              <RadioCard
                id="price-normal-p2"
                name="priceTypeP2"
                value="normal"
                checked={priceType === "normal"}
                onChange={() => setPriceType("normal")}
                label="Harga Normal"
                radioRight={false}
                className={cn(
                  "w-full sm:w-[200px] rounded-sm p-16",
                  priceType === "normal"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
              <RadioCard
                id="price-tempo-p2"
                name="priceTypeP2"
                value="tempo"
                checked={priceType === "tempo"}
                onChange={() => setPriceType("tempo")}
                label="Harga Tempo"
                radioRight={false}
                className={cn(
                  "w-full sm:w-[200px] rounded-sm p-16",
                  priceType === "tempo"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
            </div>
          </div>

          {/* Row: Harga Satuan, Diskon, Estimasi Pendapatan */}
          <div className="flex flex-col lg:flex-row items-start gap-24">
            <div className="w-full lg:w-[320px]">
              <TextField
                label="Harga Satuan diluar ppn"
                required
                prefix="Rp"
                placeholder="1.000.000"
                value={unitPrice}
                onChange={(e) => setUnitPrice(formatCurrency(e.target.value))}
              />
            </div>

            <div className="w-full lg:w-[320px]">
              <TextField
                label="Diskon"
                optional
                prefix="Rp"
                placeholder="500.000"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(formatCurrency(e.target.value))}
              />
              {showDiscountCaption && (
                <div className="mt-6 flex items-center gap-6">
                  <div className="flex size-14 items-center justify-center rounded-full bg-feedback-success text-white">
                    <svg
                      className="size-10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </div>
                  <span className="font-sans text-[12px] leading-[18px] font-medium text-feedback-success">
                    Persentase Diskon {discountPercent}%
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 items-end pt-24 w-full">
              <div className="flex h-[44px] w-full items-center justify-between rounded-md bg-[#e6f7f0] px-16 text-primary">
                <div className="flex items-center gap-6">
                  <span className="font-sans text-[14px] leading-[21px] text-primary">
                    Estimasi pendapatan
                  </span>
                  <div
                    className="flex size-16 items-center justify-center rounded-full border border-secondary text-[11px] text-secondary"
                    title="Perkiraan pendapatan bersih setelah diskon"
                  >
                    i
                  </div>
                </div>
                <span className="font-sans text-[16px] leading-[24px] font-bold text-[#008a4b]">
                  Rp{estimatedIncome}
                </span>
              </div>
            </div>
          </div>

          {/* PPN Section */}
          <div className="flex flex-col gap-12">
            <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
              Barang / Jasa Dikenakan PPN
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <RadioCard
                id="ppn-12-p2"
                name="ppnTypeP2"
                value="ppn12"
                checked={ppnType === "ppn12"}
                onChange={() => setPpnType("ppn12")}
                label="PPN 12%"
                description="Transaksi dikenakan PPN 12% sesuai ketentuan PMK No. 131 Tahun 2024."
                radioRight={false}
                className={cn(
                  "w-full rounded-sm p-16",
                  ppnType === "ppn12"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
              <RadioCard
                id="ppn-1-p2"
                name="ppnTypeP2"
                value="ppn1"
                checked={ppnType === "ppn1"}
                onChange={() => setPpnType("ppn1")}
                label="PPN 1.1%"
                description="Transaksi dikenakan PPN 1,1% dan wajib dilaporkan secara mandiri oleh pembeli."
                radioRight={false}
                className={cn(
                  "w-full rounded-sm p-16",
                  ppnType === "ppn1"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
              <RadioCard
                id="no-ppn-p2"
                name="ppnTypeP2"
                value="noppn"
                checked={ppnType === "noppn"}
                onChange={() => setPpnType("noppn")}
                label="Tidak Dikenakan PPN"
                description="Harga Barang / Jasa tidak dikenakan PPN."
                radioRight={false}
                className={cn(
                  "w-full rounded-sm p-16",
                  ppnType === "noppn"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
            </div>
            <p className="mt-4 font-sans text-[12px] leading-[18px] text-secondary">
              Pastikan pemilihan pengenaan PPN pada barang/jasa Anda sesuai dengan peraturan
              perundangan yang berlaku.{" "}
              <a href="#ppn-info" className="font-medium text-action-primary hover:underline">
                Daftar Barang/Jasa Dikecualikan PPN
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 5: STOK PRODUK (Figma node 6923:26267) */}
      {/* ======================================================== */}
      <div className="w-full overflow-hidden rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Stok Produk
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col gap-24 p-24">
          <div className="flex flex-col md:flex-row items-start gap-24">
            <div className="flex-1 w-full">
              <TextField
                label="Stok Unit"
                required
                placeholder="1"
                suffix="Pack"
                value={stock}
                onChange={(e) => setStock(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="flex-1 w-full">
              <TextField
                label="Minimum Pembelian"
                required
                placeholder="1"
                suffix="Pack"
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value.replace(/\D/g, ""))}
              />
            </div>
          </div>

          <div>
            <Checkbox
              id="stock-available-checkbox-p2"
              checked={stockAlwaysAvailable}
              onCheckedChange={(checked) => setStockAlwaysAvailable(Boolean(checked))}
              size="md"
              text="Stok Selalu Tersedia"
            />
          </div>

          {/* Pre-Order Section */}
          <div className="flex flex-col gap-16 rounded-md bg-surface-sunken p-16">
            <div className="flex flex-col gap-4">
              <Switch
                id="preorder-switch-p2"
                size="lg"
                label="Pre-Order"
                checked={isPreOrder}
                onCheckedChange={setIsPreOrder}
              />
              <p className="pl-48 font-sans text-[14px] leading-[21px] font-normal text-secondary">
                Jika kamu memerlukan waktu pengiriman yang lebih lama, silakan aktifkan opsi Pre Order.
              </p>
            </div>

            {isPreOrder && (
              <div className="mt-8 flex flex-col gap-8">
                <TextField
                  label="Waktu Proses"
                  required
                  placeholder="30"
                  suffix="Hari"
                  value={processDays}
                  onChange={(e) => setProcessDays(e.target.value.replace(/\D/g, ""))}
                />
                <p className="font-sans text-[12px] leading-[18px] text-secondary">
                  Waktu proses wajib diisi untuk memberikan perkiraan lama pemrosesan pesanan.
                  Maksimal 180 hari.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 6: PENGIRIMAN (Figma node 6923:27249) */}
      {/* ======================================================== */}
      <div className="w-full rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Pengiriman
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col gap-24 p-24">
          {/* Berat Produk */}
          <div className="flex flex-col gap-4">
            <TextField
              label="Berat Produk"
              required
              suffix="Gram"
              placeholder="30"
              value={weight}
              onChange={(e) => setWeight(e.target.value.replace(/\D/g, ""))}
            />
            <p className="font-sans text-[12px] leading-[18px] text-secondary">
              Perhatikan dengan baik berat produk agar tidak terjadi selisih data dengan pihak kurir.
            </p>
          </div>

          {/* Dimensi */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
                  Dimensi
                </span>
                <span className="font-sans text-[14px] leading-[21px] font-medium text-error">
                  *
                </span>
              </div>
              <span className="font-sans text-[12px] leading-[18px] text-secondary">
                Masukkan ukuran produk setelah dikemas untuk menghitung berat volume. Jika terdapat
                angka desimal, mohon dibulatkan ke atas.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 items-end">
              <div>
                <TextField
                  label="Panjang"
                  suffix="CM"
                  placeholder="30"
                  value={pkgLength}
                  onChange={(e) => setPkgLength(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <TextField
                  label="Lebar"
                  suffix="CM"
                  placeholder="30"
                  value={pkgWidth}
                  onChange={(e) => setPkgWidth(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <TextField
                  label="Tinggi"
                  suffix="CM"
                  placeholder="30"
                  value={pkgHeight}
                  onChange={(e) => setPkgHeight(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div className="flex h-[44px] items-center rounded-sm bg-surface-sunken px-16 text-primary">
                <span className="font-sans text-[14px] leading-[21px] text-secondary">
                  Berat Volume :{" "}
                  <strong className="text-primary font-bold">{calculatedVolumeWeight} Kilogram</strong>
                </span>
              </div>
            </div>
            <p className="font-sans text-[12px] leading-[18px] text-secondary">
              Ongkir dihitung berdasarkan berat volume (0 kilogram) karena lebih besar dari berat
              aktual.
            </p>
          </div>

          {/* Kurir */}
          <div className="w-full">
            <SelectField
              label="Kurir"
              placeholder="Pilih Kurir"
              placeholderClassName="text-primary"
              value={courier}
              onChange={(val) => setCourier(String(val))}
              options={COURIER_OPTIONS}
            />
          </div>

          {/* Switch: Gratis Ongkos Kirim */}
          <div className="flex flex-col gap-4 pt-8">
            <Switch
              id="free-shipping-switch-p2"
              size="lg"
              label="Gratis Ongkos Kirim"
              checked={isFreeShipping}
              onCheckedChange={setIsFreeShipping}
            />
            <p className="pl-48 font-sans text-[14px] leading-[21px] font-normal text-secondary">
              Jika Gratis Ongkir aktif, ongkir ditanggung penjual dan dipotong dari total penjualan.
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 7: VISIBILITAS PRODUK (Figma node 6935:4191) */}
      {/* ======================================================== */}
      <div className="w-full rounded-lg border border-border-primary bg-white">
        <div className="p-16">
          <h2 className="font-sans text-[16px] leading-[24px] font-bold text-primary">
            Visibilitas Produk
          </h2>
        </div>
        <Divider className="bg-border-subtle" />
        <div className="flex flex-col gap-24 p-24">
          {/* Jenis Visibilitas Produk */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
                  Jenis Visibilitas Produk
                </span>
                <span className="font-sans text-[14px] leading-[21px] font-medium text-error">
                  *
                </span>
              </div>
              <span className="font-sans text-[12px] leading-[18px] text-secondary">
                Tentukan jenis visibilitas produk dari sistem pencarian dan halaman penjual PaDi UMKM
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-16">
              <RadioCard
                id="vis-publik-p2"
                name="visibilityTypeP2"
                value="publik"
                checked={visibilityType === "publik"}
                onChange={() => setVisibilityType("publik")}
                label="Publik"
                radioRight={false}
                className={cn(
                  "w-full sm:w-[200px] rounded-sm p-16",
                  visibilityType === "publik"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
              <RadioCard
                id="vis-privat-p2"
                name="visibilityTypeP2"
                value="privat"
                checked={visibilityType === "privat"}
                onChange={() => setVisibilityType("privat")}
                label="Privat"
                radioRight={false}
                className={cn(
                  "w-full sm:w-[200px] rounded-sm p-16",
                  visibilityType === "privat"
                    ? "border-action-primary bg-action-primary-subtle"
                    : "border-border-primary bg-white hover:border-placeholder",
                )}
              />
            </div>
          </div>

          {/* Daftar BUMN yang diizinkan */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className="font-sans text-[14px] leading-[21px] font-medium text-primary">
                  Daftar BUMN yang diizinkan
                </span>
                <span className="font-sans text-[12px] leading-[18px] text-placeholder italic">
                  (Opsional)
                </span>
              </div>
              <span className="font-sans text-[12px] leading-[18px] text-secondary">
                Anda dapat secara opsional menentukan BUMN mana saja yang dapat mengakses produk Anda
              </span>
            </div>

            {/* Custom Multi-select Dropdown for BUMN */}
            <div ref={bumnDropdownRef} className="relative w-full">
              <div
                onClick={() => setIsBumnDropdownOpen(!isBumnDropdownOpen)}
                className="flex h-[44px] w-full cursor-pointer items-center justify-between rounded-md border border-border-primary bg-white px-16 transition-all select-none hover:border-placeholder"
              >
                <span className="font-sans text-[14px] leading-[21px] text-primary">
                  Pilih BUMN
                </span>
                <ArrowDown2
                  size={18}
                  className={cn(
                    "text-secondary transition-transform duration-200",
                    isBumnDropdownOpen && "rotate-180",
                  )}
                />
              </div>

              {isBumnDropdownOpen && (
                <div className="animate-in fade-in zoom-in-95 absolute top-[48px] left-0 z-50 flex max-h-[280px] w-full flex-col overflow-hidden rounded-md border border-border-primary bg-white shadow-xl duration-150">
                  <div className="border-b border-border-subtle p-8">
                    <div className="flex items-center gap-8 rounded-sm bg-surface-sunken px-12 py-6">
                      <SearchNormal1 size={16} className="text-secondary" />
                      <input
                        type="text"
                        placeholder="Cari BUMN..."
                        value={bumnSearch}
                        onChange={(e) => setBumnSearch(e.target.value)}
                        className="w-full bg-transparent font-sans text-xs text-primary focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="max-h-[200px] overflow-y-auto p-4">
                    {filteredBumnOptions.length === 0 ? (
                      <div className="px-12 py-8 text-center font-sans text-xs text-placeholder">
                        Tidak ada BUMN yang cocok
                      </div>
                    ) : (
                      filteredBumnOptions.map((opt) => {
                        const isSelected = allowedBumnList.includes(opt.value);
                        return (
                          <div
                            key={opt.value}
                            onClick={() => handleToggleBumn(opt.value)}
                            className={cn(
                              "flex cursor-pointer items-center justify-between rounded-sm px-12 py-8 transition-colors select-none",
                              isSelected ? "bg-action-primary-subtle" : "hover:bg-surface-sunken",
                            )}
                          >
                            <span className="font-sans text-xs text-primary">{opt.label}</span>
                            <div
                              className={cn(
                                "flex size-16 items-center justify-center rounded-sm border",
                                isSelected
                                  ? "border-action-primary bg-action-primary text-white"
                                  : "border-border-primary bg-white",
                              )}
                            >
                              {isSelected && (
                                <svg
                                  className="size-12"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <polyline points="2 6 5 9 10 3" />
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Selected BUMN Chips */}
            {allowedBumnList.length > 0 && (
              <div className="flex flex-wrap items-center gap-8 pt-4">
                {allowedBumnList.map((bumn) => (
                  <div
                    key={bumn}
                    className="flex h-6 items-center justify-center gap-6 rounded-sm border border-border-primary bg-bg-canvas px-8 py-2 transition-colors"
                  >
                    <span className="font-sans text-xs font-normal text-primary">
                      {bumn}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBumn(bumn)}
                      className="flex size-3 cursor-pointer items-center justify-center text-placeholder transition-colors hover:text-error"
                      aria-label={`Hapus ${bumn}`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="9" y1="3" x2="3" y2="9" />
                        <line x1="3" y1="3" x2="9" y2="9" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="font-sans text-[12px] leading-[18px] text-secondary">
              Maksimal 5 BUMN
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM ACTIONS ROW (Figma node 6901:10055 Frame 625363) */}
      {/* ======================================================== */}
      <div className="flex items-center justify-end gap-16 pt-8 pb-32">
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={handleSaveDraft}
          className="h-10 rounded-sm border border-action-primary bg-white px-12 py-8 text-sm font-medium text-action-primary hover:bg-surface-sunken"
        >
          Simpan & Tambah Baru
        </Button>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => setIsPublishModalOpen(true)}
          className="h-10 rounded-sm bg-action-primary px-12 py-8 text-sm font-medium text-white hover:bg-action-hover"
        >
          Simpan
        </Button>
      </div>

      {/* Success Modal */}
      <PublishSuccessModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        productData={{
          name: productName || "MacBook Pro M5 14-Inch",
          category: category || "Elektronik/Komputer & Laptop",
          price: unitPrice || "1.000.000",
          stock: stock || "1",
          imageUrl: photos[0]?.url,
        }}
        onReset={handleResetForm}
      />
    </div>
  );
}
