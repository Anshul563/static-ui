"use client"

import * as React from "react"
import { NumberField as BaseNumberField } from "@base-ui/react/number-field"
import { cn } from "@/lib/utils"

export interface NumberFieldProps extends React.ComponentPropsWithoutRef<typeof BaseNumberField.Root> {
  label?: string
}

const NumberField = React.forwardRef<HTMLDivElement, NumberFieldProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <BaseNumberField.Root ref={ref} className={cn("flex flex-col gap-1.5 w-full max-w-50", className)} {...props}>
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        
        <div className="relative flex items-center border border-border rounded-md bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
          {/* Decrement Button */}
          <BaseNumberField.Decrement className="flex items-center justify-center h-9 w-9 text-muted-foreground transition-colors hover:bg-muted data-disabled:opacity-30 border-r border-border">
            −
          </BaseNumberField.Decrement>

          {/* Core Input Element */}
          <BaseNumberField.Input className="w-full text-center bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground py-1.5" />

          {/* Increment Button */}
          <BaseNumberField.Increment className="flex items-center justify-center h-9 w-9 text-muted-foreground transition-colors hover:bg-muted data-disabled:opacity-30 border-l border-border">
            +
          </BaseNumberField.Increment>
        </div>
      </BaseNumberField.Root>
    )
  }
)

NumberField.displayName = "NumberField"

export { NumberField }