import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge.types";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    variant: { control: "radio", options: ["neutral", "brand", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { variant: "neutral" } };
export const Brand: Story = { args: { variant: "brand", children: "New" } };
export const Success: Story = { args: { variant: "success", children: "Paid" } };
export const Warning: Story = { args: { variant: "warning", children: "Pending" } };
export const Danger: Story = { args: { variant: "danger", children: "Failed" } };

const variants: BadgeVariant[] = ["neutral", "brand", "success", "warning", "danger"];

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>{variant}</Badge>
      ))}
    </div>
  ),
};
