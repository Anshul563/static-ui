import type { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "@static-ui/ui"
import { Card, CardContent } from "@static-ui/ui"

function SkeletonDemo() {
  return (
    <Card className="w-80">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </CardContent>
    </Card>
  )
}

const meta: Meta<typeof SkeletonDemo> = {
  title: "Components/Skeleton",
  component: SkeletonDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof SkeletonDemo>

export const Default: Story = {}
