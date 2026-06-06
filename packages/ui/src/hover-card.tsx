"use client"

import * as React from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

const HoverCard = ({
  children,
  openDelay = 200,
  closeDelay = 200,
  ...props
}: React.ComponentPropsWithoutRef<typeof BasePopover.Root> & {
  openDelay?: number
  closeDelay?: number
}) => {
  const [open, setOpen] = React.useState(false)
  const openTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpen = React.useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    openTimeout.current = setTimeout(() => setOpen(true), openDelay)
  }, [openDelay])

  const handleClose = React.useCallback(() => {
    if (openTimeout.current) clearTimeout(openTimeout.current)
    closeTimeout.current = setTimeout(() => setOpen(false), closeDelay)
  }, [closeDelay])

  React.useEffect(() => {
    return () => {
      if (openTimeout.current) clearTimeout(openTimeout.current)
      if (closeTimeout.current) clearTimeout(closeTimeout.current)
    }
  }, [])

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen} {...props}>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          } as React.HTMLAttributes<HTMLElement>)
        : children}
    </BasePopover.Root>
  )
}

const HoverCardTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof BasePopover.Trigger>
>(({ className, ...props }, ref) => (
  <BasePopover.Trigger
    ref={ref}
    className={cn("inline-block cursor-pointer", className)}
    {...props}
  />
))
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardPortal = BasePopover.Portal

interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof BasePopover.Popup> {
  sideOffset?: number
  align?: "start" | "center" | "end"
}

const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardContentProps
>(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <BasePopover.Positioner sideOffset={sideOffset} align={align}>
    <BasePopover.Popup
      ref={ref}
      className={cn(
        // Stylized to mirror our clean standalone Card architecture
        "z-50 w-64 rounded-xl border border-border bg-background p-4 text-foreground shadow-md outline-hidden transition-all duration-150 ease-out pointer-events-auto",
        "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
        "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  </BasePopover.Positioner>
))
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardPortal, HoverCardContent }