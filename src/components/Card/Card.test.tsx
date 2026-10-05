import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "../../test/a11y";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

describe("Card a11y", () => {
  it("has no axe violations and exposes a heading", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Billing details</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(await axeViolations(container)).toEqual([]);
    expect(screen.getByRole("heading", { name: "Plan" })).toBeTruthy();
  });
});
