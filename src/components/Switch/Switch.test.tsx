import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Switch id="s1" label="Enable notifications" />
        <Switch id="s2" label="Disabled switch" disabled />
        <Switch id="s3" aria-label="Standalone switch" />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders with a label when label or text is provided", () => {
    render(<Switch id="s-label" label="Airplane mode" />);
    expect(screen.getByText("Airplane mode")).toBeTruthy();
    expect(screen.getByRole("switch", { name: "Airplane mode" })).toBeTruthy();
  });

  it("supports text prop as alias for label", () => {
    render(<Switch id="s-text" text="Dark mode" />);
    expect(screen.getByText("Dark mode")).toBeTruthy();
    expect(screen.getByRole("switch", { name: "Dark mode" })).toBeTruthy();
  });

  it("renders without a label when showText is false", () => {
    render(<Switch id="s-nolabel" label="Hidden label" showText={false} aria-label="Switch" />);
    expect(screen.queryByText("Hidden label")).toBeNull();
    expect(screen.getByRole("switch")).toBeTruthy();
  });

  it("handles toggling when clicked", async () => {
    const onCheckedChange = vi.fn();
    render(<Switch id="s-toggle" label="Toggle switch" onCheckedChange={onCheckedChange} />);
    const switchEl = screen.getByRole("switch");
    expect(switchEl.getAttribute("aria-checked")).toBe("false");

    await userEvent.click(switchEl);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not trigger when disabled", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch id="s-dis" label="Disabled switch" disabled onCheckedChange={onCheckedChange} />,
    );
    const switchEl = screen.getByRole("switch");

    await userEvent.click(switchEl);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(switchEl.getAttribute("disabled")).not.toBeNull();
  });

  it("applies correct track size classes", () => {
    const { rerender } = render(<Switch id="s-sm" size="sm" aria-label="sm" />);
    expect(screen.getByRole("switch").className).toContain("w-[30px]");

    rerender(<Switch id="s-md" size="md" aria-label="md" />);
    expect(screen.getByRole("switch").className).toContain("w-[34px]");

    rerender(<Switch id="s-lg" size="lg" aria-label="lg" />);
    expect(screen.getByRole("switch").className).toContain("w-[38px]");
  });
});
