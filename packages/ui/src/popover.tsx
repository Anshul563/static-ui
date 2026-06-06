"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

const Popover = BasePopover.Root

const PopoverTrigger = BasePopover.Trigger

const PopoverPortal = BasePopover.Portal

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Popup> & { sideOffset?: number; align?: "start" | "center" | "end" }
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <BasePopover.Positioner sideOffset={sideOffset} align={align}>
    <BasePopover.Popup
      ref={ref}
      className={cn(
        "z-50 w-72 rounded-xl border border-border bg-background p-4 text-foreground shadow-md outline-hidden transition-all duration-150 ease-out",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  </BasePopover.Positioner>
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverPortal, PopoverContent }