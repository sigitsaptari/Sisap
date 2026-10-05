import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { "aria-label": "Example input", placeholder: "Type something…" },
  argTypes: { size: { control: "radio", options: ["sm", "md", "lg"] } },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true, defaultValue: "not-an-email" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Read only" } };
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid max-w-sm gap-1.5">
      <label htmlFor="email" className="text-sm font-medium text-fg-default">Email</label>
      <Input {...args} id="email" type="email" placeholder="you@sisap.id" aria-label={undefined} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="grid max-w-sm gap-3">
      <Input size="sm" aria-label="Small" placeholder="Small" />
      <Input size="md" aria-label="Medium" placeholder="Medium" />
      <Input size="lg" aria-label="Large" placeholder="Large" />
      <Input invalid aria-label="Invalid" placeholder="Invalid" />
      <Input disabled aria-label="Disabled" placeholder="Disabled" />
    </div>
  ),
};
