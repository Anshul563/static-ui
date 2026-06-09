"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface AiChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode
  children: React.ReactNode
  headerContent?: React.ReactNode
}

const AiChatLayout = React.forwardRef<HTMLDivElement, AiChatLayoutProps>(
  ({ className, sidebar, children, headerContent, ...props }, ref) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-dvh w-full overflow-hidden bg-background text-foreground",
          className
        )}
        {...props}
      >
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-background p-3 transition-transform duration-200",
            "lg:static lg:z-auto lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          aria-label="Chat sidebar"
        >
          {sidebar}
        </aside>

        {/* Main area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          {headerContent && (
            <header className="flex items-center gap-3 border-b border-border px-4 py-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-lg text-muted-foreground lg:hidden",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                )}
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
                aria-expanded={sidebarOpen}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
              {headerContent}
            </header>
          )}

          {/* Content area */}
          {children}
        </div>
      </div>
    )
  }
)
AiChatLayout.displayName = "AiChatLayout"

export { AiChatLayout }
