"use client"
import { ToggleGroup, ToggleGroupItem } from "@static-ui/ui"
import { Bold, Italic, Underline } from "lucide-react"
export default function ToggleGroupDemo() {
  return (
    <ToggleGroup>
      <ToggleGroupItem value="bold" aria-label="Bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
    </ToggleGroup>
  )
}
