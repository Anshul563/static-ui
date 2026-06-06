import * as React from "react"
import { cn } from "@/lib/utils"

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex items-center w-full shadow-2xs rounded-md border border-border bg-background focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-all",
      "[&>input]:border-0 [&>input]:focus-visible:ring-0 [&>input]:shadow-none",
      className
    )}
    {...props}
  />
))
InputGroup.displayName = "InputGroup"

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "flex items-center px-3 text-sm text-muted-foreground bg-muted border-r border-border h-10 select-none font-medium",
      "first:rounded-l-md last:rounded-r-md last:border-r-0",
      className
    )}
    {...props}
  />
))
InputGroupText.displayName = "InputGroupText"

export { InputGroup, InputGroupText }