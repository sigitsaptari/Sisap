import { useState, useMemo } from "react";
import { Danger, InfoCircle, CloseCircle, TickCircle, ArrowDown2 } from "iconsax-react";
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
  type UploaderFile,
} from "@sisapds/react";
import { SellerHeader } from "./components/SellerHeader";
import { SellerSidebar } from "./components/SellerSidebar";
import { AddProductStepper } from "./components/AddProductStepper";
import { CertificateModal, type CertificateItem } from "./components/CertificateModal";
import { PublishSuccessModal } from "./components/PublishSuccessModal";

function EditIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke="#009EA9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.04 3.02L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96C22.34 6.6 22.98 5.02 20.98 3.02C18.98 1.02 17.4 1.66 16.04 3.02Z"
        stroke="#009EA9"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.91 4.15C15.58 6.54 17.45 8.41 19.85 9.09"
        stroke="#009EA9"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon({ className = "w-[24px] h-[24px]" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5.98C17.67 5.65 14.32 5.48 10.98 5.48C9 5.48 7.02 5.58 5.04 5.78L3 5.98"
        stroke="#EE3124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
        stroke="#EE3124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.85 9.14L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14"
        stroke="#EE3124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.33 16.5H13.66"
        stroke="#EE3124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.5H14.5"
        stroke="#EE3124"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notification timer
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ----------------------------------------------------
  // STEP 1 STATE: INFORMASI PRODUK
  // ----------------------------------------------------
  const [productType, setProductType] = useState<"Barang" | "Jasa">("Barang");
  const [productName, setProductName] = useState(
    "MacBook Pro M5 14-Inch 16/512GB 16/1TB 24/1TB Space Black Silver - 16/1 TB IBOX Original Space Grey",
  );
  const [category, setCategory] = useState("Furniture/Furniture Perkantoran");
  const [brand, setBrand] = useState("Fantech");
  const [unitType, setUnitType] = useState("Pcs");
  const [sku, setSku] = useState("1");
  const [isPdn, setIsPdn] = useState(false);
  const [pph, setPph] = useState("Tidak Dipotong");
  const [description, setDescription] = useState(
    "Laptop handal dengan desain tipis, performa cepat, baterai awet, cocok untuk kerja dan belajar.",
  );

  // Media (Fotos & Video)
  const [photos, setPhotos] = useState<UploaderFile[]>([
    {
      id: "photo-1",
      name: "macbook-1.jpg",
      url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-2",
      name: "macbook-2.jpg",
      url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-3",
      name: "macbook-3.jpg",
      url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
    {
      id: "photo-4",
      name: "macbook-4.jpg",
      url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300&auto=format&fit=crop&q=80",
      status: "success",
      progress: 100,
    },
  ]);

  const [video, setVideo] = useState<UploaderFile[]>([
    {
      id: "video-1",
      name: "macbook-video.mp4",
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
      docUrl: "https://example.com/doc",
      webUrl: "https://kemenperin.go.id",
    },
    {
      id: "cert-2",
      type: "MUI (Sertifikat Halal)",
      number: "ID26356455565746561",
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "https://example.com/doc",
    },
    {
      id: "cert-3",
      type: "SNI",
      number: "04-8883-1002",
      status: "Kedaluwarsa",
      expiryDate: "12-02-2025",
      docUrl: "https://example.com/doc",
    },
    {
      id: "cert-4",
      type: "BPOM MD",
      number: "MD263564555657465",
      numberBold: true,
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "https://example.com/doc",
    },
    {
      id: "cert-5",
      type: "SPP-IRT",
      number: "P-IRT2635645556574-56",
      status: "Aktif",
      expiryDate: "12-02-2025",
      docUrl: "https://example.com/doc",
    },
  ]);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificateItem | null>(null);

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
  const [weightUnit, _setWeightUnit] = useState("Gram");
  const [pkgLength, setPkgLength] = useState("100");
  const [pkgWidth, setPkgWidth] = useState("150");
  const [pkgHeight, setPkgHeight] = useState("100");
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
    <div className="flex min-h-screen flex-col bg-[#f9fafa] font-['Ubuntu',sans-serif] text-[#444b55]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="animate-in fade-in slide-in-from-bottom-4 fixed right-8 bottom-24 z-50 flex items-center gap-2 rounded-[8px] bg-[#182958] px-4 py-3 text-sm font-semibold text-[#ffffff] shadow-xl duration-200">
          <TickCircle size={18} variant="Bulk" color="#009ea9" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <SellerHeader />

      {/* Main Layout Container (Sidebar + Content) */}
      <div className="flex min-h-[calc(100vh-80px)] flex-1">
        {/* Left Seller Sidebar */}
        <SellerSidebar />

        {/* Center Main Work Area (1096px content width, 32px padding) */}
        <main className="flex-1 overflow-x-hidden bg-[#f9fafa] py-[16px] pr-[32px] pb-[100px] pl-[32px]">
          <div className="flex w-[1096px] flex-col gap-[32px]">
            {/* Page Title */}
            <div className="flex h-[32px] items-center">
              <h1 className="font-['Ubuntu'] text-[24px] leading-[32px] font-bold text-[#444b55]">
                Tambah Produk
              </h1>
            </div>

            {/* Stepper Navigation */}
            <div className="w-[1096px]">
              <AddProductStepper
                currentStep={currentStep}
                onStepClick={(step) => setCurrentStep(step)}
              />
            </div>

            {/* ======================================================== */}
            {/* STEP 1: INFORMASI PRODUK */}
            {/* ======================================================== */}
            {currentStep === 1 && (
              <div className="animate-in fade-in flex flex-col gap-[32px] duration-200">
                {/* Card 1: Jenis Produk (6935:7549) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-[#ffffff] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Jenis Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex gap-[24px] p-[24px]">
                    {/* Option: Barang (Figma 6901:13127) */}
                    <div
                      onClick={() => setProductType("Barang")}
                      className={`flex h-[60px] flex-1 cursor-pointer items-center justify-between rounded-[4px] border px-[12px] py-[10px] transition-all select-none ${
                        productType === "Barang"
                          ? "border-[#009ea9] bg-white"
                          : "border-[#d5d7d9] bg-white hover:border-[#b1b4b8]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-[16px]">
                        {/* Device icon (40x40) - vuesax/bulk/devices */}
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
                              d="M31.9167 28.35C31.9167 30.3167 30.3167 31.9167 28.35 31.9167C26.3833 31.9167 24.7833 30.3167 24.7833 28.35C24.7833 27.5333 25.0667 26.7667 25.5333 26.1667C26.1833 25.3334 27.2 24.7833 28.35 24.7833C29.25 24.7833 30.0667 25.1167 30.6833 25.65C31.4333 26.3167 31.9167 27.2833 31.9167 28.35Z"
                              fill="#009EA9"
                            />
                            <path
                              opacity="0.4"
                              d="M28.35 22.05C29.7952 22.05 30.9666 20.8784 30.9666 19.4333C30.9666 17.9881 29.7952 16.8167 28.35 16.8167C26.9049 16.8167 25.7333 17.9881 25.7333 19.4333C25.7333 20.8784 26.9049 22.05 28.35 22.05Z"
                              fill="#009EA9"
                            />
                          </svg>
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-[4px] text-left">
                          <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-medium text-[#444b55]">
                            Barang
                          </p>
                          <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#444b55]">
                            Berupa produk fisik yang memiliki dimensi berat, panjang dan lebar
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex size-[20px] shrink-0 items-center justify-center rounded-[4px] drop-shadow-[0px_1px_1px_rgba(31,41,55,0.08)] ${
                          productType === "Barang"
                            ? "bg-[#009ea9]"
                            : "border border-[#8c9197] bg-white"
                        }`}
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
                      className={`flex h-[60px] flex-1 cursor-pointer items-center justify-between rounded-[4px] border px-[12px] py-[10px] transition-all select-none ${
                        productType === "Jasa"
                          ? "border-[#009ea9] bg-white"
                          : "border-[#d5d7d9] bg-white hover:border-[#b1b4b8]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-[16px]">
                        {/* Jasa icon (40x40) - vuesax/bulk/like */}
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
                        <div className="flex min-w-0 flex-1 flex-col gap-[4px] text-left">
                          <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-medium text-[#444b55]">
                            Jasa
                          </p>
                          <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#444b55]">
                            Berupa produk non-fisik dalam bentuk layanan
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex size-[20px] shrink-0 items-center justify-center rounded-[4px] drop-shadow-[0px_1px_1px_rgba(31,41,55,0.08)] ${
                          productType === "Jasa"
                            ? "bg-[#009ea9]"
                            : "border border-[#8c9197] bg-white"
                        }`}
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

                {/* Card 2: Informasi Produk (6935:7550) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-[#ffffff] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Informasi Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
                    {/* Nama Produk */}
                    <TextField
                      label="Nama Produk"
                      required
                      description="Min. 5 karakter: Masukkan merek, jenis, warna, bahan, atau tipe. Hindari huruf kapital berlebih, multi-merek, dan kata promosi."
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      maxLength={100}
                      suffix={`${productName.length}/100`}
                    />

                    {/* 3 Column Select Fields (Kategori, Brand, Satuan) */}
                    <div className="relative z-20 flex w-full items-start gap-[24px]">
                      <div className="min-w-0 flex-1">
                        <SelectField
                          label="Kategori Produk"
                          isWajib
                          value={category}
                          onChange={setCategory}
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

                      <div className="w-[300px] shrink-0">
                        <SelectField
                          label="Brand Produk"
                          isWajib
                          value={brand}
                          onChange={setBrand}
                          options={[
                            { label: "Fantech", value: "Fantech" },
                            { label: "Apple", value: "Apple" },
                            { label: "Asus", value: "Asus" },
                            { label: "Lenovo", value: "Lenovo" },
                            { label: "Samsung", value: "Samsung" },
                          ]}
                        />
                      </div>

                      <div className="w-[233.33px] shrink-0">
                        <SelectField
                          label="Jenis Satuan Produk"
                          isWajib
                          value={unitType}
                          onChange={setUnitType}
                          options={[
                            { label: "Pcs", value: "Pcs" },
                            { label: "Unit", value: "Unit" },
                            { label: "Pack", value: "Pack" },
                            { label: "Set", value: "Set" },
                            { label: "Box", value: "Box" },
                          ]}
                        />
                      </div>
                    </div>

                    {/* Kode SKU */}
                    <TextField
                      label="Kode SKU"
                      optional
                      description="Kode unik untuk melacak varian produk di inventaris."
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />

                    {/* Checkbox PDN */}
                    <div className="flex flex-col gap-[4px]">
                      <Checkbox
                        id="pdn-checkbox"
                        checked={isPdn}
                        onCheckedChange={(checked) => setIsPdn(Boolean(checked))}
                        size="lg"
                        text="Produk Dalam Negeri (PDN)"
                      />
                      <p className="pl-[32px] font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Barang dan jasa produksi Indonesia yang memanfaatkan tenaga kerja serta
                        bahan baku dalam negeri.
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

                {/* Card 3: Media Produk (6937:9362) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-[#ffffff] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Media Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
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

                {/* Card 4: Sertifikat Produk (6954:14866) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-white">
                  <div className="flex h-[56px] items-center justify-between p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Sertifikat Produk
                    </h2>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setEditingCert(null);
                        setIsCertModalOpen(true);
                      }}
                    >
                      Tambah Sertifikat
                    </Button>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  {certificates.length === 0 ? (
                    <div className="flex w-full flex-col items-center justify-center gap-[4px] px-0 py-[16px] text-center">
                      <p className="font-['Ubuntu'] text-[14px] leading-[21px] font-bold text-[#444b55]">
                        Sertifikat Produk Belum ditambahkan.
                      </p>
                      <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#444b55]">
                        Silahkan Tambahkan dahulu sertifikat produk untuk mendukung informasi produk
                        Anda
                      </p>
                    </div>
                  ) : (
                    <div className="w-full">
                      {/* Table Header (56px) */}
                      <div className="flex h-[56px] items-center border-b border-[#dee3ed] bg-[#f9fafa] font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                        <div className="flex-1 px-[16px] py-[8px]">Jenis Sertifikat</div>
                        <div className="w-[240px] px-[16px] py-[8px]">Status/Kedaluwarsa</div>
                        <div className="w-[200px] px-[16px] py-[8px]">Lampiran</div>
                        <div className="w-[105px] px-[16px] py-[8px]">Aksi</div>
                      </div>

                      {/* Table Rows (66px each, zebra stripe) */}
                      <div className="w-full">
                        {certificates.map((cert, index) => {
                          const isZebra = index % 2 === 1;
                          const isLast = index === certificates.length - 1;
                          const isBoldNumber = cert.numberBold || cert.type === "BPOM MD";

                          return (
                            <div
                              key={cert.id}
                              className={`flex h-[66px] items-center font-['Ubuntu'] ${
                                isZebra ? "bg-[#f9fafa]" : "bg-white"
                              } ${!isLast ? "border-b border-[#dee3ed]" : ""}`}
                            >
                              {/* Column 1: Jenis Sertifikat */}
                              <div className="flex flex-1 items-center gap-[8px] px-[16px] py-[8px] text-[#444b55]">
                                <span className="text-[14px] leading-[21px] font-normal">
                                  {cert.type}
                                </span>
                                {cert.number && (
                                  <span
                                    className={`text-[14px] leading-[21px] text-[#444b55] ${
                                      isBoldNumber ? "font-bold" : "font-medium"
                                    }`}
                                  >
                                    {cert.number}
                                  </span>
                                )}
                              </div>

                              {/* Column 2: Status / Kedaluwarsa */}
                              <div className="flex w-[240px] items-center gap-[4px] px-[16px] py-[8px] text-[#444b55]">
                                {cert.status === "-" ? (
                                  <span className="text-[14px] leading-[21px] font-normal text-[#444b55]">
                                    -
                                  </span>
                                ) : (
                                  <>
                                    <Chip
                                      type="soft"
                                      color={cert.status === "Aktif" ? "tosca" : "grey"}
                                      size="sm"
                                      label={cert.status}
                                      className="h-[16px] rounded-[4px] px-[2px] text-[12px] leading-[18px] font-medium"
                                    />
                                    {cert.expiryDate && (
                                      <span className="text-[14px] leading-[21px] font-normal text-[#444b55]">
                                        {cert.expiryDate}
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>

                              {/* Column 3: Lampiran */}
                              <div className="flex w-[200px] items-center gap-[8px] px-[16px] py-[8px]">
                                {cert.docUrl && (
                                  <a
                                    href={cert.docUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer text-[12px] leading-[18px] font-medium text-[#009ea9] hover:underline"
                                  >
                                    Lihat doc.
                                  </a>
                                )}
                                {cert.docUrl && cert.webUrl && (
                                  <div className="h-[12px] w-px shrink-0 bg-[#d5d7d9]" />
                                )}
                                {cert.webUrl && (
                                  <a
                                    href={cert.webUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer text-[12px] leading-[18px] font-medium text-[#009ea9] hover:underline"
                                  >
                                    Lihat di Web
                                  </a>
                                )}
                              </div>

                              {/* Column 4: Aksi */}
                              <div className="flex w-[105px] items-center gap-[12px] px-[16px] py-[8px]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCert(cert);
                                    setIsCertModalOpen(true);
                                  }}
                                  className="flex size-[24px] cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
                                  title="Ubah Sertifikat"
                                  aria-label="Ubah Sertifikat"
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCertificates((prev) => prev.filter((c) => c.id !== cert.id));
                                    showToast("Sertifikat berhasil dihapus");
                                  }}
                                  className="flex size-[24px] cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
                                  title="Hapus Sertifikat"
                                  aria-label="Hapus Sertifikat"
                                >
                                  <TrashIcon />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 2: HARGA & STOK */}
            {/* ======================================================== */}
            {currentStep === 2 && (
              <div className="animate-in fade-in flex flex-col gap-[32px] duration-200">
                {/* Card 1: Harga Produk (6941:8292) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Harga Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
                    {/* Dismissible Alert Banner */}
                    {showAlertBanner && (
                      <div className="flex w-full items-center justify-between gap-[12px] rounded-[8px] border border-[#f7931e] bg-[#fff5ea] px-[16px] py-[16px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-[#f7931e] text-white">
                            <Danger size={20} variant="Bulk" color="#ffffff" />
                          </div>
                          <p className="font-['Ubuntu'] text-[14px] leading-[21px] text-[#444b55]">
                            Mulai 1 Oktober 2024 terdapat perubahan biaya transaksi penjual.{" "}
                            <a href="#biaya" className="font-medium text-[#009ea9] hover:underline">
                              Lihat Selengkapnya
                            </a>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowAlertBanner(false)}
                          className="cursor-pointer text-[#444b55] transition-colors hover:text-[#000000]"
                          aria-label="Tutup notifikasi"
                        >
                          <CloseCircle size={20} variant="Linear" />
                        </button>
                      </div>
                    )}

                    {/* Jenis Harga */}
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[4px]">
                        <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                          Jenis Harga
                        </span>
                        <span className="font-['Ubuntu'] text-[12px] leading-[18px] text-[#ee3124] italic">
                          Wajib
                        </span>
                      </div>
                      <div className="flex gap-[24px]">
                        <RadioCard
                          id="price-normal"
                          name="priceType"
                          value="normal"
                          checked={priceType === "normal"}
                          onChange={() => setPriceType("normal")}
                          label="Harga Normal"
                          radioRight={false}
                          className={`w-[200px] cursor-pointer rounded-[4px] p-[16px] ${
                            priceType === "normal"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        />
                        <RadioCard
                          id="price-tempo"
                          name="priceType"
                          value="tempo"
                          checked={priceType === "tempo"}
                          onChange={() => setPriceType("tempo")}
                          label="Harga Tempo"
                          radioRight={false}
                          className={`w-[200px] cursor-pointer rounded-[4px] p-[16px] ${
                            priceType === "tempo"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        />
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

                    {/* Tampilkan Harga Diskon Box */}
                    <div className="flex w-full flex-col gap-[24px] rounded-[8px] bg-[#f9fafa] p-[12px]">
                      <div className="flex items-center">
                        <Switch
                          id="switch-diskon"
                          size="lg"
                          label="Tampilkan Harga Diskon"
                          checked={showDiscount}
                          onCheckedChange={setShowDiscount}
                        />
                      </div>

                      {showDiscount && (
                        <div className="flex w-full items-end gap-[24px]">
                          {/* Harga Sebelum Diskon Input */}
                          <div className="flex-1">
                            <TextField
                              label="Harga Sebelum Diskon"
                              required
                              prefix="Rp"
                              value={priceBeforeDiscount}
                              onChange={(e) => setPriceBeforeDiscount(e.target.value)}
                            />
                          </div>

                          {/* Pratinjau Harga Diskon Box */}
                          <div className="flex flex-col gap-[8px]">
                            <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                              Pratinjau Harga Diskon
                            </span>
                            <div className="flex h-[44px] items-center gap-[12px] rounded-[4px] border border-[#d5d7d9] bg-white px-[8px] py-[8px]">
                              <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-bold text-[#444b55]">
                                Rp{unitPrice}
                              </span>
                              <div className="flex items-center gap-[8px]">
                                <span className="rounded-[4px] bg-[#ffedf1] px-[6px] py-[1px] text-[12px] font-medium text-[#ee3124]">
                                  50%
                                </span>
                                <span className="text-[12px] leading-[18px] text-[#686e76] line-through">
                                  Rp{priceBeforeDiscount}.000
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Estimasi Pendapatan */}
                          <div className="flex h-[44px] items-center gap-[12px] rounded-[4px] bg-[#ddf2e4] px-[12px]">
                            <div className="flex items-center gap-[4px]">
                              <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                                Estimasi pendapatan
                              </span>
                              <InfoCircle size={16} variant="Linear" color="#444b55" />
                            </div>
                            <span className="font-['Ubuntu'] text-[18px] leading-[28px] font-bold text-[#25974c]">
                              Rp{unitPrice}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Barang / Jasa Dikenakan PPN */}
                    <div className="flex flex-col gap-[8px]">
                      <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                        Barang / Jasa Dikenakan PPN
                      </span>
                      <div className="grid grid-cols-3 gap-[24px]">
                        {/* PPN 12% */}
                        <div
                          onClick={() => setPpnType("ppn12")}
                          className={`flex cursor-pointer flex-col gap-[6px] rounded-[4px] border p-[16px] transition-all ${
                            ppnType === "ppn12"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-[8px]">
                            <div
                              className={`flex size-[18px] items-center justify-center rounded-full border ${
                                ppnType === "ppn12" ? "border-[#009ea9]" : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "ppn12" && (
                                <div className="size-[10px] rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                              PPN 12%
                            </span>
                          </div>
                          <p className="pl-[26px] font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#686e76]">
                            Transaksi dikenakan PPN 12% sesuai ketentuan PMK No. 131 Tahun 2024.
                          </p>
                        </div>

                        {/* PPN 1.1% */}
                        <div
                          onClick={() => setPpnType("ppn1")}
                          className={`flex cursor-pointer flex-col gap-[6px] rounded-[4px] border p-[16px] transition-all ${
                            ppnType === "ppn1"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-[8px]">
                            <div
                              className={`flex size-[18px] items-center justify-center rounded-full border ${
                                ppnType === "ppn1" ? "border-[#009ea9]" : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "ppn1" && (
                                <div className="size-[10px] rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                              PPN 1.1%
                            </span>
                          </div>
                          <p className="pl-[26px] font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#686e76]">
                            Transaksi dikenakan PPN 1,1% dan wajib dilaporkan secara mandiri oleh
                            pembeli.
                          </p>
                        </div>

                        {/* Tidak Dikenakan PPN */}
                        <div
                          onClick={() => setPpnType("noppn")}
                          className={`flex cursor-pointer flex-col gap-[6px] rounded-[4px] border p-[16px] transition-all ${
                            ppnType === "noppn"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-[8px]">
                            <div
                              className={`flex size-[18px] items-center justify-center rounded-full border ${
                                ppnType === "noppn" ? "border-[#009ea9]" : "border-[#b1b4b8]"
                              }`}
                            >
                              {ppnType === "noppn" && (
                                <div className="size-[10px] rounded-full bg-[#009ea9]" />
                              )}
                            </div>
                            <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                              Tidak Dikenakan PPN
                            </span>
                          </div>
                          <p className="pl-[26px] font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#686e76]">
                            Harga Barang / Jasa tidak dikenakan PPN.
                          </p>
                        </div>
                      </div>

                      <p className="mt-[4px] font-['Ubuntu'] text-[14px] leading-[21px] text-[#686e76]">
                        Pastikan pemilihan pengenaan PPN pada barang/jasa Anda sesuai dengan
                        peraturan perundangan yang berlaku.{" "}
                        <a href="#ppn" className="font-medium text-[#009ea9] hover:underline">
                          Daftar Barang/Jasa Dikecualikan PPN
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Stok Produk (6941:8434) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Stok Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
                    {/* Row Stok Unit & Minimum Pembelian */}
                    <div className="flex w-full gap-[24px]">
                      <div className="flex-1">
                        <TextField
                          label="Stok Unit"
                          required
                          suffix="Pack"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <TextField
                          label="Minimum Pembelian"
                          required
                          suffix="Pack"
                          value={minPurchase}
                          onChange={(e) => setMinPurchase(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Checkbox Stok Selalu Tersedia */}
                    <Checkbox
                      id="stock-always"
                      size="lg"
                      checked={stockAlwaysAvailable}
                      onCheckedChange={(c) => setStockAlwaysAvailable(Boolean(c))}
                      text="Stok Selalu Tersedia"
                    />

                    {/* Pre-Order Toggle Card */}
                    <div className="flex flex-col gap-[16px] rounded-[8px] bg-[#f9fafa] p-[12px]">
                      <div className="flex flex-col gap-[4px]">
                        <Switch
                          id="preorder-switch"
                          size="lg"
                          label="Pre-Order"
                          checked={isPreOrder}
                          onCheckedChange={setIsPreOrder}
                        />
                        <p className="pl-[48px] font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                          Jika kamu memerlukan waktu pengiriman yang lebih lama, silakan aktifkan
                          opsi Pre Order.
                        </p>
                      </div>

                      {isPreOrder && (
                        <div className="flex flex-col gap-[4px] pt-[8px]">
                          <TextField
                            label="Waktu Proses"
                            required
                            suffix="Hari"
                            value={processDays}
                            onChange={(e) => setProcessDays(e.target.value)}
                          />
                          <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#686e76]">
                            Waktu proses wajib diisi untuk memberikan perkiraan lama pemrosesan
                            pesanan. Maksimal 180 hari.
                          </p>
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
              <div className="animate-in fade-in flex flex-col gap-[32px] duration-200">
                {/* Card Pengiriman (6941:9762) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Pengiriman
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
                    {/* Berat Produk */}
                    <div className="flex flex-col gap-[4px]">
                      <TextField
                        label="Berat Produk"
                        required
                        suffix={weightUnit}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                      <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#686e76]">
                        Perhatikan dengan baik berat produk agar tidak terjadi selisih data dengan
                        pihak kurir.
                      </p>
                    </div>

                    {/* Dimensi */}
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[4px]">
                        <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                          Dimensi
                        </span>
                        <span className="font-['Ubuntu'] text-[12px] leading-[18px] text-[#ee3124] italic">
                          Wajib
                        </span>
                      </div>
                      <p className="font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Masukkan ukuran produk setelah dikemas untuk menghitung berat volume. Jika
                        terdapat angka desimal, mohon dibulatkan ke atas.
                      </p>

                      <div className="flex items-center gap-[16px] pt-[8px]">
                        <div className="flex-1">
                          <TextField
                            suffix="CM"
                            value={pkgLength}
                            onChange={(e) => setPkgLength(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <TextField
                            suffix="CM"
                            value={pkgWidth}
                            onChange={(e) => setPkgWidth(e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <TextField
                            suffix="CM"
                            value={pkgHeight}
                            onChange={(e) => setPkgHeight(e.target.value)}
                          />
                        </div>

                        {/* Berat Volume Box */}
                        <div className="flex h-[44px] shrink-0 items-center justify-center rounded-[4px] bg-[#eff0f1] px-[16px] font-['Ubuntu'] text-[14px] text-[#444b55]">
                          <span>Berat Volume :&nbsp;</span>
                          <span className="font-bold text-[#444b55]">
                            {calculatedVolumeWeight} Kilogram
                          </span>
                        </div>
                      </div>

                      <p className="font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Ongkir dihitung berdasarkan berat volume (2 kilogram) karena lebih besar
                        dari berat aktual.
                      </p>
                    </div>

                    {/* Gratis Ongkos Kirim Box */}
                    <div className="flex flex-col gap-[4px] rounded-[8px] bg-[#f9fafa] p-[16px]">
                      <Switch
                        id="ongkir-switch"
                        size="lg"
                        label="Gratis Ongkos Kirim"
                        checked={isFreeShipping}
                        onCheckedChange={setIsFreeShipping}
                      />
                      <p className="pl-[48px] font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Jika Gratis Ongkir aktif, ongkir ditanggung penjual dan dipotong dari total
                        penjualan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* STEP 4: VISIBILITAS / LAINNYA */}
            {/* ======================================================== */}
            {currentStep === 4 && (
              <div className="animate-in fade-in flex flex-col gap-[32px] duration-200">
                {/* Card Visibilitas Produk (6941:10909) */}
                <div className="w-[1096px] overflow-hidden rounded-[8px] border border-[#d5d7d9] bg-white">
                  <div className="p-[16px]">
                    <h2 className="font-['Ubuntu'] text-[16px] leading-[24px] font-bold text-[#444b55]">
                      Visibilitas Produk
                    </h2>
                  </div>
                  <Divider className="bg-[#dee3ed]" />
                  <div className="flex flex-col gap-[24px] p-[24px]">
                    {/* Jenis Visibilitas Produk */}
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[4px]">
                        <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                          Jenis Visibilitas Produk
                        </span>
                        <span className="font-['Ubuntu'] text-[12px] leading-[18px] text-[#ee3124] italic">
                          Wajib
                        </span>
                      </div>
                      <p className="font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Tentukan jenis visibilitas produk dari sistem pencarian dan halaman penjual
                        PaDi UMKM
                      </p>
                      <div className="flex gap-[24px] pt-[4px]">
                        <RadioCard
                          id="vis-publik"
                          name="visibilityType"
                          value="publik"
                          checked={visibilityType === "publik"}
                          onChange={() => setVisibilityType("publik")}
                          label="Publik"
                          radioRight={false}
                          className={`w-[200px] cursor-pointer rounded-[4px] p-[16px] ${
                            visibilityType === "publik"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        />
                        <RadioCard
                          id="vis-privat"
                          name="visibilityType"
                          value="privat"
                          checked={visibilityType === "privat"}
                          onChange={() => setVisibilityType("privat")}
                          label="Privat"
                          radioRight={false}
                          className={`w-[200px] cursor-pointer rounded-[4px] p-[16px] ${
                            visibilityType === "privat"
                              ? "border-[#009ea9] bg-[#e6f4f7]"
                              : "border-[#d5d7d9] bg-white"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Daftar BUMN yang diizinkan */}
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center gap-[4px]">
                        <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
                          Daftar BUMN yang diizinkan
                        </span>
                        <span className="font-['Ubuntu'] text-[12px] leading-[18px] text-[#8c9197] italic">
                          Opsional
                        </span>
                      </div>
                      <p className="font-['Ubuntu'] text-[14px] leading-[21px] font-normal text-[#686e76]">
                        Anda dapat secara opsional menentukan BUMN mana saja yang dapat mengakses
                        produk Anda
                      </p>

                      {/* Chip Select Box */}
                      <div className="flex min-h-[44px] w-full items-center justify-between rounded-[4px] border border-[#d5d7d9] bg-white px-[12px] py-[8px]">
                        <div className="flex flex-wrap items-center gap-[8px]">
                          {allowedBumnList.map((bumn) => (
                            <Chip
                              key={bumn}
                              label={bumn}
                              type="soft"
                              color="grey"
                              size="md"
                              removable
                              onDismiss={() => handleRemoveBumn(bumn)}
                              className="bg-[#e7e8e9] font-['Ubuntu'] text-[#444b55]"
                            />
                          ))}

                          {/* Quick Add BUMN dropdown if under 5 */}
                          {allowedBumnList.length < 5 && (
                            <div className="ml-2 w-[160px]">
                              <SelectField
                                size="sm"
                                placeholder="+ Tambah BUMN"
                                value=""
                                onChange={(val) => handleAddBumn(val as string)}
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
                        <ArrowDown2
                          size={18}
                          variant="Linear"
                          color="#686e76"
                          className="shrink-0"
                        />
                      </div>

                      <p className="font-['Ubuntu'] text-[12px] leading-[18px] font-normal text-[#8c9197]">
                        Maksimal 5 BUMN
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Sticky Bottom CTA Bar (6954:13282) */}
      <footer className="fixed right-0 bottom-0 left-[280px] z-40 flex h-[68px] items-center justify-end gap-[16px] border-t border-[#dee3ed] bg-[#ffffff] bg-white px-[24px] py-[16px] drop-shadow-[0px_2px_5px_rgba(0,0,0,0.1),0px_0px_1px_rgba(0,0,0,0.2)]">
        {currentStep > 1 && (
          <Button
            variant="secondary"
            size="md"
            onClick={handlePrev}
            className="h-[36px] rounded-[4px] border border-[#444b55] px-[12px] text-[12px] leading-[18px] font-medium text-[#444b55]"
          >
            Kembali
          </Button>
        )}
        <Button
          variant="secondary"
          size="md"
          onClick={() => showToast("Draf produk berhasil disimpan!")}
          className="h-[36px] rounded-[4px] border border-[#444b55] px-[12px] text-[12px] leading-[18px] font-medium text-[#444b55]"
        >
          Simpan Draft
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={handleNext}
          className="h-[36px] rounded-[4px] bg-[#009ea9] px-[12px] text-[12px] leading-[18px] font-medium text-white"
        >
          {currentStep === 4 ? "Selesai" : "Selanjutnya"}
        </Button>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        editingCertificate={editingCert}
        onClose={() => {
          setIsCertModalOpen(false);
          setEditingCert(null);
        }}
        onAdd={(newCert) => {
          setCertificates((prev) => [...prev, newCert]);
          showToast("Sertifikat berhasil ditambahkan!");
        }}
        onUpdate={(updatedCert) => {
          setCertificates((prev) => prev.map((c) => (c.id === updatedCert.id ? updatedCert : c)));
          showToast("Sertifikat berhasil diperbarui!");
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
