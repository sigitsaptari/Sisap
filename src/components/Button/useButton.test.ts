import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useButton } from "./useButton";

describe("useButton", () => {
  it("should return default values when no props are provided", () => {
    const { result } = renderHook(() => useButton({}));
    expect(result.current.disabled).toBe(false);
    expect(result.current["aria-disabled"]).toBeUndefined();
    expect(result.current["aria-busy"]).toBeUndefined();
  });

  it("should handle disabled=true", () => {
    const { result } = renderHook(() => useButton({ disabled: true }));
    expect(result.current.disabled).toBe(true);
    expect(result.current["aria-disabled"]).toBe(true);
    expect(result.current["aria-busy"]).toBeUndefined();
  });

  it("should handle isLoading=true", () => {
    const { result } = renderHook(() => useButton({ isLoading: true }));
    expect(result.current.disabled).toBe(true);
    expect(result.current["aria-disabled"]).toBe(true);
    expect(result.current["aria-busy"]).toBe(true);
  });

  it("should handle both disabled=true and isLoading=true", () => {
    const { result } = renderHook(() => useButton({ disabled: true, isLoading: true }));
    expect(result.current.disabled).toBe(true);
    expect(result.current["aria-disabled"]).toBe(true);
    expect(result.current["aria-busy"]).toBe(true);
  });

  it("should handle both disabled=false and isLoading=false explicitly", () => {
    const { result } = renderHook(() => useButton({ disabled: false, isLoading: false }));
    expect(result.current.disabled).toBe(false);
    expect(result.current["aria-disabled"]).toBeUndefined();
    expect(result.current["aria-busy"]).toBeUndefined();
  });
});
