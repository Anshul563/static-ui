"use client"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@static-ui/ui"
export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center justify-center rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">Hover me</TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
