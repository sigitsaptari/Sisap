export type ClassValue = string | number | boolean | null | undefined;

/** Minimal class-name joiner (keeps the library dependency-free). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
