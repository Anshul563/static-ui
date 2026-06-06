import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertTitle, AlertDescription } from "@static-ui/ui"

function AlertDemo() {
  return (
    <div className="w-80 space-y-4">
      <Alert variant="default">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  )
}

const meta: Meta<typeof AlertDemo> = {
  title: "Components/Alert",
  component: AlertDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AlertDemo>

export const Default: Story = {}
