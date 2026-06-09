"use client"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@static-ui/ui"
export default function AccordionDemo() {
  return (
    <Accordion className="w-80" >
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to WAI-ARIA design patterns.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with sensible dark mode defaults.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. Animations are built with Tailwind CSS.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
