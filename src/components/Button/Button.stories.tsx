import type { Meta, StoryObj } from "@storybook/react";
import { Add, ArrowRight, Trash } from "iconsax-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
    },
    size: { control: "radio", options: ["sm", "md", "lg", "icon"] },
    showIconL: { control: "boolean", description: "Toggle left icon visibility" },
    showIconR: { control: "boolean", description: "Toggle right icon visibility" },
    showLabel: { control: "boolean", description: "Toggle label visibility" },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Get started" },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Learn more",
    state: "pressed",
  },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Danger: Story = {
  args: { variant: "destructive", children: "Delete" },
};

export const Loading: Story = {
  args: { variant: "primary", isLoading: true, loadingText: "Saving…", children: "Save" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};

export const WithIcons: Story = {
  render: (args) => (
    <Button
      {...args}
      leftIcon={args.leftIcon ?? <Add />}
      rightIcon={args.rightIcon ?? <ArrowRight />}
    >
      {args.children || "Add item"}
    </Button>
  ),
  args: {
    variant: "primary",
    children: "Add item",
  },
};

export const IconLeft: Story = {
  render: (args) => (
    <Button {...args} leftIcon={<Add />}>
      {args.children || "Tambah Data"}
    </Button>
  ),
  args: {
    variant: "primary",
    children: "Tambah Data",
  },
};

export const IconRight: Story = {
  render: (args) => (
    <Button {...args} rightIcon={<ArrowRight />}>
      {args.children || "Lanjutkan"}
    </Button>
  ),
  args: {
    variant: "primary",
    children: "Lanjutkan",
  },
};

export const IconOnly: Story = {
  render: (args) => (
    <Button {...args} size="icon" aria-label="Hapus">
      <Trash />
    </Button>
  ),
  args: {
    variant: "primary",
    size: "icon",
  },
};
