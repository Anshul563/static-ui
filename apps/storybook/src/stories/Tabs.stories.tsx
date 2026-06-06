import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@static-ui/ui"

function TabsDemo() {
  return (
    <div className="w-80">
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Account</TabsTrigger>
          <TabsTrigger value="tab2">Password</TabsTrigger>
          <TabsTrigger value="tab3" disabled>Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4">
          <p className="text-sm text-foreground">Manage your account settings and preferences.</p>
        </TabsContent>
        <TabsContent value="tab2" className="p-4">
          <p className="text-sm text-foreground">Change your password here.</p>
        </TabsContent>
        <TabsContent value="tab3" className="p-4">
          <p className="text-sm text-muted-foreground">This tab is disabled.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const meta: Meta<typeof TabsDemo> = {
  title: "Components/Tabs",
  component: TabsDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof TabsDemo>

export const Default: Story = {}
