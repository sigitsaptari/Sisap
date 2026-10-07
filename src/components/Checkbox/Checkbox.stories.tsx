import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox",
    },
    text: {
      control: "text",
      description: "Text label for the checkbox",
    },
    showText: {
      control: "boolean",
      description: "Whether to show the text label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    text: "checkbox_text",
    showText: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    text: "checkbox_text",
    showText: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    text: "checkbox_text",
    showText: true,
  },
};

export const Checked: Story = {
  args: {
    size: "md",
    text: "checkbox_text",
    showText: true,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    text: "checkbox_text",
    showText: true,
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    size: "md",
    text: "checkbox_text",
    showText: true,
    checked: true,
    disabled: true,
  },
};

export const WithoutText: Story = {
  args: {
    size: "md",
    showText: false,
  },
};
