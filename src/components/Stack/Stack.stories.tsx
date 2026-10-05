import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const Box = ({ children }: { children: string }) => (
  <div className="bg-action-secondary text-fg-default rounded-md px-4 py-2 text-sm">{children}</div>
);

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around"] },
  },
  render: (args) => (
    <Stack {...args}>
      <Box>One</Box>
      <Box>Two</Box>
      <Box>Three</Box>
    </Stack>
  ),
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Column: Story = { args: { direction: "column", gap: 3 } };
export const Row: Story = { args: { direction: "row", gap: 3 } };
export const SpaceBetween: Story = {
  args: { direction: "row", justify: "between", align: "center" },
};
export const Wrapping: Story = {
  args: { direction: "row", wrap: true, gap: 2, className: "max-w-48" },
};
export const AsList: Story = {
  render: () => (
    <Stack asChild gap={2}>
      <ul>
        <li>Semantic list</li>
        <li>rendered through asChild</li>
      </ul>
    </Stack>
  ),
};
