import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("initializes with false by default", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it("initializes with true if initial value is true", () => {
    const { result } = renderHook(() => useDisclosure(true));
    expect(result.current.isOpen).toBe(true);
  });

  it("sets isOpen to true when open is called", () => {
    const { result } = renderHook(() => useDisclosure());
    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("sets isOpen to false when close is called", () => {
    const { result } = renderHook(() => useDisclosure(true));
    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("toggles isOpen state when toggle is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("sets isOpen to specific boolean when setOpen is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.setOpen(true);
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });
    expect(result.current.isOpen).toBe(false);
  });
});
