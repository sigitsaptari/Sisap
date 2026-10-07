import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "../Radio";
import { RadioCard } from "./RadioCard";

const meta = {
  title: "Components/RadioCard",
  component: RadioCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "select",
      options: ["default", "active", "disabled"],
      description: "Figma state shortcut",
    },
    label: { control: "text" },
    description: { control: "text" },
    showDesc: { control: "boolean" },
    radioLeft: { control: "boolean" },
    radioRight: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Label",
    description: "Label",
    radioLeft: true,
    radioRight: true,
    showDesc: true,
  },
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: { state: "active" },
};

export const Disabled: Story = {
  args: { state: "disabled" },
};

export const RadioLeftOnly: Story = {
  args: { radioRight: false },
};

export const RadioRightOnly: Story = {
  args: { radioLeft: false },
};

export const WithoutDescription: Story = {
  args: { showDesc: false },
};

/** Matches Figma node 92512:18197 (default / active / disabled). */
export const FigmaMatrix: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-5">
      <RadioCard {...args} name="figma-matrix-default" state="default" />
      <RadioCard {...args} name="figma-matrix-active" state="active" onChange={() => {}} />
      <RadioCard {...args} name="figma-matrix-disabled" state="disabled" />
    </div>
  ),
};

export const InRadioGroup: Story = {
  render: () => (
    <RadioGroup aria-label="Pilih paket" defaultValue="pro" orientation="horizontal">
      <RadioCard value="basic" label="Basic" description="Rp 50.000 / bulan" radioRight={false} />
      <RadioCard value="pro" label="Pro" description="Rp 150.000 / bulan" radioRight={false} />
      <RadioCard
        value="enterprise"
        label="Enterprise"
        description="Hubungi tim sales"
        radioRight={false}
        disabled
      />
    </RadioGroup>
  ),
};
