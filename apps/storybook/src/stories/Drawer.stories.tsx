import type { Meta, StoryObj } from "@storybook/react"
import { Button, Drawer, DrawerTrigger, DrawerPortal, DrawerBackdrop, DrawerContent, DrawerClose } from "@static-ui/ui"

function DrawerDemo() {
  return (
    <div className="flex gap-4">
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Open Right</Button>} />
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerContent side="right">
            <h2 className="text-lg font-semibold mb-4">Drawer Title</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This is a drawer panel that slides in from the right side.
            </p>
            <DrawerClose render={<Button variant="outline">Close</Button>} />
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Open Left</Button>} />
        <DrawerPortal>
          <DrawerBackdrop />
          <DrawerContent side="left">
            <h2 className="text-lg font-semibold mb-4">Drawer Title</h2>
            <p className="text-sm text-muted-foreground mb-6">
              This is a drawer panel that slides in from the left side.
            </p>
            <DrawerClose render={<Button variant="outline">Close</Button>} />
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  )
}

const meta: Meta<typeof DrawerDemo> = {
  title: "Components/Drawer",
  component: DrawerDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof DrawerDemo>

export const Default: Story = {}
