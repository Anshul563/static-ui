import type { Meta, StoryObj } from "@storybook/react"
import { Button, Dialog, DialogTrigger, DialogPortal, DialogBackdrop, DialogPopup, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from "@static-ui/ui"

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogPortal>
        <DialogBackdrop />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <DialogClose render={<Button variant="destructive">Delete</Button>} />
          </DialogFooter>
        </DialogPopup>
      </DialogPortal>
    </Dialog>
  )
}

const meta: Meta<typeof DialogDemo> = {
  title: "Components/Dialog",
  component: DialogDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof DialogDemo>

export const Default: Story = {}
