import type { Meta, StoryObj } from "@storybook/react";
import { Grid } from "./Grid";

const cells = Array.from({ length: 6 }, (_, i) => (
  <div
    key={i}
    className="bg-action-secondary text-fg-default rounded-md px-4 py-6 text-center text-sm"
  >
    {i + 1}
  </div>
));

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  argTypes: {
    columns: { control: "select", options: [1, 2, 3, 4, 5, 6, 12] },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
  },
  render: (args) => <Grid {...args}>{cells}</Grid>,
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const TwoColumns: Story = { args: { columns: 2 } };
export const ThreeColumns: Story = { args: { columns: 3, gap: 6 } };
export const SixColumnsTight: Story = { args: { columns: 6, gap: 1 } };
export const AsList: Story = {
  render: () => (
    <Grid asChild columns={3} gap={2}>
      <ul>
        <li>Alpha</li>
        <li>Beta</li>
        <li>Gamma</li>
      </ul>
    </Grid>
  ),
};
