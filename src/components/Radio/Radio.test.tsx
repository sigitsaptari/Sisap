import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Radio, RadioGroup } from "./Radio";

describe("Radio", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <div>
        <RadioGroup aria-label="Fruit choices" defaultValue="apple">
          <Radio id="r1" value="apple" label="Apple" />
          <Radio id="r2" value="banana" label="Banana" />
          <Radio id="r3" value="orange" label="Orange" disabled />
        </RadioGroup>
        <Radio id="r4" aria-label="Standalone radio" />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders with a label when label or text is provided", () => {
    render(<Radio id="r-text" label="Text Option" />);
    expect(screen.getByText("Text Option")).toBeTruthy();
    expect(screen.getByRole("radio", { name: "Text Option" })).toBeTruthy();
  });

  it("renders without a label when showLabel or labelText is false", () => {
    render(<Radio id="r-notext" label="Hidden label" labelText={false} aria-label="Radio only" />);
    expect(screen.queryByText("Hidden label")).toBeNull();
    expect(screen.getByRole("radio")).toBeTruthy();
  });

  it("handles change events when clicked", async () => {
    const onChange = vi.fn();
    render(<Radio id="r-click" label="Click me" onChange={onChange} />);
    const radio = screen.getByRole("radio");
    expect((radio as HTMLInputElement).checked).toBe(false);

    await userEvent.click(radio);
    expect(onChange).toHaveBeenCalled();
    expect((radio as HTMLInputElement).checked).toBe(true);
  });

  it("does not trigger when disabled", async () => {
    const onChange = vi.fn();
    render(<Radio id="r-disabled" label="Disabled Option" disabled onChange={onChange} />);
    const radio = screen.getByRole("radio") as HTMLInputElement;

    await userEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
    expect(radio.disabled).toBe(true);
  });

  it("supports Figma prop aliases (disable, selected, text)", () => {
    render(<Radio id="r-figma" text="Figma Props" disable selected onChange={() => {}} />);
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.disabled).toBe(true);
    expect(radio.checked).toBe(true);
    expect(screen.getByText("Figma Props")).toBeTruthy();
  });

  it("applies correct size classes", () => {
    const { container, rerender } = render(<Radio id="r-size" size="sm" aria-label="sm" />);
    expect(container.querySelector(".size-16")).toBeTruthy();

    rerender(<Radio id="r-size" size="md" aria-label="md" />);
    expect(container.querySelector(".size-20")).toBeTruthy();

    rerender(<Radio id="r-size" size="lg" aria-label="lg" />);
    expect(container.querySelector(".size-24")).toBeTruthy();
  });

  it("works with RadioGroup in controlled and uncontrolled modes", async () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup
        aria-label="Subscription"
        defaultValue="monthly"
        onValueChange={handleValueChange}
      >
        <Radio id="sub-monthly" value="monthly" label="Monthly" />
        <Radio id="sub-yearly" value="yearly" label="Yearly" />
      </RadioGroup>,
    );

    const monthly = screen.getByRole("radio", {
      name: "Monthly",
    }) as HTMLInputElement;
    const yearly = screen.getByRole("radio", {
      name: "Yearly",
    }) as HTMLInputElement;

    expect(monthly.checked).toBe(true);
    expect(yearly.checked).toBe(false);

    await userEvent.click(yearly);
    expect(handleValueChange).toHaveBeenCalledWith("yearly");
    expect(yearly.checked).toBe(true);
    expect(monthly.checked).toBe(false);
  });
});
