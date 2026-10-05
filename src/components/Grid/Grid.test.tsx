import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Grid } from "./Grid";

describe("Grid a11y", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <Grid columns={3}>
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </Grid>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("maps columns and gap to classes", () => {
    render(<Grid data-testid="g" columns={4} gap={6} />);
    const cls = screen.getByTestId("g").className;
    expect(cls).toContain("grid-cols-4");
    expect(cls).toContain("gap-6");
  });
});
