"use client"
import { Checkbox } from "@static-ui/ui"
export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm text-foreground">Accept terms and conditions</label>
    </div>
  )
}
