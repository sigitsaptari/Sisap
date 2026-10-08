import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { axeViolations } from "../../test/a11y";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  let originalInnerTextDescriptor: PropertyDescriptor | undefined;
  let originalQueryCommandState: typeof document.queryCommandState;
  let originalQueryCommandValue: typeof document.queryCommandValue;
  let originalExecCommand: typeof document.execCommand;

  beforeEach(() => {
    originalQueryCommandState = document.queryCommandState;
    originalQueryCommandValue = document.queryCommandValue;
    originalExecCommand = document.execCommand;

    // Mock document methods used by RichTextEditor
    document.execCommand = vi.fn();
    document.queryCommandState = vi.fn().mockReturnValue(false);
    document.queryCommandValue = vi.fn().mockReturnValue("");

    // JSDOM elements do not support innerText by default. We need to mock it on HTMLElement prototype
    // so `editorRef.current.innerText` does not return undefined.
    originalInnerTextDescriptor = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "innerText",
    );
    if (!originalInnerTextDescriptor) {
      Object.defineProperty(HTMLElement.prototype, "innerText", {
        get() {
          return this.textContent || "";
        },
        set(value) {
          this.textContent = value;
        },
        configurable: true,
      });
    }
  });

  afterEach(() => {
    if (!originalInnerTextDescriptor) {
      delete (HTMLElement.prototype as { innerText?: string }).innerText;
    } else {
      Object.defineProperty(HTMLElement.prototype, "innerText", originalInnerTextDescriptor);
    }
    document.queryCommandState = originalQueryCommandState;
    document.queryCommandValue = originalQueryCommandValue;
    document.execCommand = originalExecCommand;
    vi.restoreAllMocks();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <main>
        <RichTextEditor id="rte-1" label="Description" aria-label="Rich Text Editor" />
      </main>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });

  it("renders correctly with default props", () => {
    render(<RichTextEditor id="rte-2" placeholder="Write here..." />);

    const editor = document.getElementById("rte-2");
    expect(editor).toBeInTheDocument();
    expect(editor).toHaveAttribute("contenteditable", "true");
    expect(editor).toHaveAttribute("data-placeholder", "Write here...");
  });

  it("handles defaultValue correctly", () => {
    render(<RichTextEditor id="rte-3" defaultValue="<p>Initial content</p>" />);

    const editor = document.getElementById("rte-3");
    expect(editor).toHaveTextContent("Initial content");
  });

  it("handles controlled value correctly", () => {
    const { rerender } = render(<RichTextEditor id="rte-4" value="<p>Step 1</p>" />);

    const editor = document.getElementById("rte-4");
    expect(editor).toHaveTextContent("Step 1");

    rerender(<RichTextEditor id="rte-4" value="<p>Step 2</p>" />);
    expect(editor).toHaveTextContent("Step 2");
  });

  it("renders disabled state properly", () => {
    render(<RichTextEditor id="rte-5" disabled />);

    const editor = document.getElementById("rte-5");
    expect(editor).toHaveAttribute("contenteditable", "false");
    expect(editor).toHaveAttribute("aria-disabled", "true");

    const boldButton = screen.getByTitle("Bold");
    expect(boldButton).toBeDisabled();
  });

  it("renders errorMessage and error state", () => {
    render(<RichTextEditor id="rte-6" errorMessage="Field is required" />);

    const editor = document.getElementById("rte-6");
    expect(editor).toHaveAttribute("aria-invalid", "true");

    const errorText = screen.getByText("Field is required");
    expect(errorText).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<RichTextEditor id="rte-7" onChange={handleChange} />);

    const editor = document.getElementById("rte-7");
    expect(editor).toBeInTheDocument();

    // Simulate user focusing and typing
    await user.click(editor!);
    await user.keyboard("Hello");

    // Check if the change handler was called
    expect(handleChange).toHaveBeenCalled();
  });

  it("executes formatting commands when toolbar buttons are clicked", () => {
    const { getByTitle } = render(<RichTextEditor id="rte-8" />);

    const boldButton = getByTitle("Bold");
    fireEvent.click(boldButton);
    expect(document.execCommand).toHaveBeenCalledWith("bold", false, undefined);

    vi.mocked(document.execCommand).mockClear();

    const h1Button = getByTitle("Heading 1");
    fireEvent.click(h1Button);
    expect(document.execCommand).toHaveBeenCalledWith("formatBlock", false, "H1");

    vi.mocked(document.execCommand).mockClear();

    const alignCenterButton = getByTitle("Align Center");
    fireEvent.click(alignCenterButton);
    expect(document.execCommand).toHaveBeenCalledWith("justifyCenter", false, undefined);
  });

  it("handles document.queryCommandState throwing an error gracefully and falls back to false", async () => {
    // Mock to throw an error for queryCommandState
    document.queryCommandState = vi.fn().mockImplementation(() => {
      throw new Error("Not supported in this environment");
    });

    render(<RichTextEditor id="test-rte" label="Content" />);

    const editorDiv = document.getElementById("test-rte");
    expect(editorDiv).not.toBeNull();

    // Trigger an event that calls updateActiveFormats
    fireEvent.keyUp(editorDiv!);

    expect(document.queryCommandState).toHaveBeenCalled();

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

    render(<RichTextEditor id="test-rte-val" label="Content" />);

    const editorDiv = document.getElementById("test-rte-val");
    fireEvent.keyUp(editorDiv!);

    expect(document.queryCommandValue).toHaveBeenCalled();

    const h1Button = screen.getByTitle("Heading 1");
    expect(h1Button.className).not.toContain("bg-[#e6f5f6]");
  });
});
