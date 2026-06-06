"use client"

import * as React from "react"
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseScrollArea.Root>
>(({ className, children, ...props }, ref) => (
  <BaseScrollArea.Root
    ref={ref}
    className={cn("relative overflow-hidden group/scroll", className)}
    {...props}
  >
    <BaseScrollArea.Viewport className="h-full w-full rounded-[inherit] overscroll-contain outline-hidden">
      <BaseScrollArea.Content>{children}</BaseScrollArea.Content>
    </BaseScrollArea.Viewport>
    
    <BaseScrollArea.Scrollbar
      orientation="vertical"
      className="absolute right-0 top-0 bottom-0 z-50 flex w-2.5 touch-none select-none p-px bg-transparent transition-opacity duration-150 opacity-0 group-hover/scroll:opacity-100 data-scrolling:opacity-100 data-hovering:opacity-100"
    >
      <BaseScrollArea.Thumb className="relative flex-1 rounded-full bg-muted-foreground/20 transition-colors hover:bg-muted-foreground/30" />
    </BaseScrollArea.Scrollbar>

    <BaseScrollArea.Scrollbar
      orientation="horizontal"
      className="absolute bottom-0 left-0 right-0 z-50 flex h-2.5 touch-none select-none flex-col p-px bg-transparent transition-opacity duration-150 opacity-0 group-hover/scroll:opacity-100 data-scrolling:opacity-100 data-hovering:opacity-100"
    >
      <BaseScrollArea.Thumb className="relative flex-1 rounded-full bg-muted-foreground/20 transition-colors hover:bg-muted-foreground/30" />
    </BaseScrollArea.Scrollbar>
  </BaseScrollArea.Root>
))
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }