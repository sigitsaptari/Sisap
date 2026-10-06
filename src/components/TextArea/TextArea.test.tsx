import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { TextArea } from "./TextArea";

describe("TextArea", () => {
  it("has no axe violations when rendered with label and description", async () => {
    const { container } = render(
      <TextArea
        label="Deskripsi Proyek"
        description="Jelaskan kebutuhan pengadaan Anda secara terperinci"
        hint="Maksimal 200 karakter"
        placeholder="Tuliskan spesifikasi produk..."
      />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("associates label with textarea via htmlFor and id", () => {
    render(<TextArea label="Catatan Tambahan" placeholder="Catatan pengiriman..." />);
    const textarea = screen.getByLabelText("Catatan Tambahan");
    expect(textarea).toBeTruthy();
    expect(textarea.getAttribute("placeholder")).toBe("Catatan pengiriman...");
  });

  it("renders Wajib and Opsional tags properly", () => {
    render(
      <div>
        <TextArea label="Alamat Wajib" required />
        <TextArea label="Catatan Opsional" optional />
      </div>,
    );
    expect(screen.getByText("Wajib")).toBeTruthy();
    expect(screen.getByText("Opsional")).toBeTruthy();
  });

  it("renders info tooltip icon when requested", () => {
    render(
      <TextArea
        label="Spesifikasi Tender"
        showInfoTooltip
        infoTooltip="Petunjuk pengisian spesifikasi tender"
      />,
    );
    expect(screen.getByLabelText("Informasi tambahan")).toBeTruthy();
  });

  it("renders error message, alert icon, and marks textarea aria-invalid", () => {
    render(
      <TextArea label="Deskripsi" errorMessage="Deskripsi tidak boleh kosong dan harus jelas" />,
    );
    const textarea = screen.getByLabelText("Deskripsi");
    expect(textarea.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Deskripsi tidak boleh kosong dan harus jelas")).toBeTruthy();
  });

  it("renders success message and checkmark icon", () => {
    render(
      <TextArea
        label="Spesifikasi Teknis"
        successMessage="Format spesifikasi sesuai standar PaDi!"
      />,
    );
    expect(screen.getByText("Format spesifikasi sesuai standar PaDi!")).toBeTruthy();
  });

  it("updates character counter as user types", async () => {
    const user = userEvent.setup();
    render(
      <TextArea label="Ulasan Vendor" maxLength={50} showCounter placeholder="Tulis ulasan..." />,
    );

    const textarea = screen.getByLabelText("Ulasan Vendor");
    expect(screen.getByText("0/50")).toBeTruthy();

    await user.type(textarea, "Vendor sangat responsif");
    expect(screen.getByText("23/50")).toBeTruthy();
  });

  it("supports custom counterText override from Figma properties", () => {
    render(<TextArea label="Catatan" showCounter counterText="0/200" />);
    expect(screen.getByText("0/200")).toBeTruthy();
  });

  it("applies error counter state when text exceeds maxLength", () => {
    render(
      <TextArea label="Batas Karakter" maxLength={5} value="Melebihi batas" showCounter readOnly />,
    );
    const textarea = screen.getByLabelText("Batas Karakter");
    expect(textarea.getAttribute("aria-invalid")).toBe("true");
  });

  it("applies disabled state properly", () => {
    render(<TextArea label="Catatan Terkunci" disabled />);
    const textarea = screen.getByLabelText("Catatan Terkunci");
    expect(textarea.hasAttribute("disabled")).toBe(true);
  });
});
