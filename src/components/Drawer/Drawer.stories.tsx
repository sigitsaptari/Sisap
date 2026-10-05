import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./Drawer";
import type { DrawerSide } from "./Drawer.types";

const meta: Meta<typeof DrawerContent> = {
  title: "Components/Drawer",
  component: DrawerContent,
  tags: ["autodocs"],
  argTypes: { side: { control: "radio", options: ["right", "left", "top", "bottom"] } },
};

export default meta;
type Story = StoryObj<typeof DrawerContent>;

const Example = ({ side, label }: { side?: DrawerSide; label: string }) => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline">{label}</Button>
    </DrawerTrigger>
    <DrawerContent side={side}>
      <DrawerHeader>
        <DrawerTitle>Filters</DrawerTitle>
        <DrawerDescription>Refine the list. Focus is trapped and ESC closes the drawer.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button>Apply</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
);

export const Right: Story = { render: (args) => <Example side={args.side} label="Open drawer" /> };
export const Left: Story = { render: () => <Example side="left" label="Open left drawer" /> };
export const Top: Story = { render: () => <Example side="top" label="Open top drawer" /> };
export const Bottom: Story = { render: () => <Example side="bottom" label="Open bottom drawer" /> };

export const AllSides: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["right", "left", "top", "bottom"] as const).map((side) => (
        <Example key={side} side={side} label={`Open ${side}`} />
      ))}
    </div>
  ),
};
