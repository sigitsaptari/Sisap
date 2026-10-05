import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./Dialog";

const Example = () => (
  <Dialog>
    <DialogTrigger>Open</DialogTrigger>
    <DialogContent>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogContent>
  </Dialog>
);

describe("Dialog a11y", () => {
  it("opens with dialog role, labelled by title, and has no axe violations", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog", { name: "Confirm" });
    expect(await axeViolations(dialog)).toEqual([]);
  });

  it("closes on Escape and exposes a labelled close button", async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("button", { name: "Close" })).toBeTruthy();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
