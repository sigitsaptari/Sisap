import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import type { TypographyVariant } from "./Typography.types";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  args: { children: "The quick brown fox jumps over the lazy dog" },
  argTypes: {
    variant: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "body", "small", "muted", "code"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Body: Story = { args: { variant: "body" } };
export const Heading: Story = { args: { variant: "h1" } };
export const Muted: Story = { args: { variant: "muted" } };
export const Code: Story = { args: { variant: "code", children: "npm run tokens:build" } };
export const VisualVsSemantic: Story = {
  args: { variant: "h1", as: "h2", children: "Looks like h1, is an h2" },
};

const variants: TypographyVariant[] = ["h1", "h2", "h3", "h4", "body", "small", "muted", "code"];

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      {variants.map((variant) => (
        <Typography key={variant} variant={variant} as={variant.startsWith("h") ? "p" : undefined}>
          {variant} — The quick brown fox
        </Typography>
      ))}
    </div>
  ),
};
