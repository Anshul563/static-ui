"use client"
import { Separator } from "@static-ui/ui"
export default function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-2 w-80">
      <p className="text-sm text-foreground">Content above</p>
      <Separator />
      <p className="text-sm text-foreground">Content below</p>
    </div>
  )
}
