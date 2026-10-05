import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import type { ButtonVariant } from "./Button.types";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["primary", "secondary", "outline", "ghost", "danger"] },
    size: { control: "radio", options: ["sm", "md", "lg", "icon"] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Get started" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Learn more" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Delete" },
};

export const Loading: Story = {
  args: { variant: "primary", isLoading: true, loadingText: "Saving…", children: "Save" },
};

export const Disabled: Story = {
  args: { variant: "primary", disabled: true, children: "Disabled" },
};

export const WithIcons: Story = {
  args: {
    variant: "primary",
    leftIcon: <Plus />,
    rightIcon: <ArrowRight />,
    children: "Add item",
  },
};

const variants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "danger"];

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      {variants.map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          <span className="w-20 text-xs tracking-wide uppercase opacity-60">{variant}</span>
          <Button variant={variant} size="sm">
            Small
          </Button>
          <Button variant={variant} size="md">
            Medium
          </Button>
          <Button variant={variant} size="lg">
            Large
          </Button>
          <Button variant={variant} size="icon" aria-label="Delete">
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  ),
};
