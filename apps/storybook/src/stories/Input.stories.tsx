import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "@static-ui/ui"

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
  },
  args: {
    placeholder: "Enter text...",
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithValue: Story = { args: { defaultValue: "Hello world" } }
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled input" } }
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: "Read only" } }
export const Password: Story = { args: { type: "password", defaultValue: "secret" } }
export const Email: Story = { args: { type: "email", placeholder: "name@example.com" } }
