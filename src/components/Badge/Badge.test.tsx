import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Badge } from "./Badge";

describe("Badge a11y", () => {
  it("has no axe violations for all badge variants", async () => {
    const { container } = render(
      <div>
        {(["counter", "notification", "default"] as const).map((v) => (
          <Badge key={v} variant={v} label="1" />
        ))}
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders its label text or children", () => {
    render(
      <div>
        <Badge label="5" />
        <Badge>9</Badge>
      </div>,
    );
    expect(screen.getByText("5")).toBeTruthy();
    expect(screen.getByText("9")).toBeTruthy();
  });

  it("renders counter badge with label prop and sizes", () => {
    render(
      <div>
        <Badge variant="counter" size="sm" label="1" />
        <Badge variant="counter" size="md" label="99+" />
      </div>,
    );
    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("99+")).toBeTruthy();
  });

  it("applies symmetrical 1:1 circle dimensions for single digit counter badge", () => {
    const { container: smContainer } = render(<Badge variant="counter" size="sm" label="1" />);
    const smBadge = smContainer.querySelector("span");
    expect(smBadge?.className).toContain("aspect-square");
    expect(smBadge?.className).toContain("size-[14px]");
    expect(smBadge?.className).toContain("p-0");

    const { container: mdContainer } = render(<Badge variant="counter" size="md" label="2" />);
    const mdBadge = mdContainer.querySelector("span");
    expect(mdBadge?.className).toContain("aspect-square");
    expect(mdBadge?.className).toContain("size-4");
    expect(mdBadge?.className).toContain("p-0");
  });

  it("applies expanding pill dimensions for multi-character counter badge", () => {
    const { container } = render(<Badge variant="counter" size="sm" label="99+" />);
    const badge = container.querySelector("span");
    expect(badge?.className).toContain("px-1");
    expect(badge?.className).not.toContain("aspect-square");
  });

  it("honors explicit shape prop", () => {
    const { container: circleContainer } = render(<Badge shape="circle" label="5" />);
    const circleBadge = circleContainer.querySelector("span");
    expect(circleBadge?.className).toContain("aspect-square");

    const { container: pillContainer } = render(<Badge size="sm" shape="pill" label="1" />);
    const pillBadge = pillContainer.querySelector("span");
    expect(pillBadge?.className).toContain("px-1");
  });
});
