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
});
