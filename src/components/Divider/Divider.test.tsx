import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("has no axe violations in horizontal and vertical modes", async () => {
    const { container } = render(
      <div>
        <Divider />
        <div className="flex h-10 items-center">
          <span>Kiri</span>
          <Divider type="vertical" />
          <span>Kanan</span>
        </div>
        <Divider label="Atau" />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders horizontal divider by default with h-px", () => {
    const { container } = render(<Divider data-testid="divider" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-px");
    expect(el.className).toContain("w-full");
  });

  it("renders vertical divider when type or orientation is vertical", () => {
    const { container } = render(<Divider type="vertical" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("w-px");
    expect(el.className).toContain("h-full");
  });

  it("renders label content when provided", () => {
    render(<Divider label="Lanjutkan dengan" />);
    expect(screen.getByText("Lanjutkan dengan")).toBeTruthy();
  });

  it("supports non-decorative mode with separator role and aria-orientation", () => {
    const { container } = render(<Divider type="vertical" decorative={false} />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("role")).toBe("separator");
    expect(el.getAttribute("aria-orientation")).toBe("vertical");
  });
});
