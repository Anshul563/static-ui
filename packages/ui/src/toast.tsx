"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastMessage {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

const ToastContext = React.createContext<{
  toast: (props: Omit<ToastMessage, "id">) => void
} | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const toast = React.useCallback(({ title, description, variant = "default" }: Omit<ToastMessage, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, variant }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-8 shadow-lg transition-all duration-300 ease-out",
              t.variant === "default" && "bg-background border-border text-foreground",
              t.variant === "destructive" && "destructive group border-destructive bg-destructive text-destructive-foreground"
            )}
          >
            <div className="grid gap-1">
              {t.title && <div className="text-sm font-semibold">{t.title}</div>}
              {t.description && <div className={cn("text-xs opacity-90", t.variant === "default" ? "text-muted-foreground" : "text-primary-foreground")}>{t.description}</div>}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}