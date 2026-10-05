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

const states: Array<"default" | "hover" | "pressed" | "focus" | "disabled"> = [
  "default",
  "hover",
  "pressed",
  "focus",
  "disabled",
];

const types: Array<{ label: string; variant: "solid" | "outline" | "destructive" }> = [
  { label: "Solid (Primary)", variant: "solid" },
  { label: "Outline (Secondary)", variant: "outline" },
  { label: "Destructive", variant: "destructive" },
];

const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

export const FigmaPaDiMatrix: Story = {
  name: "Figma PaDi DS v3.0 Matrix (All States)",
  render: () => (
    <div className="border-border-subtle bg-surface-base space-y-10 rounded-xl border p-6">
      <div>
        <h3 className="text-content-primary mb-1 text-base font-bold">
          Figma Node 88746:15695 — PaDi DS v3.0 Complete State Matrix
        </h3>
        <p className="text-content-muted text-xs">
          Menampilkan seluruh varian (Solid, Outline, Destructive) pada 3 ukuran (sm 36px, md 44px,
          lg 52px) di setiap state: Default, Hover, Pressed, Focus, Disabled.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px] space-y-8">
          {types.map(({ label, variant }) => (
            <div key={variant} className="border-border-subtle space-y-3 rounded-lg border p-4">
              <div className="border-border-subtle border-b pb-2">
                <span className="text-content-primary text-xs font-semibold tracking-wider uppercase">
                  {label}
                </span>
              </div>

              {/* State Header Columns */}
              <div className="text-content-muted grid grid-cols-6 gap-3 pb-2 text-xs font-medium">
                <div className="w-16">Size</div>
                <div>Default</div>
                <div>Hover</div>
                <div>Pressed</div>
                <div>Focus</div>
                <div>Disabled</div>
              </div>

              {/* Rows by Size */}
              <div className="space-y-3">
                {sizes.map((size) => (
                  <div key={size} className="grid grid-cols-6 items-center gap-3">
                    <div className="text-content-muted text-xs font-semibold uppercase">{size}</div>
                    {states.map((st) => (
                      <div key={st} className="flex items-center">
                        <Button
                          variant={variant}
                          size={size}
                          state={st}
                          disabled={st === "disabled"}
                        >
                          Button
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
