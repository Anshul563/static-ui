import type { Meta, StoryObj } from "@storybook/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@static-ui/ui"
import { Button } from "@static-ui/ui"

function CardDemo() {
  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">This is the card content area. Add any content here.</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  )
}

const meta: Meta<typeof CardDemo> = {
  title: "Components/Card",
  component: CardDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof CardDemo>

export const Default: Story = {}
