"use client"

import * as React from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseProgress.Root>
>(({ className, value = 0, ...props }, ref) => (
  <BaseProgress.Root
    ref={ref}
    value={value}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-muted",
      className
    )}
    {...props}
  >
    <BaseProgress.Track className="h-full w-full bg-muted">
      <BaseProgress.Indicator
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </BaseProgress.Track>
  </BaseProgress.Root>
))
Progress.displayName = "Progress"

export { Progress }