import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Uploader } from "./Uploader";

describe("Uploader", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Uploader
          id="up-test-1"
          type="image"
          label="Foto Produk"
          required
        />
      </div>
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders label and required indicator", () => {
    render(<Uploader label="Foto Produk" required />);
    expect(screen.getByText("Foto Produk")).toBeTruthy();
    expect(screen.getByText("Wajib")).toBeTruthy();
  });

  it("renders correct trigger counter for images", () => {
    render(<Uploader type="image" maxFiles={5} />);
    expect(screen.getByText("Foto (0/5)")).toBeTruthy();
  });

  it("renders helper rules", () => {
    render(<Uploader type="image" />);
    expect(
      screen.getByText(/Wajib memiliki 1 foto produk, maksimal pilih foto hingga 5 gambar/i)
    ).toBeTruthy();
    expect(
      screen.getByText(/Resolusi minimal 1000 x 1000 px/i)
    ).toBeTruthy();
  });

  it("renders uploaded files with remove button", async () => {
    const onRemoveMock = vi.fn();
    render(
      <Uploader
        type="image"
        defaultFiles={[
          {
            id: "img-1",
            url: "https://example.com/test.jpg",
            name: "test.jpg",
            status: "success",
          },
        ]}
        onChange={onRemoveMock}
      />
    );

    expect(screen.getByText("Foto (1/5)")).toBeTruthy();
    expect(screen.getByText("Utama")).toBeTruthy();
    const removeBtn = screen.getByRole("button", { name: "Hapus file" });
    expect(removeBtn).toBeTruthy();

    await userEvent.click(removeBtn);
    expect(onRemoveMock).toHaveBeenCalledWith([]);
  });

  it("renders uploading status with percentage and cancel button", () => {
    render(
      <Uploader
        type="image"
        simulateUpload={false}
        defaultFiles={[
          {
            id: "uploading-1",
            url: "https://example.com/test.jpg",
            name: "test.jpg",
            status: "uploading",
            progress: 45,
          },
        ]}
      />
    );

    expect(screen.getByText("45%")).toBeTruthy();
    expect(screen.getByText("Mengunggah...")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Batal unggah" })).toBeTruthy();
  });

  it("renders video uploader with play overlay in success state", () => {
    render(
      <Uploader
        type="video"
        label="Video Produk"
        defaultFiles={[
          {
            id: "vid-1",
            url: "https://example.com/test.mp4",
            name: "test.mp4",
            status: "success",
          },
        ]}
      />
    );

    expect(screen.getByText("Video Produk")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Putar video" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Hapus file" })).toBeTruthy();
  });

  it("updates progress and reaches success in simulated upload", async () => {
    vi.useFakeTimers();
    const onChangeMock = vi.fn();
    const file = new File(["dummy content"], "photo.png", { type: "image/png" });

    // Mock URL.createObjectURL and revokeObjectURL
    const origCreate = URL.createObjectURL;
    const origRevoke = URL.revokeObjectURL;
    URL.createObjectURL = vi.fn(() => "blob:mock-url");
    URL.revokeObjectURL = vi.fn();

    const { container } = render(
      <Uploader
        type="image"
        simulateUpload={true}
        files={[]}
        onChange={onChangeMock}
      />
    );

    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeTruthy();

    // Trigger file change
    fireEvent.change(input, { target: { files: [file] } });

    // Initial item added with status uploading, progress 0
    expect(onChangeMock).toHaveBeenCalled();
    const initialCallArg = onChangeMock.mock.calls[0][0];
    expect(initialCallArg[0].status).toBe("uploading");
    expect(initialCallArg[0].progress).toBe(0);

    // Advance timers for progress ticks
    vi.advanceTimersByTime(1200);

    // Final call should have status success and progress 100
    const lastCallArg = onChangeMock.mock.calls[onChangeMock.mock.calls.length - 1][0];
    expect(lastCallArg[0].status).toBe("success");
    expect(lastCallArg[0].progress).toBe(100);

    URL.createObjectURL = origCreate;
    URL.revokeObjectURL = origRevoke;
    vi.useRealTimers();
  });
});

