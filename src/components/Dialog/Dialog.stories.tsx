import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof DialogContent> = {
  title: "Components/Dialog",
  component: DialogContent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DialogContent>;

export const Default: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Open dialog</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogTitle>Confirm changes</DialogTitle>
        <DialogDescription>
          This dialog is built on Radix UI, so focus trapping, ESC handling and ARIA roles work out
          of the box. Add your body content here.
        </DialogDescription>
        <div className="mt-2 flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="primary">Save changes</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  ),
  args: { showCloseButton: true },
};
