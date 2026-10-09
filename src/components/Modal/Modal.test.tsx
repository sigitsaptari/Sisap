import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders correctly when open with title and description", () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Konfirmasi Tindakan"
        description="Apakah Anda yakin ingin menyimpan perubahan ini?"
      >
        <p>Konten modal tambahan</p>
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(screen.getByText("Konfirmasi Tindakan")).toBeTruthy();
    expect(screen.getByText("Apakah Anda yakin ingin menyimpan perubahan ini?")).toBeTruthy();
    expect(screen.getByText("Konten modal tambahan")).toBeTruthy();
    expect(screen.getByText("Batal")).toBeTruthy();
    expect(screen.getByText("Simpan")).toBeTruthy();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Modal Tertutup">
        Konten
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Modal Title" showCloseButton={true}>
        Konten
      </Modal>,
    );

    const closeBtn = screen.getByLabelText("Tutup");
    await user.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup();
    const handleConfirm = vi.fn();

    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Modal Title"
        confirmText="Simpan"
        onConfirm={handleConfirm}
      />,
    );

    const confirmBtn = screen.getByText("Simpan");
    await user.click(confirmBtn);

    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleCancel = vi.fn();

    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="Modal Title"
        cancelText="Batal"
        onCancel={handleCancel}
      />,
    );

    const cancelBtn = screen.getByText("Batal");
    await user.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it("closes on Escape key press", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={handleClose} title="Escape Test" closeOnEscape={true}>
        Konten
      </Modal>,
    );

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { baseElement } = render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title="A11y Modal"
        description="Deskripsi a11y"
      >
        Konten a11y
      </Modal>,
    );

    expect(await axeViolations(baseElement)).toEqual([]);
  });
});
