"use client"

import * as React from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSlider.Root>
>(({ className, ...props }, ref) => (
  <BaseSlider.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center group py-4", className)}
    {...props}
  >
    <BaseSlider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-muted">
      <BaseSlider.Indicator className="absolute h-full bg-primary" />
    </BaseSlider.Track>
    <BaseSlider.Thumb 
      className={cn(
        "block h-5 w-5 rounded-full border border-border bg-background shadow-sm transition-colors",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing"
      )} 
    />
  </BaseSlider.Root>
))
Slider.displayName = "Slider"

export { Slider }