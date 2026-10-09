import { useState, useEffect, useRef } from "react";
import { DocumentUpload, Trash } from "iconsax-react";
import { Modal, TextField, SelectField } from "@sisapds/react";

export interface CertificateItem {
  id: string;
  type: string;
  number?: string;
  numberBold?: boolean;
  status: "Aktif" | "Kedaluwarsa" | "-";
  expiryDate?: string;
  docUrl?: string;
  webUrl?: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (certificate: CertificateItem) => void;
  editingCertificate?: CertificateItem | null;
  onUpdate?: (certificate: CertificateItem) => void;
}

const CERTIFICATE_TYPE_OPTIONS = [
  { label: "TKDN (Tingkat Komponen Dalam Negeri)", value: "TKDN" },
  { label: "MUI (Sertifikat Halal)", value: "MUI (Sertifikat Halal)" },
  { label: "SNI (Standar Nasional Indonesia)", value: "SNI" },
  { label: "BPOM MD", value: "BPOM MD" },
  { label: "SPP-IRT", value: "SPP-IRT" },
];

export function CertificateModal({
  isOpen,
  onClose,
  onAdd,
  editingCertificate,
  onUpdate,
}: CertificateModalProps) {
  const [certType, setCertType] = useState("TKDN");
  const [certNumber, setCertNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("2026-12-31");
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCertificate) {
      if (editingCertificate.type.startsWith("TKDN")) {
        setCertType("TKDN");
        const match = editingCertificate.type.match(/\((.*?)\)/);
        setCertNumber(match ? match[1] : "");
      } else {
        setCertType(editingCertificate.type);
        setCertNumber(editingCertificate.number || "");
      }
      setExpiryDate(editingCertificate.expiryDate || "2026-12-31");
      setFileName(null);
    } else {
      setCertType("TKDN");
      setCertNumber("");
      setExpiryDate("2026-12-31");
      setFileName(null);
    }
  }, [editingCertificate, isOpen]);

  const handleSubmit = () => {
    if (editingCertificate && onUpdate) {
      const updated: CertificateItem = {
        ...editingCertificate,
        type: certType === "TKDN" ? `TKDN (${certNumber || "80%"})` : certType,
        number: certType === "TKDN" ? undefined : certNumber || "ID1234567890",
        numberBold: certType === "BPOM MD",
        status: editingCertificate.status,
        expiryDate: certType === "TKDN" ? undefined : expiryDate || "12-02-2027",
      };
      onUpdate(updated);
      onClose();
      return;
    }

    const newCert: CertificateItem = {
      id: `cert-${Date.now()}`,
      type: certType === "TKDN" ? `TKDN (${certNumber || "80%"})` : certType,
      number: certType === "TKDN" ? undefined : certNumber || "ID1234567890",
      numberBold: certType === "BPOM MD",
      status: "Aktif",
      expiryDate: certType === "TKDN" ? undefined : expiryDate || "12-02-2027",
      docUrl: "https://example.com/document.pdf",
      webUrl: certType === "TKDN" ? "https://kemenperin.go.id" : undefined,
    };
    onAdd(newCert);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingCertificate ? "Ubah Sertifikat Produk" : "Tambah Sertifikat Produk"}
      size="md"
      confirmText={editingCertificate ? "Simpan Perubahan" : "Simpan Sertifikat"}
      cancelText="Batal"
      onConfirm={handleSubmit}
      onCancel={onClose}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-16 py-8"
      >
        {/* Jenis Sertifikat */}
        <SelectField
          label="Jenis Sertifikat"
          isWajib
          placeholder="Pilih Sertifikat"
          value={certType}
          onChange={(val) => setCertType(String(val))}
          options={CERTIFICATE_TYPE_OPTIONS}
        />

        {/* Nomor / Nilai Sertifikat */}
        <TextField
          label={certType === "TKDN" ? "Persentase TKDN (%)" : "Nomor Sertifikat / Registrasi"}
          required
          placeholder={certType === "TKDN" ? "Contoh: 80%" : "Contoh: ID26356455565746561"}
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
        />

        {/* Tanggal Kedaluwarsa (Non-TKDN) */}
        {certType !== "TKDN" && (
          <TextField
            label="Tanggal Kedaluwarsa"
            type="date"
            required
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        )}

        {/* Upload Dokumen Sertifikat */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="font-['Ubuntu'] text-[14px] leading-[21px] font-medium text-[#444b55]">
              Upload Dokumen Sertifikat
            </span>
            <span className="font-['Ubuntu'] text-[12px] leading-[18px] text-[#ee3124] italic">
              Wajib
            </span>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#b1b4b8] bg-[#f9fafa] p-16 text-center transition-colors hover:border-[#009ea9] hover:bg-[#009ea9]/5"
          >
            <DocumentUpload size={28} variant="Bulk" color="#009ea9" className="mb-4" />
            {fileName ? (
              <div className="flex items-center gap-8">
                <span className="text-xs font-semibold text-[#009ea9] underline">
                  {fileName}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="cursor-pointer text-[#ee3124] hover:text-[#d32f2f]"
                  aria-label="Hapus dokumen"
                >
                  <Trash size={16} />
                </button>
              </div>
            ) : (
              <span className="text-xs font-semibold text-[#009ea9]">
                Pilih Berkas PDF / JPG
              </span>
            )}
            <span className="mt-2 text-[11px] text-[#8c9197]">Maks. ukuran 5MB</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
