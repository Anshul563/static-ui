"use client"

import * as React from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

const DropdownMenu = BaseMenu.Root

const DropdownMenuTrigger = BaseMenu.Trigger

const DropdownMenuPortal = BaseMenu.Portal

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof BaseMenu.Popup> & {
  sideOffset?: number
}

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <BaseMenu.Positioner sideOffset={sideOffset}>
    <BaseMenu.Popup
      ref={ref}
      className={cn(
        "z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-md outline-hidden transition-all duration-100 ease-out",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  </BaseMenu.Positioner>
))
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative flex select-none items-center rounded-md px-2 py-1.5 text-sm outline-hidden transition-colors cursor-pointer",
      "data-highlighted:bg-muted data-highlighted:text-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
}