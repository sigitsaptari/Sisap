import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Step, Stepper, StepperItem } from "./Stepper";

describe("Stepper", () => {
  it("has no axe violations when rendered in horizontal mode", async () => {
    const { container } = render(
      <Stepper
        currentStep={2}
        steps={[
          { title: "Verifikasi", description: "Lengkapi data diri" },
          { title: "Pembayaran", description: "Pilih rekening transfer" },
          { title: "Selesai", description: "Transaksi berhasil" },
        ]}
      />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("has no axe violations when rendered in vertical mode", async () => {
    const { container } = render(
      <Stepper
        currentStep={1}
        mode="vertical"
        steps={[
          { title: "Tahap 1", description: "Pengajuan tender" },
          { title: "Tahap 2", description: "Review kurasi" },
          { title: "Tahap 3", description: "Persetujuan PO" },
        ]}
      />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders steps with proper step numbers and labels", () => {
    render(
      <Stepper
        currentStep={2}
        steps={[
          { title: "Pendaftaran", description: "Isi form registrasi" },
          { title: "Verifikasi", description: "Cek email aktivasi" },
          { title: "Aktif", description: "Akun siap digunakan" },
        ]}
      />,
    );

    expect(screen.getByText("Pendaftaran")).toBeTruthy();
    expect(screen.getByText("Verifikasi")).toBeTruthy();
    expect(screen.getByText("Aktif")).toBeTruthy();
    expect(screen.getByText("Cek email aktivasi")).toBeTruthy();
  });

  it("computes step states correctly from currentStep", () => {
    render(
      <Stepper currentStep={2}>
        <Step title="Step 1" />
        <Step title="Step 2" />
        <Step title="Step 3" />
      </Stepper>,
    );

    const step2 = screen.getByText("Step 2").closest('[role="listitem"]');
    expect(step2?.getAttribute("aria-current")).toBe("step");
  });

  it("triggers onStepChange when interactive step is clicked", async () => {
    const user = userEvent.setup();
    const handleStepChange = vi.fn();

    render(
      <Stepper
        currentStep={1}
        onStepChange={handleStepChange}
        steps={[{ title: "Step 1" }, { title: "Step 2" }, { title: "Step 3" }]}
      />,
    );

    const step2 = screen.getByText("Step 2");
    await user.click(step2);
    expect(handleStepChange).toHaveBeenCalledWith(2);
  });

  it("supports keyboard Enter trigger for interactive steps", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<StepperItem state="default" title="Klik Enter" onClick={handleClick} />);

    const item = screen.getByText("Klik Enter").closest<HTMLElement>('[role="listitem"]');
    expect(item).toBeTruthy();
    item?.focus();
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders Figma exact variant properties directly on StepperItem", () => {
    const { container } = render(
      <div>
        <StepperItem
          mode="Horizontal"
          position="First"
          state="Success"
          textOn="Bottom"
          title="Berhasil"
          description="Sudah diverifikasi"
        />
        <StepperItem
          mode="Vertical"
          position="Middle"
          state="Active"
          textOn="Right"
          title="Sedang Berjalan"
          description="Menunggu approval"
        />
        <StepperItem
          mode="Horizontal"
          position="Last"
          state="Default"
          textOn="Right"
          title="Terakhir"
          description="Belum mulai"
        />
      </div>,
    );

    expect(screen.getByText("Berhasil")).toBeTruthy();
    expect(screen.getByText("Sedang Berjalan")).toBeTruthy();
    expect(screen.getByText("Terakhir")).toBeTruthy();
    // Success step should render SVG checkmark
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
