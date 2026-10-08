import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("should initialize with false by default", () => {
    const { result } = renderHook(() => useDisclosure());

    expect(result.current.isOpen).toBe(false);
  });

  it("should initialize with the provided value", () => {
    const { result } = renderHook(() => useDisclosure(true));

    expect(result.current.isOpen).toBe(true);
  });

  it("should open when open() is called", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close when close() is called", () => {
    const { result } = renderHook(() => useDisclosure(true));

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle when toggle() is called", () => {
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

  it("should set the value correctly when setOpen() is called", () => {
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
