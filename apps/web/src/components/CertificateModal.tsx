import { useState, useEffect } from "react";
import { CloseCircle, DocumentUpload } from "iconsax-react";
import { Button, TextField, SelectField } from "@sisapds/react";

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
    } else {
      setCertType("TKDN");
      setCertNumber("");
      setExpiryDate("2026-12-31");
      setFileName(null);
    }
  }, [editingCertificate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000]/50 p-4 backdrop-blur-xs">
      <div className="animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-[12px] border border-[#e7e8e9] bg-[#ffffff] shadow-2xl duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e7e8e9] px-6 py-4">
          <h3 className="text-base font-bold text-[#444b55]">
            {editingCertificate ? "Ubah Sertifikat Produk" : "Tambah Sertifikat Produk"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#8c9197] transition-colors hover:text-[#444b55]"
            aria-label="Tutup modal"
          >
            <CloseCircle size={22} variant="Bulk" color="#8c9197" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-16 p-24">
          <SelectField
            label="Jenis Sertifikat"
            isWajib
            placeholder="Pilih Sertifikat"
            value={certType}
            onChange={(val) => setCertType(String(val))}
            options={[
              { label: "TKDN (Tingkat Komponen Dalam Negeri)", value: "TKDN" },
              { label: "MUI (Sertifikat Halal)", value: "MUI (Sertifikat Halal)" },
              { label: "SNI (Standar Nasional Indonesia)", value: "SNI" },
              { label: "BPOM MD", value: "BPOM MD" },
              { label: "SPP-IRT", value: "SPP-IRT" },
            ]}
          />

          <TextField
            label={certType === "TKDN" ? "Persentase TKDN (%)" : "Nomor Sertifikat / Registrasi"}
            required
            placeholder={certType === "TKDN" ? "Contoh: 80%" : "Contoh: ID26356455565746561"}
            value={certNumber}
            onChange={(e) => setCertNumber(e.target.value)}
          />

          {certType !== "TKDN" && (
            <TextField
              label="Tanggal Kedaluwarsa"
              type="date"
              required
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          )}

          {/* Upload Dokumen */}
          <div className="flex flex-col gap-8">
            <label className="text-sm font-medium text-[#444b55]">
              Upload Dokumen Sertifikat <span className="text-[#ee3124] italic">*</span>
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[8px] border border-dashed border-[#b1b4b8] bg-[#f9fafa] p-16 text-center transition-colors hover:border-[#009ea9] hover:bg-[#009ea9]/5">
              <DocumentUpload size={28} variant="Bulk" color="#009ea9" className="mb-4" />
              <span className="text-xs font-semibold text-[#009ea9]">
                {fileName ? fileName : "Pilih Berkas PDF / JPG"}
              </span>
              <span className="text-[11px] text-[#8c9197]">Maks. ukuran 5MB</span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="mt-16 flex items-center justify-end gap-12 border-t border-[#f2f4f7] pt-16">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              {editingCertificate ? "Simpan Perubahan" : "Simpan Sertifikat"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
