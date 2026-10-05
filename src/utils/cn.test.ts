import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn utility", () => {
  it("merges multiple class strings", () => {
    expect(cn("px-2", "py-1", "bg-white")).toBe("px-2 py-1 bg-white");
  });

  it("handles conditional class objects and falsy values", () => {
    const isHidden = false;
    expect(
      cn("base", isHidden && "hidden", null, undefined, { active: true, disabled: false }),
    ).toBe("base active");
  });

  it("resolves conflicting Tailwind utility classes properly (last wins)", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});
