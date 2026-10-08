import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { axeViolations } from "../../test/a11y";
import { RichTextEditor } from "./RichTextEditor";

describe("RichTextEditor", () => {
  let originalInnerTextDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (HTMLElement.prototype as any).innerText;
    } else {
      Object.defineProperty(HTMLElement.prototype, "innerText", originalInnerTextDescriptor);
    }
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

    // The contenteditable div does not inherently have a textbox role in all environments unless explicitly set,
    // so we can query it by id or role depending on rendering.
    // Since it lacks role="textbox" directly, let's query by id.
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
});
