import type { Meta, StoryObj } from "@storybook/react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@static-ui/ui"

function AccordionDemo() {
  return (
    <div className="w-80">
      <Accordion defaultOpen={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Static UI?</AccordionTrigger>
          <AccordionContent>
            Static UI is a collection of unstyled, accessible React components built on Base UI and Tailwind CSS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I install it?</AccordionTrigger>
          <AccordionContent>
            You can install it via pnpm, npm, or yarn. Check the documentation for detailed instructions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it free?</AccordionTrigger>
          <AccordionContent>
            Yes, Static UI is free and open source under the MIT license.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

const meta: Meta<typeof AccordionDemo> = {
  title: "Components/Accordion",
  component: AccordionDemo,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AccordionDemo>

export const Default: Story = {}
