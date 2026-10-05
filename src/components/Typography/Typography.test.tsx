import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Typography } from "./Typography";

describe("Typography a11y", () => {
  it("has no axe violations", async () => {
    const { container } = render(
      <main>
        <Typography variant="h1">Title</Typography>
        <Typography variant="h2">Section</Typography>
        <Typography>Body</Typography>
        <Typography variant="muted">Muted</Typography>
        <Typography variant="code">npm i</Typography>
      </main>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders semantic elements by variant", () => {
    render(<><Typography variant="h3">H</Typography><Typography>P</Typography></>);
    expect(screen.getByRole("heading", { level: 3 })).toBeTruthy();
    expect(screen.getByText("P").tagName).toBe("P");
  });

  it("can decouple visual style from element via `as`", () => {
    render(<Typography variant="h1" as="h2">Sub</Typography>);
    expect(screen.getByRole("heading", { level: 2 })).toBeTruthy();
  });
});
