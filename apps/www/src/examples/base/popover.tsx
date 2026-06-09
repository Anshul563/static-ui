"use client"
import { Popover, PopoverTrigger, PopoverContent } from "@static-ui/ui"
import { Button } from "@static-ui/ui"
export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <p className="text-sm text-foreground">Place content here.</p>
      </PopoverContent>
    </Popover>
  )
}
