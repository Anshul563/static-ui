"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AiConversation } from "./ai-conversation"

export interface Conversation {
  id: string
  title: string
  preview?: string
  timestamp?: string
}

export interface AiSidebarProps {
  className?: string
  conversations: Conversation[]
  activeId?: string
  onSelect?: (id: string) => void
  onNew?: () => void
  onDelete?: (id: string) => void
}

const AiSidebar = React.forwardRef<HTMLDivElement, AiSidebarProps>(
  ({ className, conversations, activeId, onSelect, onNew, onDelete, ...props }, ref) => {
    const [search, setSearch] = React.useState("")

    const filtered = React.useMemo(
      () =>
        conversations.filter((c) =>
          c.title.toLowerCase().includes(search.toLowerCase())
        ),
      [conversations, search]
    )

    return (
      <div
        ref={ref}
        className={cn("flex h-full flex-col gap-3", className)}
        {...props}
      >
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-semibold text-foreground">Conversations</h2>
          <button
            type="button"
            onClick={onNew}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-foreground transition-colors",
              "hover:bg-muted",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="New conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New
          </button>
        </div>

        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            aria-label="Search conversations"
            className={cn(
              "w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
          />
        </div>

        <div className="flex-1 overflow-y-auto" role="list" aria-label="Conversation list">
          {filtered.length === 0 ? (
            <p className="px-1 text-xs text-muted-foreground py-4 text-center">
              {search ? "No conversations found" : "No conversations yet"}
            </p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {filtered.map((conv) => (
                <AiConversation
                  key={conv.id}
                  title={conv.title}
                  preview={conv.preview}
                  timestamp={conv.timestamp}
                  active={conv.id === activeId}
                  onClick={() => onSelect?.(conv.id)}
                  onDelete={onDelete ? () => onDelete(conv.id) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)
AiSidebar.displayName = "AiSidebar"

export { AiSidebar }
