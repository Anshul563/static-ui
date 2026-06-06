"use client"

import * as React from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import { cn } from "@/lib/utils"

const Select = BaseSelect.Root

const SelectGroup = BaseSelect.Group

const SelectValue = BaseSelect.Value

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-2xs transition-all cursor-pointer select-none",
      "focus:outline-hidden focus:border-ring focus:ring-1 focus:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
      "group text-left",
      className
    )}
    {...props}
  >
    {children}
    <BaseSelect.Icon className="h-4 w-4 opacity-50 transition-transform duration-200 group-data-popup-open:rotate-180">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectPortal = BaseSelect.Portal

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> & { sideOffset?: number }
>(({ className, sideOffset = 4, ...props }, ref) => (
  <BaseSelect.Positioner sideOffset={sideOffset}>
    <BaseSelect.Popup
      ref={ref}
      className={cn(
        "z-50 min-w-32 overflow-hidden rounded-lg border border-border bg-background p-1 text-foreground shadow-md outline-hidden transition-all duration-100 ease-out",
        "data-starting-style:scale-95 data-starting-style:opacity-0",
        "data-ending-style:scale-95 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  </BaseSelect.Positioner>
))
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Item>
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-foreground outline-hidden group",
      "data-highlighted:bg-muted data-highlighted:text-foreground",
      "data-disabled:pointer-events-none data-disabled:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center opacity-0 group-data-selected:opacity-100 transition-opacity duration-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-3 w-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </span>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
))
SelectItem.displayName = "SelectItem"

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseSelect.Label>
>(({ className, ...props }, ref) => (
  <BaseSelect.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectPortal,
  SelectContent,
  SelectItem,
  SelectLabel,
}