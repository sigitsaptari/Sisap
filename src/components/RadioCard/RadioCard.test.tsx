import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { RadioGroup } from "../Radio";
import { RadioCard } from "./RadioCard";

describe("RadioCard", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <RadioGroup aria-label="Paket" defaultValue="basic" orientation="horizontal">
        <RadioCard value="basic" label="Basic" description="Rp 50.000 / bulan" />
        <RadioCard value="pro" label="Pro" description="Rp 150.000 / bulan" />
        <RadioCard value="ent" label="Enterprise" description="Hubungi sales" disabled />
      </RadioGroup>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("uses the label as accessible name and description as accessible description", () => {
    render(<RadioCard label="Pro" description="Rp 150.000 / bulan" />);
    const radio = screen.getByRole("radio", { name: "Pro" });
    expect(radio.getAttribute("aria-describedby")).toBeTruthy();
    expect(screen.getByText("Rp 150.000 / bulan")).toBeTruthy();
  });

  it("hides description when showDesc / showDec is false", () => {
    const { rerender } = render(<RadioCard label="Pro" description="Desc" showDesc={false} />);
    expect(screen.queryByText("Desc")).toBeNull();
    rerender(<RadioCard label="Pro" description="Desc" showDec={false} />);
    expect(screen.queryByText("Desc")).toBeNull();
  });

  it("renders the radio indicator on left and/or right", () => {
    const { container, rerender } = render(<RadioCard label="Both" />);
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBe(2);

    rerender(<RadioCard label="Left" radioRight={false} />);
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBe(1);

    rerender(<RadioCard label="None" radioLeft={false} radioRight={false} />);
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBe(0);
  });

  it("selects when clicking anywhere on the card", async () => {
    const onChange = vi.fn();
    render(<RadioCard label="Click card" description="desc" onChange={onChange} />);
    await userEvent.click(screen.getByText("desc"));
    expect(onChange).toHaveBeenCalled();
    expect((screen.getByRole("radio") as HTMLInputElement).checked).toBe(true);
  });

  it("does not select when disabled", async () => {
    const onChange = vi.fn();
    render(<RadioCard label="Disabled" disabled onChange={onChange} />);
    const radio = screen.getByRole("radio") as HTMLInputElement;
    await userEvent.click(screen.getByText("Disabled"));
    expect(onChange).not.toHaveBeenCalled();
    expect(radio.disabled).toBe(true);
  });

  it("maps the Figma state prop to checked / disabled", () => {
    const { unmount } = render(<RadioCard label="Active" state="active" onChange={() => {}} />);
    expect((screen.getByRole("radio") as HTMLInputElement).checked).toBe(true);
    unmount();

    render(<RadioCard label="Disabled" state="disabled" />);
    expect((screen.getByRole("radio") as HTMLInputElement).disabled).toBe(true);
  });

  it("works inside RadioGroup", async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Paket" defaultValue="basic" onValueChange={onValueChange}>
        <RadioCard value="basic" label="Basic" />
        <RadioCard value="pro" label="Pro" />
      </RadioGroup>,
    );
    const basic = screen.getByRole("radio", { name: "Basic" }) as HTMLInputElement;
    const pro = screen.getByRole("radio", { name: "Pro" }) as HTMLInputElement;
    expect(basic.checked).toBe(true);

    await userEvent.click(screen.getByText("Pro"));
    expect(onValueChange).toHaveBeenCalledWith("pro");
    expect(pro.checked).toBe(true);
    expect(basic.checked).toBe(false);
  });
});
