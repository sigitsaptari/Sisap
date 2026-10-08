import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { FormFieldWrapper } from "./FormFieldWrapper";

describe("FormFieldWrapper", () => {
  it("renders children correctly", () => {
    render(
      <FormFieldWrapper>
        <div data-testid="child-element">Child Content</div>
      </FormFieldWrapper>,
    );
    expect(screen.getByTestId("child-element")).toBeTruthy();
    expect(screen.getByText("Child Content")).toBeTruthy();
  });

  it("renders label when provided and showLabel is true", () => {
    const { rerender } = render(
      <FormFieldWrapper id="test-input" label="Test Label">
        <input id="test-input" />
      </FormFieldWrapper>,
    );
    const label = screen.getByText("Test Label");
    expect(label).toBeTruthy();
    expect(label.tagName).toBe("LABEL");
    expect(label.getAttribute("for")).toBe("test-input");

    // Re-render with showLabel=false
    rerender(
      <FormFieldWrapper id="test-input" label="Test Label" showLabel={false}>
        <input id="test-input" />
      </FormFieldWrapper>,
    );
    expect(screen.queryByText("Test Label")).toBeNull();
  });

  it("renders 'Wajib' badge when isWajib is true", () => {
    render(
      <FormFieldWrapper label="Test Label" isWajib>
        <input />
      </FormFieldWrapper>,
    );
    expect(screen.getByText("Wajib")).toBeTruthy();
  });

  it("renders 'Opsional' badge when isOpsional is true", () => {
    render(
      <FormFieldWrapper label="Test Label" isOpsional>
        <input />
      </FormFieldWrapper>,
    );
    expect(screen.getByText("Opsional")).toBeTruthy();
  });

  it("renders description when provided and showDescription is true", () => {
    const { rerender } = render(
      <FormFieldWrapper label="Test" description="This is a description">
        <input />
      </FormFieldWrapper>,
    );
    expect(screen.getByText("This is a description")).toBeTruthy();

    rerender(
      <FormFieldWrapper label="Test" description="This is a description" showDescription={false}>
        <input />
      </FormFieldWrapper>,
    );
    expect(screen.queryByText("This is a description")).toBeNull();
  });

  it("renders info tooltip when hasInfoTooltip is true", () => {
    render(
      <FormFieldWrapper label="Test" hasInfoTooltip infoTooltip="Helpful info">
        <input />
      </FormFieldWrapper>,
    );

    // The tooltip icon has aria-label="Informasi tambahan"
    const tooltipIcon = screen.getByLabelText("Informasi tambahan");
    expect(tooltipIcon).toBeTruthy();
    // title should be "Helpful info"
    expect(
      tooltipIcon.parentElement?.getAttribute("title") || tooltipIcon.getAttribute("title"),
    ).toBe("Helpful info");
  });

  it("renders errorMessage with Danger icon", () => {
    const { container } = render(
      <FormFieldWrapper errorMessage="Something went wrong" errorId="error-1">
        <input aria-errormessage="error-1" />
      </FormFieldWrapper>,
    );
    expect(screen.getByText("Something went wrong")).toBeTruthy();
    // Danger icon is rendered
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    // Check if error message is rendered within the correct id
    const statusRow = document.getElementById("error-1");
    expect(statusRow).toBeTruthy();
    expect(statusRow?.textContent).toContain("Something went wrong");
  });

  it("renders successMessage with TickCircle icon", () => {
    const { container } = render(
      <FormFieldWrapper successMessage="All good!" successId="success-1">
        <input />
      </FormFieldWrapper>,
    );
    expect(screen.getByText("All good!")).toBeTruthy();
    // TickCircle icon is rendered
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();

    const statusRow = document.getElementById("success-1");
    expect(statusRow).toBeTruthy();
    expect(statusRow?.textContent).toContain("All good!");
  });

  it("renders hint when showHint is true", () => {
    const { rerender } = render(
      <FormFieldWrapper hint="A helpful hint" showHint hintId="hint-1">
        <input aria-describedby="hint-1" />
      </FormFieldWrapper>,
    );

    const hintElement = screen.getByText("A helpful hint");
    expect(hintElement).toBeTruthy();
    expect(hintElement.id).toBe("hint-1");

    rerender(
      <FormFieldWrapper hint="A helpful hint" showHint={false} hintId="hint-1">
        <input aria-describedby="hint-1" />
      </FormFieldWrapper>,
    );
    expect(screen.queryByText("A helpful hint")).toBeNull();
  });

  it("renders character counter correctly", () => {
    const { rerender } = render(
      <FormFieldWrapper showCounter counterText="10/100">
        <input />
      </FormFieldWrapper>,
    );

    const counter = screen.getByText("10/100");
    expect(counter).toBeTruthy();
    expect(counter.className).not.toContain("text-[#ee3124]");

    rerender(
      <FormFieldWrapper showCounter counterText="101/100" isErrorCounter>
        <input />
      </FormFieldWrapper>,
    );

    const errorCounter = screen.getByText("101/100");
    expect(errorCounter).toBeTruthy();
    expect(errorCounter.className).toContain("text-[#ee3124]");
  });

  it("applies containerClassName", () => {
    const { container } = render(
      <FormFieldWrapper containerClassName="custom-container-class">
        <input />
      </FormFieldWrapper>,
    );
    expect(container.firstChild?.nodeType).toBe(Node.ELEMENT_NODE);
    if (container.firstChild && "className" in container.firstChild) {
      expect((container.firstChild as HTMLElement).className).toContain("custom-container-class");
    }
  });

  it("has no axe violations (basic configuration)", async () => {
    const { container } = render(
      <FormFieldWrapper
        id="test-input"
        label="Test Label"
        description="A description"
        hint="A hint"
        showHint
      >
        <input id="test-input" />
      </FormFieldWrapper>,
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});
