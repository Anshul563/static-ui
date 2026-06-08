"use client"

import * as React from "react"
import { cn } from "./lib/utils"

export interface AiConversationProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  preview?: string
  timestamp?: string
  active?: boolean
  onClick?: () => void
  onDelete?: () => void
}

const AiConversation = React.forwardRef<HTMLDivElement, AiConversationProps>(
  ({ className, title, preview, timestamp, active, onClick, onDelete, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.()
        }}
        className={cn(
          "group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
          active
            ? "bg-primary/10 text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-medium leading-tight">{title}</span>
          {preview && (
            <span className="truncate text-xs text-muted-foreground">{preview}</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {timestamp && (
            <span className="text-[10px] text-muted-foreground">{timestamp}</span>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="rounded-md p-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Delete conversation: ${title}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  }
)
AiConversation.displayName = "AiConversation"

export { AiConversation }
