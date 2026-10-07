import { render } from "@testing-library/react";
import { Add } from "iconsax-react";
import { describe, expect, it } from "vitest";
import { renderIcon } from "./icon";

describe("renderIcon utility", () => {
  it("returns null or undefined as-is", () => {
    expect(renderIcon(null)).toBeNull();
    expect(renderIcon(undefined)).toBeUndefined();
  });

  it("returns non-element children as-is", () => {
    expect(renderIcon("text")).toBe("text");
    expect(renderIcon(123)).toBe(123);
  });

  it("injects color='currentColor' and fallback size when props are absent", () => {
    const iconElement = renderIcon(<Add />, 18);
    const { container } = render(<div>{iconElement}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("width")).toBe("18");
    expect(svg?.getAttribute("height")).toBe("18");
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke")).toBe("currentColor");
  });

  it("preserves explicit color and size if already specified on element", () => {
    const iconElement = renderIcon(<Add color="#ff0000" size={32} />, 16);
    const { container } = render(<div>{iconElement}</div>);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("width")).toBe("32");
    expect(svg?.getAttribute("height")).toBe("32");
    const path = container.querySelector("path");
    expect(path?.getAttribute("stroke")).toBe("#ff0000");
  });
});
