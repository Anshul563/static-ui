"use client"

import * as React from "react"
import { cn } from "./lib/utils"

export interface AiMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

const AiMessage = React.forwardRef<HTMLDivElement, AiMessageProps>(
  ({ className, role, content, timestamp, ...props }, ref) => {
    const isUser = role === "user"

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full gap-3",
          isUser ? "justify-end" : "justify-start",
          className
        )}
        role="listitem"
        {...props}
      >
        {!isUser && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            AI
          </div>
        )}
        <div className={cn("flex max-w-[80%] flex-col gap-1", isUser && "items-end")}>
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
              isUser
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "bg-muted text-foreground rounded-bl-md"
            )}
          >
            {content}
          </div>
          {timestamp && (
            <span className="text-[10px] text-muted-foreground px-1">
              {timestamp}
            </span>
          )}
        </div>
        {isUser && (
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-semibold">
            U
          </div>
        )}
      </div>
    )
  }
)
AiMessage.displayName = "AiMessage"

export { AiMessage }
