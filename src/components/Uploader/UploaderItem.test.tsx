import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UploaderItem } from "./UploaderItem";
import type { UploaderFile } from "./Uploader.types";

describe("UploaderItem", () => {
  const mockRemove = vi.fn();
  const mockRetry = vi.fn();

  it("renders uploading state with progress", () => {
    const file: UploaderFile = {
      id: "1",
      url: "blob:test",
      status: "uploading",
      progress: 45,
    };
    render(<UploaderItem file={file} type="image" onRemove={mockRemove} />);

    expect(screen.getByText("45%")).toBeTruthy();
    expect(screen.getByText("Mengunggah...")).toBeTruthy();

    // Verify cancel button triggers remove
    const cancelBtn = screen.getByRole("button", { name: "Batal unggah" });
    fireEvent.click(cancelBtn);
    expect(mockRemove).toHaveBeenCalledWith("1");
  });

  it("clamps progress to 0-100", () => {
    const fileNegative: UploaderFile = {
      id: "2",
      url: "blob:test",
      status: "uploading",
      progress: -10,
    };
    const { unmount } = render(
      <UploaderItem file={fileNegative} type="image" onRemove={mockRemove} />,
    );
    expect(screen.getByText("0%")).toBeTruthy();
    unmount();

    const fileOver: UploaderFile = {
      id: "3",
      url: "blob:test",
      status: "uploading",
      progress: 150,
    };
    render(<UploaderItem file={fileOver} type="image" onRemove={mockRemove} />);
    expect(screen.getByText("100%")).toBeTruthy();
  });

  it("renders error state with retry and remove", () => {
    const file: UploaderFile = {
      id: "4",
      url: "blob:test",
      status: "error",
      errorMessage: "File terlalu besar",
    };
    render(<UploaderItem file={file} type="image" onRemove={mockRemove} onRetry={mockRetry} />);

    expect(screen.getByText("File terlalu besar")).toBeTruthy();

    const retryBtn = screen.getByRole("button", { name: "Coba lagi" });
    fireEvent.click(retryBtn);
    expect(mockRetry).toHaveBeenCalledWith("4");

    const removeBtn = screen.getByRole("button", { name: "Hapus" });
    fireEvent.click(removeBtn);
    expect(mockRemove).toHaveBeenCalledWith("4");
  });

  it("renders success image state with primary badge", () => {
    const file: UploaderFile = {
      id: "5",
      url: "https://example.com/test.jpg",
      status: "success",
      name: "custom-name.jpg",
    };
    render(<UploaderItem file={file} type="image" isPrimary={true} onRemove={mockRemove} />);

    const img = screen.getByRole("img");
    expect(img.getAttribute("src")).toBe("https://example.com/test.jpg");
    expect(img.getAttribute("alt")).toBe("custom-name.jpg");

    expect(screen.getByText("Utama")).toBeTruthy();

    const deleteBtn = screen.getByRole("button", { name: "Hapus file" });
    fireEvent.click(deleteBtn);
    expect(mockRemove).toHaveBeenCalledWith("5");
  });

  it("renders success video state and handles play", () => {
    const file: UploaderFile = {
      id: "6",
      url: "https://example.com/test.mp4",
      status: "success",
    };
    render(<UploaderItem file={file} type="video" onRemove={mockRemove} />);

    // Primary badge shouldn't render for video
    expect(screen.queryByText("Utama")).toBeNull();

    // Verify video is present but we can't play it from standard button yet until we click the overlay
    const playOverlay = screen.getByRole("button", { name: "Putar video" });
    expect(playOverlay).toBeTruthy();

    // Clicking play overlay hides it
    fireEvent.click(playOverlay);
    expect(screen.queryByRole("button", { name: "Putar video" })).toBeNull();

    // The video delete button is still present
    const deleteBtn = screen.getByRole("button", { name: "Hapus file" });
    fireEvent.click(deleteBtn);
    expect(mockRemove).toHaveBeenCalledWith("6");
  });

  it("hides interactive buttons when disabled", () => {
    const fileUploading: UploaderFile = { id: "7", url: "", status: "uploading" };
    const { unmount } = render(
      <UploaderItem file={fileUploading} type="image" onRemove={mockRemove} disabled={true} />,
    );
    expect(screen.queryByRole("button", { name: "Batal unggah" })).toBeNull();
    unmount();

    const fileError: UploaderFile = { id: "8", url: "", status: "error" };
    render(
      <UploaderItem
        file={fileError}
        type="image"
        onRemove={mockRemove}
        onRetry={mockRetry}
        disabled={true}
      />,
    );
    expect(screen.queryByRole("button", { name: "Coba lagi" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Hapus" })).toBeNull();
    unmount();

    const fileSuccess: UploaderFile = {
      id: "9",
      url: "https://example.com/test.jpg",
      status: "success",
    };
    render(<UploaderItem file={fileSuccess} type="image" onRemove={mockRemove} disabled={true} />);
    expect(screen.queryByRole("button", { name: "Hapus file" })).toBeNull();
  });

  it("renders default default error message", () => {
    const file: UploaderFile = {
      id: "10",
      url: "blob:test",
      status: "error",
      // no errorMessage
    };
    render(<UploaderItem file={file} type="image" onRemove={mockRemove} onRetry={mockRetry} />);

    expect(screen.getByText("Gagal unggah")).toBeTruthy();
  });
});
