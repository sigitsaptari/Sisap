import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <Checkbox id="c1" text="Accept terms" />
        <Checkbox id="c2" text="Disabled option" disabled />
        <Checkbox id="c3" aria-label="Standalone checkbox" />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders with a label when text is provided", () => {
    render(<Checkbox id="c-text" text="Subscribe to newsletter" />);
    expect(screen.getByText("Subscribe to newsletter")).toBeTruthy();
    expect(screen.getByRole("checkbox", { name: "Subscribe to newsletter" })).toBeTruthy();
  });

  it("renders without a label when showText is false", () => {
    render(<Checkbox id="c-notext" text="Hidden label" showText={false} aria-label="Checkbox" />);
    expect(screen.queryByText("Hidden label")).toBeNull();
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("handles toggling when clicked", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox id="c-click" text="Click me" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");

    await userEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("does not trigger when disabled", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox id="c-disabled" text="Disabled" disabled onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox");

    await userEvent.click(checkbox);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(
      checkbox.getAttribute("aria-disabled") ?? checkbox.getAttribute("disabled"),
    ).toBeDefined();
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<Checkbox id="c-size" size="sm" aria-label="sm" />);
    expect(screen.getByRole("checkbox").className).toContain("size-4");

    rerender(<Checkbox id="c-size" size="md" aria-label="md" />);
    expect(screen.getByRole("checkbox").className).toContain("size-5");

    rerender(<Checkbox id="c-size" size="lg" aria-label="lg" />);
    expect(screen.getByRole("checkbox").className).toContain("size-6");
  });
});
