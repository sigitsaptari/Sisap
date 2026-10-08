import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  let originalQueryCommandState: typeof document.queryCommandState;
  let originalQueryCommandValue: typeof document.queryCommandValue;
  let originalExecCommand: typeof document.execCommand;

  beforeEach(() => {
    originalQueryCommandState = document.queryCommandState;
    originalQueryCommandValue = document.queryCommandValue;
    originalExecCommand = document.execCommand;

    document.queryCommandState = vi.fn().mockReturnValue(false);
    document.queryCommandValue = vi.fn().mockReturnValue("");
    document.execCommand = vi.fn();
  });

  afterEach(() => {
    document.queryCommandState = originalQueryCommandState;
    document.queryCommandValue = originalQueryCommandValue;
    document.execCommand = originalExecCommand;
    vi.restoreAllMocks();
  });

  it("handles document.queryCommandState throwing an error gracefully and falls back to false", async () => {
    // Mock to throw an error for queryCommandState
    document.queryCommandState = vi.fn().mockImplementation(() => {
      throw new Error("Not supported in this environment");
    });

    render(<RichTextEditor id="test-rte" label="Content" />);

    // Find the contentEditable area
    const editorDiv = document.getElementById("test-rte");
    expect(editorDiv).not.toBeNull();

    // Trigger an event that calls updateActiveFormats
    fireEvent.keyUp(editorDiv!);

    // Ensure that it threw the error (by checking if the mock was called)
    expect(document.queryCommandState).toHaveBeenCalled();

    // To verify fallback value is used, we can check if the toolbar buttons (e.g. Bold)
    // do not have the active class, meaning they received isActive=false from the current state.
    const boldButton = screen.getByTitle("Bold");
    expect(boldButton.className).not.toContain("bg-[#e6f5f6]");
    expect(boldButton.className).not.toContain("text-[#009ea9]");
    expect(boldButton.className).toContain("hover:bg-neutral-200");
  });

  it("handles document.queryCommandValue throwing an error gracefully and falls back to false", async () => {
    // Mock to throw an error for queryCommandValue
    document.queryCommandValue = vi.fn().mockImplementation(() => {
      throw new Error("Not supported");
    });

    render(<RichTextEditor id="test-rte" label="Content" />);

    const editorDiv = document.getElementById("test-rte");
    fireEvent.keyUp(editorDiv!);

    expect(document.queryCommandValue).toHaveBeenCalled();

    // H1 button should not be active
    const h1Button = screen.getByTitle("Heading 1");
    expect(h1Button.className).not.toContain("bg-[#e6f5f6]");
  });
});
