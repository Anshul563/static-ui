import type { Meta, StoryObj } from "@storybook/react"
import { Switch } from "@static-ui/ui"

function SwitchDemo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch id="switch-default" defaultChecked />
        <label htmlFor="switch-default" className="text-sm text-foreground">Airplane Mode</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-unchecked" />
        <label htmlFor="switch-unchecked" className="text-sm text-foreground">Wi-Fi</label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-disabled" disabled />
        <label htmlFor="switch-disabled" className="text-sm text-muted-foreground">Bluetooth</label>
      </div>
    </div>
  )
}

const meta: Meta<typeof SwitchDemo> = {
  title: "Components/Switch",
  component: SwitchDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SwitchDemo>

export const Default: Story = {}
