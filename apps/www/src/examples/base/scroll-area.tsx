"use client"
import { ScrollArea } from "@static-ui/ui"
export default function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-48 w-72 rounded-md border border-border">
      <div className="p-4 text-sm text-foreground">
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="pb-2">Line {i + 1} of scrollable content.</p>
        ))}
      </div>
    </ScrollArea>
  )
}
