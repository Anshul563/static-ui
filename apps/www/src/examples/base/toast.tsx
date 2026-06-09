"use client"
import { ToastProvider, useToast } from "@static-ui/ui"
function ToastButton() {
  const { toast } = useToast()
  return (
    <button onClick={() => toast({ title: "Saved!", description: "Your changes have been saved." })} className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">Show Toast</button>
  )
}
export default function ToastDemo() {
  return (
    <ToastProvider>
      <ToastButton />
    </ToastProvider>
  )
}
