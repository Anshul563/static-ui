"use client"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@static-ui/ui"
export default function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger className="inline-flex items-center justify-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">Hover me</HoverCardTrigger>
      <HoverCardContent>
        <div className="text-sm font-medium text-foreground">@username</div>
        <div className="text-xs text-muted-foreground mt-1">Profile details appear here.</div>
      </HoverCardContent>
    </HoverCard>
  )
}
