import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";

const Example = ({ onSelect = () => {} }: { onSelect?: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuItem onSelect={onSelect}>Profile</DropdownMenuItem>
      <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="danger">Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe("DropdownMenu a11y", () => {
  it("opens from keyboard with menu semantics and no axe violations", async () => {
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Actions" });
    trigger.focus();
    await userEvent.keyboard("{Enter}");
    const menu = await screen.findByRole("menu");
    expect(await axeViolations(menu)).toEqual([]);
    expect(screen.getAllByRole("menuitem").length).toBe(2);
    expect(
      screen.getByRole("menuitemcheckbox", { name: "Notifications" }).getAttribute("aria-checked"),
    ).toBe("true");
  });

  it("focuses the first item on keyboard open, selects with Enter and closes", async () => {
    const onSelect = vi.fn();
    render(<Example onSelect={onSelect} />);
    screen.getByRole("button", { name: "Actions" }).focus();
    await userEvent.keyboard("{Enter}");
    await screen.findByRole("menu");
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
