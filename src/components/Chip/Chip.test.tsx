import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("has no axe violations across all types and colors", async () => {
    const { container } = render(
      <div>
        {(["soft", "outline", "solid"] as const).map((type) => (
          <Chip key={type} type={type} color="tosca" label={`Chip ${type}`} />
        ))}
      </div>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders text via label or children", () => {
    render(
      <div>
        <Chip label="Label Text" />
        <Chip>Children Text</Chip>
      </div>,
    );
    expect(screen.getByText("Label Text")).toBeTruthy();
    expect(screen.getByText("Children Text")).toBeTruthy();
  });

  it("renders dismiss button when showIconR or onDismiss is provided", async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    render(<Chip label="Removable" onDismiss={handleDismiss} />);
    const closeBtn = screen.getByRole("button", { name: /hapus chip/i });
    expect(closeBtn).toBeTruthy();

    await user.click(closeBtn);
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it("applies correct classes for soft, outline, and solid types", () => {
    const { container: softC } = render(<Chip type="soft" color="tosca" label="Soft" />);
    expect(softC.querySelector("span")?.className).toContain("bg-chip-tosca-soft");

    const { container: outlineC } = render(<Chip type="outline" color="green" label="Outline" />);
    expect(outlineC.querySelector("span")?.className).toContain("border-chip-green-solid");

    const { container: solidC } = render(<Chip type="solid" color="red" label="Solid" />);
    expect(solidC.querySelector("span")?.className).toContain("bg-chip-red-solid");
  });

  it("applies correct height classes for sizes sm, md, and lg", () => {
    const { container: smC } = render(<Chip size="sm" label="sm" />);
    expect(smC.querySelector("span")?.className).toContain("h-16");

    const { container: mdC } = render(<Chip size="md" label="md" />);
    expect(mdC.querySelector("span")?.className).toContain("h-20");

    const { container: lgC } = render(<Chip size="lg" label="lg" />);
    expect(lgC.querySelector("span")?.className).toContain("h-24");
  });
});
