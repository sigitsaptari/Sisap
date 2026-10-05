import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Badge } from "./Badge";

describe("Badge a11y", () => {
  it("has no axe violations for every variant", async () => {
    const { container } = render(
      <div>
        {(["neutral", "brand", "success", "warning", "danger"] as const).map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders its label text", () => {
    render(<Badge variant="success">Paid</Badge>);
    expect(screen.getByText("Paid")).toBeTruthy();
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
    const { container: circleContainer } = render(
      <Badge variant="brand" shape="circle">
        5
      </Badge>,
    );
    const circleBadge = circleContainer.querySelector("span");
    expect(circleBadge?.className).toContain("aspect-square");

    const { container: pillContainer } = render(
      <Badge variant="counter" size="sm" shape="pill">
        1
      </Badge>,
    );
    const pillBadge = pillContainer.querySelector("span");
    expect(pillBadge?.className).toContain("px-1");
  });
});
