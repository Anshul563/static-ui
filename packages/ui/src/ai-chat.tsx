"use client"

import * as React from "react"
import { cn } from "./lib/utils"
import { AiMessage } from "./ai-message"
import { AiPrompt } from "./ai-prompt"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp?: string
}

export interface AiChatProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ChatMessage[]
  onSend?: (message: string) => void
  loading?: boolean
  promptPlaceholder?: string
}

const AiChat = React.forwardRef<HTMLDivElement, AiChatProps>(
  ({ className, messages, onSend, loading, promptPlaceholder, ...props }, ref) => {
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (listRef.current) {
        listRef.current.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        })
      }
    }, [messages])

    return (
      <div
        ref={ref}
        className={cn("flex flex-1 flex-col min-h-0", className)}
        {...props}
      >
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-4 py-4"
          role="list"
          aria-label="Chat messages"
          aria-live="polite"
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-4">
            {messages.length === 0 && (
              <div className="flex flex-1 items-center justify-center py-12">
                <p className="text-sm text-muted-foreground text-center">
                  Start a conversation by sending a message below.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <AiMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}
            {loading && (
              <div className="flex items-center gap-2 px-1" role="status" aria-label="AI is typing">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  AI
                </div>
                <div className="flex gap-1">
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "0ms" }} />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "150ms" }} />
                  <span className="size-2 animate-bounce rounded-full bg-muted-foreground/40" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="sr-only">AI is generating a response...</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-border p-4">
          <div className="mx-auto max-w-2xl">
            <AiPrompt
              onSubmit={(value) => onSend?.(value)}
              disabled={loading}
              placeholder={promptPlaceholder}
            />
          </div>
        </div>
      </div>
    )
  }
)
AiChat.displayName = "AiChat"

export { AiChat }
