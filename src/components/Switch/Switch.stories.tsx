import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "switch_text",
    size: "md",
    showText: true,
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    showText: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Switch id="sw-sm" size="sm" label="Small Switch" />
      <Switch id="sw-md" size="md" label="Medium Switch (Default)" />
      <Switch id="sw-lg" size="lg" label="Large Switch" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Enabled</h4>
        <Switch id="sw-off" label="Off" />
        <Switch id="sw-on" label="On" defaultChecked />
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Disabled</h4>
        <Switch id="sw-off-dis" label="Off Disabled" disabled />
        <Switch id="sw-on-dis" label="On Disabled" defaultChecked disabled />
      </div>
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    showText: false,
  },
};

export const FigmaMatrix: Story = {
  name: "Figma Design Matrix",
  render: () => (
    <div className="flex flex-col gap-8 p-6 bg-white dark:bg-neutral-900 rounded-lg">
      <div className="grid grid-cols-4 gap-8">
        <div className="text-xs font-semibold uppercase text-neutral-400">Off</div>
        <div className="text-xs font-semibold uppercase text-neutral-400">On</div>
        <div className="text-xs font-semibold uppercase text-neutral-400">Off (Disabled)</div>
        <div className="text-xs font-semibold uppercase text-neutral-400">On (Disabled)</div>
      </div>

      {/* Small */}
      <div className="grid grid-cols-4 gap-8 items-center">
        <Switch size="sm" text="switch_text" />
        <Switch size="sm" text="switch_text" defaultChecked />
        <Switch size="sm" text="switch_text" disabled />
        <Switch size="sm" text="switch_text" defaultChecked disabled />
      </div>

      {/* Medium */}
      <div className="grid grid-cols-4 gap-8 items-center">
        <Switch size="md" text="switch_text" />
        <Switch size="md" text="switch_text" defaultChecked />
        <Switch size="md" text="switch_text" disabled />
        <Switch size="md" text="switch_text" defaultChecked disabled />
      </div>

      {/* Large */}
      <div className="grid grid-cols-4 gap-8 items-center">
        <Switch size="lg" text="switch_text" />
        <Switch size="lg" text="switch_text" defaultChecked />
        <Switch size="lg" text="switch_text" disabled />
        <Switch size="lg" text="switch_text" defaultChecked disabled />
      </div>
    </div>
  ),
};

