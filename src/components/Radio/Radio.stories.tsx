import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the radio button",
    },
    label: {
      control: "text",
      description: "Label text for the radio",
    },
    labelText: {
      control: "boolean",
      description: "Whether to display the label text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio is disabled",
    },
    checked: {
      control: "boolean",
      description: "Whether the radio is checked/selected",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "md",
    label: "Text Option",
    labelText: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Text Option",
    labelText: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Text Option",
    labelText: true,
  },
};

export const Selected: Story = {
  args: {
    size: "md",
    label: "Text Option",
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    size: "md",
    label: "Text Option",
    disabled: true,
  },
};

export const SelectedDisabled: Story = {
  args: {
    size: "md",
    label: "Text Option",
    selected: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    size: "md",
    label: "Text Option",
    labelText: false,
    "aria-label": "Standalone Radio",
  },
};

export const GroupVertical: Story = {
  render: () => (
    <RadioGroup defaultValue="option1" aria-label="Select an option" orientation="vertical">
      <Radio value="option1" label="Text Option 1" />
      <Radio value="option2" label="Text Option 2" />
      <Radio value="option3" label="Text Option 3" />
      <Radio value="option4" label="Disabled Option" disabled />
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="standard" aria-label="Shipping method" orientation="horizontal">
      <Radio value="standard" label="Standard (3-5 days)" />
      <Radio value="express" label="Express (1-2 days)" />
      <Radio value="overnight" label="Overnight" />
    </RadioGroup>
  ),
};

export const FigmaMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-3">
          <div className="text-content-muted text-xs font-semibold uppercase">Size: {size}</div>
          <div className="flex flex-wrap items-center gap-6">
            <Radio size={size} name={`matrix-${size}`} label="Unselected" defaultChecked={false} />
            <Radio size={size} name={`matrix-${size}`} label="Selected" defaultChecked={true} />
            <Radio size={size} name={`matrix-disabled-${size}`} label="Disabled" disabled />
            <Radio
              size={size}
              name={`matrix-disabled-sel-${size}`}
              label="Disabled Selected"
              disabled
              selected
            />
            <Radio size={size} labelText={false} aria-label="No label" selected />
          </div>
        </div>
      ))}
    </div>
  ),
};
