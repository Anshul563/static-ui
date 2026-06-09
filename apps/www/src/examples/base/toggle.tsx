"use client"
import { Toggle } from "@static-ui/ui"
export default function ToggleDemo() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Bold" className="px-3 font-bold">B</Toggle>
      <Toggle aria-label="Italic" className="px-3 italic">I</Toggle>
      <Toggle aria-label="Underline" className="px-3 underline">U</Toggle>
    </div>
  )
}
