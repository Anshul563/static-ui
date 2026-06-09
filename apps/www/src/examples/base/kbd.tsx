"use client"
import { Kbd } from "@static-ui/ui"
export default function KbdDemo() {
  return (
    <div className="flex gap-2 items-center">
      <Kbd>⌘</Kbd>
      <span className="text-sm text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </div>
  )
}
