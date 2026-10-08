import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { axeViolations } from "../../test/a11y";
import { SelectField } from "./SelectField";

const mockOptions = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];

describe("SelectField", () => {
  it("has no axe violations when rendered with label", async () => {
    const { container } = render(
      <SelectField
        label="Select Label"
        options={mockOptions}
        description="Select description"
        hint="Select hint"
      />,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders label and placeholder correctly", () => {
    render(<SelectField label="My Select" placeholder="Choose..." options={mockOptions} />);
    expect(screen.getByText("My Select")).toBeTruthy();
    expect(screen.getByText("Choose...")).toBeTruthy();
  });

  it("opens dropdown on click and displays options", async () => {
    const user = userEvent.setup();
    render(<SelectField placeholder="Choose..." options={mockOptions} />);

    const trigger = screen.getByRole("button", { name: "Choose..." });
    expect(screen.queryByRole("listbox")).toBeNull();

    await user.click(trigger);

    expect(screen.getByRole("listbox")).toBeTruthy();
    expect(screen.getByText("Option 1")).toBeTruthy();
    expect(screen.getByText("Option 2")).toBeTruthy();
    expect(screen.getByText("Option 3")).toBeTruthy();
  });

  it("handles single selection", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SelectField placeholder="Choose..." options={mockOptions} onChange={handleChange} />
    );

    await user.click(screen.getByRole("button", { name: "Choose..." }));

    const optionToSelect = screen.getByText("Option 2");
    await user.click(optionToSelect);

    expect(handleChange).toHaveBeenCalledWith("opt2");
    // Verify dropdown is closed
    expect(screen.queryByRole("listbox")).toBeNull();
    // Verify trigger displays selected text
    expect(screen.getByRole("button", { name: "Option 2" })).toBeTruthy();
  });

  it("handles multiple selection", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <SelectField
        placeholder="Choose..."
        options={mockOptions}
        multiple
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose..." }));

    const option1 = screen.getByText("Option 1");
    const option2 = screen.getByText("Option 2");

    await user.click(option1);
    expect(handleChange).toHaveBeenCalledWith(["opt1"]);

    await user.click(option2);
    expect(handleChange).toHaveBeenCalledWith(["opt1", "opt2"]);

    // Verify dropdown stays open
    expect(screen.getByRole("listbox")).toBeTruthy();

    // Trigger should update its display text
    expect(screen.getByRole("button", { name: "Option 1, Option 2" })).toBeTruthy();

    // Deselect
    await user.click(option1);
    expect(handleChange).toHaveBeenCalledWith(["opt2"]);
    expect(screen.getByRole("button", { name: "Option 2" })).toBeTruthy();
  });

  it("filters options when searchable", async () => {
    const user = userEvent.setup();
    const handleSearchChange = vi.fn();
    render(
      <SelectField
        placeholder="Choose..."
        options={mockOptions}
        searchable
        searchPlaceholder="Find option"
        onSearchChange={handleSearchChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose..." }));

    const searchInput = screen.getByPlaceholderText("Find option");
    await user.type(searchInput, "2");

    expect(handleSearchChange).toHaveBeenCalledWith("2");
    expect(screen.queryByText("Option 1")).toBeNull();
    expect(screen.getByText("Option 2")).toBeTruthy();
    expect(screen.queryByText("Option 3")).toBeNull();
  });

  it("displays no options found message when search matches nothing", async () => {
    const user = userEvent.setup();
    render(
      <SelectField
        placeholder="Choose..."
        options={mockOptions}
        searchable
        searchPlaceholder="Find option"
      />
    );

    await user.click(screen.getByRole("button", { name: "Choose..." }));

    const searchInput = screen.getByPlaceholderText("Find option");
    await user.type(searchInput, "invalid search");

    expect(screen.getByText("No options found")).toBeTruthy();
    expect(screen.queryByText("Option 1")).toBeNull();
  });

  it("applies disabled state properly", async () => {
    const user = userEvent.setup();
    render(<SelectField placeholder="Choose..." options={mockOptions} disabled />);

    const trigger = screen.getByRole("button", { name: "Choose..." });
    expect(trigger.hasAttribute("disabled")).toBe(true);

    await user.click(trigger);
    expect(screen.queryByRole("listbox")).toBeNull(); // Should not open
  });

  it("handles controlled mode properly", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(
      <SelectField
        placeholder="Choose..."
        options={mockOptions}
        value="opt1"
        onChange={handleChange}
      />
    );

    // Initial value
    expect(screen.getByRole("button", { name: "Option 1" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Option 1" }));
    await user.click(screen.getByText("Option 2"));

    expect(handleChange).toHaveBeenCalledWith("opt2");

    // UI should not change until prop is updated
    expect(screen.getByRole("button", { name: "Option 1" })).toBeTruthy();

    // Rerender with new value
    rerender(
      <SelectField
        placeholder="Choose..."
        options={mockOptions}
        value="opt2"
        onChange={handleChange}
      />
    );

    expect(screen.getByRole("button", { name: "Option 2" })).toBeTruthy();
  });
});
