import { axe } from "vitest-axe";

/** Runs axe on a container and returns human-readable violation summaries. */
export async function axeViolations(container: Element): Promise<string[]> {
  const results = await axe(container);
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}
