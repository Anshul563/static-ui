"use client"

import * as React from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { cn } from "@/lib/utils"

const Drawer = BaseDialog.Root

const DrawerTrigger = BaseDialog.Trigger

const DrawerPortal = BaseDialog.Portal

const DrawerBackdrop = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Backdrop>
>(({ className, ...props }, ref) => (
  <BaseDialog.Backdrop
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300",
      "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
      className
    )}
    {...props}
  />
))
DrawerBackdrop.displayName = "DrawerBackdrop"

const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseDialog.Popup> & { side?: "left" | "right" }
>(({ className, side = "right", ...props }, ref) => (
  <BaseDialog.Popup
    ref={ref}
    className={cn(
      "fixed z-50 bg-background p-6 shadow-xl text-foreground transition-transform duration-300 ease-in-out h-full w-full max-w-sm top-0 bottom-0",
      side === "right" && "right-0 data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full border-l border-border",
      side === "left" && "left-0 data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full border-r border-border",
      className
    )}
    {...props}
  />
))
DrawerContent.displayName = "DrawerContent"

const DrawerClose = BaseDialog.Close

export { Drawer, DrawerTrigger, DrawerPortal, DrawerBackdrop, DrawerContent, DrawerClose }