"use client"

import * as React from "react"
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import { cn } from "@/lib/utils"

const Collapsible = BaseCollapsible.Root

const CollapsibleTrigger = BaseCollapsible.Trigger

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof BaseCollapsible.Panel>
>(({ className, ...props }, ref) => (
  <BaseCollapsible.Panel
    ref={ref}
    className={cn(
      "overflow-hidden transition-all animate-collapsible-up data-[open]:animate-collapsible-down",
      className
    )}
    {...props}
  />
))
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }