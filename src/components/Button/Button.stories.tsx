import type { Meta, StoryObj } from "@storybook/react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";
import { Button } from "./Button";
import type { ButtonVariant } from "./Button.types";

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
  args: { variant: "destructive", children: "Delete" },
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

const variants: ButtonVariant[] = ["primary", "secondary", "outline", "ghost", "destructive"];

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

export const FigmaPaDiMatrix: Story = {
  name: "Figma PaDi DS v3.0 Matrix",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-8 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-sm font-semibold">
          Figma Node 88746:15695 — PaDi DS v3.0 Button Set
        </h3>
        <p className="text-content-muted text-xs">
          Types: Solid (Teal #009ea9), Outline (White/Slate #444b55), Destructive (Red #ee3124)
        </p>
      </div>

      <div className="space-y-6">
        {/* Solid / Primary */}
        <div className="space-y-2">
          <span className="text-content-muted text-xs font-medium tracking-wider uppercase">
            1. Solid (Primary)
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="solid" size="sm">
              Button sm (36px)
            </Button>
            <Button variant="solid" size="md">
              Button md (44px)
            </Button>
            <Button variant="solid" size="lg">
              Button lg (52px)
            </Button>
            <Button variant="solid" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>

        {/* Outline / Secondary */}
        <div className="space-y-2">
          <span className="text-content-muted text-xs font-medium tracking-wider uppercase">
            2. Outline (Secondary)
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm">
              Button sm (36px)
            </Button>
            <Button variant="outline" size="md">
              Button md (44px)
            </Button>
            <Button variant="outline" size="lg">
              Button lg (52px)
            </Button>
            <Button variant="outline" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>

        {/* Destructive */}
        <div className="space-y-2">
          <span className="text-content-muted text-xs font-medium tracking-wider uppercase">
            3. Destructive (Danger)
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="destructive" size="sm">
              Button sm (36px)
            </Button>
            <Button variant="destructive" size="md">
              Button md (44px)
            </Button>
            <Button variant="destructive" size="lg">
              Button lg (52px)
            </Button>
            <Button variant="destructive" size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
};
