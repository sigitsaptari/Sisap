import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "./Drawer";

const Example = ({ side }: { side?: "left" | "right" | "top" | "bottom" }) => (
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerContent side={side}>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>Refine results</DrawerDescription>
    </DrawerContent>
  </Drawer>
);

describe("Drawer a11y", () => {
  it("opens as a labelled dialog with no axe violations", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog", { name: "Filters" });
    expect(await axeViolations(dialog)).toEqual([]);
  });

  it("closes on Escape", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("anchors to the requested side", async () => {
    render(<Example side="left" />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect((await screen.findByRole("dialog")).className).toContain("left-0");
  });
});
