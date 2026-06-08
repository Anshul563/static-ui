"use client"

import * as React from "react"
import { cn } from "./lib/utils"

export interface AiPromptProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onSubmit"> {
  onSubmit?: (value: string) => void
  disabled?: boolean
  maxLength?: number
}

const AiPrompt = React.forwardRef<HTMLTextAreaElement, AiPromptProps>(
  ({ className, onSubmit, disabled, placeholder = "Type a message...", maxLength, ...props }, ref) => {
    const [value, setValue] = React.useState("")
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const combinedRef = (node: HTMLTextAreaElement) => {
      (ref as React.RefCallback<HTMLTextAreaElement>)?.(node)
      ;(textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>).current = node
    }

    const handleSubmit = React.useCallback(() => {
      const trimmed = value.trim()
      if (!trimmed || disabled) return
      onSubmit?.(trimmed)
      setValue("")
    }, [value, disabled, onSubmit])

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          handleSubmit()
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          handleSubmit()
        }
      },
      [handleSubmit]
    )

    const charCount = value.length

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <div className="relative flex items-end gap-2">
          <textarea
            ref={combinedRef}
            value={value}
            onChange={(e) => {
              if (maxLength && e.target.value.length > maxLength) return
              setValue(e.target.value)
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "min-h-[44px] w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            aria-label="Chat input"
            aria-disabled={disabled}
            {...props}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors",
              "hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
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
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between px-1">
          {maxLength && (
            <span className="text-[11px] text-muted-foreground">
              {charCount}/{maxLength}
            </span>
          )}
          <span className="text-[11px] text-muted-foreground ml-auto opacity-60">
            Enter to send · Shift+Enter for new line
          </span>
        </div>
      </div>
    )
  }
)
AiPrompt.displayName = "AiPrompt"

export { AiPrompt }
