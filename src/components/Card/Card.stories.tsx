import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardHeader>
        <CardTitle>Team plan</CardTitle>
        <CardDescription>Everything your team needs to ship faster.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-default">Unlimited projects and shared workspaces.</p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args} className="max-w-sm">
      <CardContent className="pt-6">Simple card with just content.</CardContent>
    </Card>
  ),
};

export const AllParts: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Header only</CardTitle>
          <CardDescription>Title and description.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="pt-6">Content only</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  ),
};
