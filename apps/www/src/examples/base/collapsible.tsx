"use client"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@static-ui/ui"
export default function CollapsibleDemo() {
  return (
    <Collapsible className="w-80">
      <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-foreground cursor-pointer">Toggle content</CollapsibleTrigger>
      <CollapsibleContent>
        <p className="text-sm text-muted-foreground pt-2">This content can be collapsed and expanded.</p>
      </CollapsibleContent>
    </Collapsible>
  )
}
