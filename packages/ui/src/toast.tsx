import * as React from "react"

type ToastContext = {
  toast: (payload: any) => void
}

const ToastCtx = React.createContext<ToastContext | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toast = React.useCallback((payload: any) => {
    // Placeholder: replace with sonner or your toast implementation
    console.log("Toast:", payload)
  }, [])

  return <ToastCtx.Provider value={{ toast }}>{children}</ToastCtx.Provider>
}

export function useToast() {
  const ctx = React.useContext(ToastCtx)
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return ctx.toast
}

export default ToastProvider
