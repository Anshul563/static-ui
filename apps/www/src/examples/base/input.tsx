"use client"
import { Input } from "@static-ui/ui"
export default function InputDemo() {
  return (
    <div className="flex flex-col gap-2 w-80">
      <Input placeholder="Enter your email..." />
      <Input placeholder="Disabled" disabled />
    </div>
  )
}
