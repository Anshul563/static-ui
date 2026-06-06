"use client"

import * as React from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

const ContextMenu = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof BaseMenu.Root>) => {
  return (
    <BaseMenu.Root {...props}>
      {children}
    </BaseMenu.Root>
  )
}

const ContextMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseMenu.Trigger
    ref={ref}
    className={cn("cursor-context-menu", className)}
    {...props}
  >
    {children}
  </BaseMenu.Trigger>
))
ContextMenuTrigger.displayName = "ContextMenuTrigger"

const ContextMenuPortal = BaseMenu.Portal

const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Popup>
>(({ className, ...props }, ref) => (
  <BaseMenu.Positioner side="bottom" align="start">
    <BaseMenu.Popup
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-md outline-hidden transition-all duration-100 ease-out",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  </BaseMenu.Positioner>
))
ContextMenuContent.displayName = "ContextMenuContent"

const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseMenu.Item>
>(({ className, ...props }, ref) => (
  <BaseMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-hidden transition-colors cursor-pointer",
      "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = "ContextMenuItem"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuItem,
}