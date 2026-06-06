import type { Meta, StoryObj } from "@storybook/react"
import { Popover, PopoverTrigger, PopoverPortal, PopoverContent } from "@static-ui/ui"
import { Button } from "@static-ui/ui"

function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open Popover</Button>} />
      <PopoverPortal>
        <PopoverContent align="center">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">Popover Title</h3>
            <p className="text-sm text-muted-foreground">
              This is the popover content. You can place any content here.
            </p>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

const meta: Meta<typeof PopoverDemo> = {
  title: "Components/Popover",
  component: PopoverDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof PopoverDemo>

export const Default: Story = {}
