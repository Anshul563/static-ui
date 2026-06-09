"use client"
import { Switch } from "@static-ui/ui"
import { useState } from "react"
export default function SwitchDemo() {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <Switch checked={enabled} onCheckedChange={setEnabled} />
      <label className="text-sm text-foreground">Airplane Mode</label>
    </div>
  )
}
