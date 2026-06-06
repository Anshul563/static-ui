import type { Meta, StoryObj } from "@storybook/react"
import { Avatar, AvatarImage, AvatarFallback } from "@static-ui/ui"

function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?u=1" alt="@user" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?u=2" alt="@user" />
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
    </div>
  )
}

const meta: Meta<typeof AvatarDemo> = {
  title: "Components/Avatar",
  component: AvatarDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AvatarDemo>

export const Default: Story = {}
