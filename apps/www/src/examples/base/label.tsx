"use client"
import { Label } from "@static-ui/ui"
import { Input } from "@static-ui/ui"
export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-2 w-80">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  )
}
