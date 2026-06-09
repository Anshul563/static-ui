"use client"
import { Slider } from "@static-ui/ui"
import { useState } from "react"
export default function SliderDemo() {
  const [value, setValue] = useState([50])
  return (
    <div className="w-60 space-y-2">
      <Slider value={value} onValueChange={(v, _details) => setValue(Array.isArray(v) ? [...v] : [v])} max={100} step={1} />
      <p className="text-xs text-muted-foreground">Value: {value[0]}</p>
    </div>
  )
}
