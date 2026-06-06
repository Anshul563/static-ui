"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AiCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  showLineNumbers?: boolean
}

const AiCodeBlock = React.forwardRef<HTMLDivElement, AiCodeBlockProps>(
  ({ className, code, language, showLineNumbers = false, ...props }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleCopy = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Clipboard API not available
      }
    }, [code])

    const lines = code.split("\n")

    return (
      <div
        ref={ref}
        className={cn("group relative rounded-lg border border-border overflow-hidden", className)}
        role="region"
        aria-label={language ? `${language} code block` : "Code block"}
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <span className="text-xs text-muted-foreground font-mono">
            {language || "code"}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? (
              <>
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
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
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
        <div className="overflow-x-auto p-4 text-sm">
          <pre className="font-mono text-sm leading-relaxed">
            <code>
              {showLineNumbers
                ? lines.map((line, i) => (
                    <span key={i} className="table-row">
                      <span className="table-cell text-right text-muted-foreground/50 select-none pr-4 text-xs w-[1%]">
                        {i + 1}
                      </span>
                      <span className="table-cell text-foreground">
                        {line || "\u00A0"}
                      </span>
                    </span>
                  ))
                : code}
            </code>
          </pre>
        </div>
      </div>
    )
  }
)
AiCodeBlock.displayName = "AiCodeBlock"

export { AiCodeBlock }
