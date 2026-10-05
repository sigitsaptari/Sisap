import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Checkbox } from "./Checkbox";

describe("Checkbox a11y", () => {
  it("has no axe violations and exposes the checkbox role", async () => {
    const { container } = render(
      <div>
        <Checkbox id="terms" />
        <label htmlFor="terms">Accept terms</label>
        <Checkbox aria-label="Mixed" checked="indeterminate" />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
    expect(screen.getByRole("checkbox", { name: "Accept terms" })).toBeTruthy();
  });

  it("toggles with click and Space key", async () => {
    render(<Checkbox aria-label="Agree" />);
    const box = screen.getByRole("checkbox", { name: "Agree" });
    expect(box.getAttribute("aria-checked")).toBe("false");
    await userEvent.click(box);
    expect(box.getAttribute("aria-checked")).toBe("true");
    box.focus();
    await userEvent.keyboard(" ");
    expect(box.getAttribute("aria-checked")).toBe("false");
  });

  it("reports mixed state", () => {
    render(<Checkbox aria-label="Mixed" checked="indeterminate" />);
    expect(screen.getByRole("checkbox").getAttribute("aria-checked")).toBe("mixed");
  });
});
