import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Stack } from "./Stack";

describe("Stack a11y", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <Stack direction="row" gap={2} align="center">
        <span>One</span>
        <span>Two</span>
      </Stack>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("applies layout classes and merges overrides", () => {
    render(<Stack data-testid="s" direction="row" gap={2} className="gap-8" />);
    const cls = screen.getByTestId("s").className;
    expect(cls).toContain("flex-row");
    expect(cls).toContain("gap-8");
    expect(cls).not.toContain("gap-2");
  });

  it("supports asChild for semantic elements", () => {
    render(
      <Stack asChild>
        <ul>
          <li>Item</li>
        </ul>
      </Stack>,
    );
    expect(screen.getByRole("list").className).toContain("flex");
  });
});
