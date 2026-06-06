"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SonnerMessage {
  id: string
  message: string
  description?: string
}

const SonnerContext = React.createContext<{
  toast: (message: string, description?: string) => void
} | null>(null)

export function useSonner() {
  const context = React.useContext(SonnerContext)
  if (!context) throw new Error("useSonner must be used within a SonnerProvider")
  return context
}

export const SonnerProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = React.useState<SonnerMessage[]>([])

  const toast = React.useCallback((message: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9)
    setItems((prev) => [...prev, { id, message, description }].slice(-3)) // Keeps a max stack of 3 on screen

    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }, 4000)
  }, [])

  return (
    <SonnerContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-sm">
        {items.map((item, index) => {
          const isBottom = items.length - 1 - index
          return (
            <div
              key={item.id}
              style={{
                transform: `scale(${1 - isBottom * 0.05}) translateY(${isBottom * 10}px)`,
                zIndex: items.length - isBottom,
                opacity: 1 - isBottom * 0.3,
              }}
              className={cn(
                "pointer-events-auto w-full rounded-xl border border-border bg-background p-4 text-foreground shadow-md transition-all duration-300 flex flex-col gap-1 origin-bottom",
                isBottom > 0 ? "absolute bottom-0" : "relative"
              )}
            >
              <div className="text-sm font-semibold tracking-tight">{item.message}</div>
              {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
            </div>
          )
        })}
      </div>
    </SonnerContext.Provider>
  )
}