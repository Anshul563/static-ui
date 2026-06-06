import type { Meta, StoryObj } from "@storybook/react"
import { Select, SelectTrigger, SelectValue, SelectPortal, SelectContent, SelectItem, SelectGroup, SelectLabel } from "@static-ui/ui"

function SelectDemo() {
  return (
    <div className="w-60">
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
              <SelectItem value="mango" disabled>Mango (sold out)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  )
}

const meta: Meta<typeof SelectDemo> = {
  title: "Components/Select",
  component: SelectDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SelectDemo>

export const Default: Story = {}
