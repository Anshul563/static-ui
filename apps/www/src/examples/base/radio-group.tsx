"use client"
import { RadioGroup, RadioGroupItem } from "@static-ui/ui"
export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-one" id="o1" />
        <label htmlFor="o1" className="text-sm text-foreground">Option One</label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-two" id="o2" />
        <label htmlFor="o2" className="text-sm text-foreground">Option Two</label>
      </div>
    </RadioGroup>
  )
}
