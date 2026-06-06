"use client"

import * as React from "react"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<{
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
} | null>(null)

const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseToggleGroup> & {
    size?: "default" | "sm" | "lg"
    variant?: "default" | "outline"
  }
>(({ className, variant, size, children, ...props }, ref) => (
  <BaseToggleGroup
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </BaseToggleGroup>
))

ToggleGroup.displayName = "ToggleGroup"

const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseToggle> & {
    size?: "default" | "sm" | "lg"
    variant?: "default" | "outline"
  }
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  const itemVariant = variant || context?.variant || "default"
  const itemSize = size || context?.size || "default"

  return (
    <BaseToggle
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-primary data-[pressed]:text-primary-foreground rounded-none first:rounded-l-md last:rounded-r-md border-r last:border-r-0 border-border/60 shadow-2xs",
        itemVariant === "outline" ? "border border-border" : "bg-transparent",
        itemSize === "default" && "h-9 px-3",
        itemSize === "sm" && "h-8 px-2",
        itemSize === "lg" && "h-10 px-3",
        className
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  )
})

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
