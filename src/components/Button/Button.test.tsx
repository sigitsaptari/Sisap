import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Button } from "./Button";

describe("Button a11y", () => {
  it("has no axe violations (all variants)", async () => {
    const { container } = render(
      <div>
        <Button>Primary</Button>
        <Button variant="danger">Delete</Button>
        <Button size="icon" aria-label="Add" />
        <Button isLoading loadingText="Saving…">Save</Button>
        <Button disabled>Disabled</Button>
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("is a native button that defaults to type=button", () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole("button", { name: "Go" }).getAttribute("type")).toBe("button");
  });

  it("is disabled and aria-busy while loading", () => {
    render(<Button isLoading>Save</Button>);
    const button = screen.getByRole("button");
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("supports asChild and click handling", async () => {
    const onClick = vi.fn();
    render(<Button asChild><a href="/x" onClick={onClick}>Link</a></Button>);
    await userEvent.click(screen.getByRole("link", { name: "Link" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("lets className override variant classes (tailwind-merge)", () => {
    render(<Button className="h-12">Tall</Button>);
    const cls = screen.getByRole("button").className;
    expect(cls).toContain("h-12");
    expect(cls).not.toContain("h-10");
  });
});
