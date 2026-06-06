import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip, TooltipTrigger, TooltipPortal, TooltipContent, TooltipProvider } from "@static-ui/ui"
import { Button } from "@static-ui/ui"

function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
        <TooltipPortal>
          <TooltipContent>This is a tooltip</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}

const meta: Meta<typeof TooltipDemo> = {
  title: "Components/Tooltip",
  component: TooltipDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof TooltipDemo>

export const Default: Story = {}
