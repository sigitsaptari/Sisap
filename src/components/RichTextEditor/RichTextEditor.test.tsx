import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  let originalQueryCommandState: typeof document.queryCommandState;
  let originalQueryCommandValue: typeof document.queryCommandValue;

  beforeEach(() => {
    originalQueryCommandState = document.queryCommandState;
    originalQueryCommandValue = document.queryCommandValue;

    document.queryCommandState = vi.fn();
    document.queryCommandValue = vi.fn().mockReturnValue("");
  });

  afterEach(() => {
    document.queryCommandState = originalQueryCommandState;
    document.queryCommandValue = originalQueryCommandValue;
    vi.restoreAllMocks();
  });

  it("handles document.queryCommandState throwing an error gracefully", async () => {
    // Mock to throw an error
    document.queryCommandState = vi.fn().mockImplementation(() => {
      throw new Error("queryCommandState error");
    });

    // We also mock queryCommandValue since it's also called during updateActiveFormats
    document.queryCommandValue = vi.fn().mockImplementation(() => {
      throw new Error("queryCommandValue error");
    });

    const user = userEvent.setup();
    const { container } = render(<RichTextEditor label="Rich Text Content" />);

    // Find the content editable div
    const editor = container.querySelector('div[contenteditable="true"]');
    expect(editor).toBeTruthy();

    if (editor) {
      // Trigger updateActiveFormats via mouse up
      await user.click(editor);
    }

    // Verify it was called and threw the error, but the component didn't crash
    expect(document.queryCommandState).toHaveBeenCalled();
    expect(document.queryCommandValue).toHaveBeenCalled();

    // Check that one of the buttons that uses the fallback (isActive = false) does not have active class
    const boldButton = container.querySelector('button[title="Bold"]');
    expect(boldButton).toBeTruthy();
    expect(boldButton?.className).not.toContain("bg-[#e6f5f6]");
    expect(boldButton?.className).not.toContain("text-[#009ea9]");
  });
});
