import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UploaderTrigger } from "./UploaderTrigger";

describe("UploaderTrigger", () => {
  it("renders image uploader trigger correctly", () => {
    render(<UploaderTrigger type="image" currentCount={1} maxFiles={5} onClick={() => {}} />);
    expect(screen.getByText("Tambah")).toBeTruthy();
    expect(screen.getByText("Foto (1/5)")).toBeTruthy();
    expect(screen.getByLabelText("Tambah Foto (1/5)")).toBeTruthy();
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBeFalsy();
  });

  it("renders video uploader trigger correctly", () => {
    render(<UploaderTrigger type="video" currentCount={0} maxFiles={1} onClick={() => {}} />);
    expect(screen.getByText("Tambah")).toBeTruthy();
    expect(screen.getByText("Video")).toBeTruthy();
    expect(screen.getByLabelText("Tambah Video")).toBeTruthy();
    expect((screen.getByRole("button") as HTMLButtonElement).disabled).toBeFalsy();
  });

  it("handles click events", async () => {
    const onClickMock = vi.fn();
    render(<UploaderTrigger type="image" currentCount={0} maxFiles={5} onClick={onClickMock} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("handles disabled state correctly", async () => {
    const onClickMock = vi.fn();
    render(
      <UploaderTrigger
        type="image"
        currentCount={0}
        maxFiles={5}
        onClick={onClickMock}
        disabled={true}
      />,
    );

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBeTruthy();
    expect(button.className).toContain("cursor-not-allowed");
    expect(button.className).toContain("opacity-50");

    await userEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it("handles dragging state styling correctly", () => {
    render(
      <UploaderTrigger
        type="image"
        currentCount={0}
        maxFiles={5}
        onClick={() => {}}
        isDragging={true}
      />,
    );

    const button = screen.getByRole("button");
    expect(button.className).toContain("scale-[1.02]");
    expect(button.className).toContain("border-[#009ea9]");
    expect(button.className).toContain("bg-[#009ea9]/10");
  });
});
