/** Spacing scale shared by layout primitives (matches tokens/base/spacing). */
export type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

/** Static class map so Tailwind can detect every `gap-*` utility. */
export const gapClasses: Record<SpacingScale, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};
