import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("has no axe violations when rendered with label", async () => {
    const { container } = render(
      <TextField
        label="Nama Lengkap"
        description="Sesuai kartu identitas KTP"
        hint="Gunakan huruf kapital di awal"
        placeholder="Contoh: John Doe"
      />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("associates label with input via htmlFor and id", () => {
    render(<TextField label="Email Pengguna" placeholder="user@padi.id" />);
    const input = screen.getByLabelText("Email Pengguna");
    expect(input).toBeTruthy();
    expect(input.getAttribute("placeholder")).toBe("user@padi.id");
  });

  it("renders Wajib and Opsional tags properly", () => {
    render(
      <div>
        <TextField label="Nama Wajib" required />
        <TextField label="Nama Opsional" optional />
      </div>,
    );
    expect(screen.getByText("Wajib")).toBeTruthy();
    expect(screen.getByText("Opsional")).toBeTruthy();
  });

  it("renders prefix, suffix, and icons", () => {
    render(
      <TextField
        label="Harga Produk"
        prefix="Rp"
        suffix="IDR"
        leftIcon={<Search data-testid="search-icon" />}
        placeholder="100.000"
      />,
    );
    expect(screen.getByText("Rp")).toBeTruthy();
    expect(screen.getByText("IDR")).toBeTruthy();
    expect(screen.getByTestId("search-icon")).toBeTruthy();
  });

  it("renders error message and marks field aria-invalid", () => {
    render(
      <TextField label="Password" type="password" errorMessage="Password minimal 8 karakter" />,
    );
    const input = screen.getByLabelText("Password");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByText("Password minimal 8 karakter")).toBeTruthy();
  });

  it("renders success message", () => {
    render(<TextField label="Kode Promo" successMessage="Kupon diskon berhasil diterapkan!" />);
    expect(screen.getByText("Kupon diskon berhasil diterapkan!")).toBeTruthy();
  });

  it("updates character counter as user types", async () => {
    const user = userEvent.setup();
    render(<TextField label="Catatan" maxLength={20} showCounter />);

    const input = screen.getByLabelText("Catatan");
    expect(screen.getByText("0/20")).toBeTruthy();

    await user.type(input, "Halo");
    expect(screen.getByText("4/20")).toBeTruthy();
  });

  it("applies disabled state properly", () => {
    render(<TextField label="Field Nonaktif" disabled />);
    const input = screen.getByLabelText("Field Nonaktif");
    expect(input.hasAttribute("disabled")).toBe(true);
  });
});
