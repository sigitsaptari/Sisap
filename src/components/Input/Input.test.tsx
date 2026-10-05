import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Input } from "./Input";

describe("Input a11y", () => {
  it("has no axe violations when labelled", async () => {
    const { container } = render(
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" />
        <label htmlFor="bad">Name</label>
        <Input id="bad" invalid />
        <Input aria-label="Disabled" disabled />
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("sets aria-invalid only when invalid", () => {
    render(
      <>
        <Input aria-label="a" />
        <Input aria-label="b" invalid />
      </>,
    );
    expect(screen.getByLabelText("a").getAttribute("aria-invalid")).toBeNull();
    expect(screen.getByLabelText("b").getAttribute("aria-invalid")).toBe("true");
  });

  it("accepts typing", async () => {
    render(<Input aria-label="name" />);
    const input = screen.getByLabelText("name") as HTMLInputElement;
    await userEvent.type(input, "Sisap");
    expect(input.value).toBe("Sisap");
  });
});
