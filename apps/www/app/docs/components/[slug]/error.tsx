"use client"

import { AlertTriangle, RefreshCw } from "lucide-react"

export default function ComponentDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-900 bg-red-950/30">
        <AlertTriangle className="h-6 w-6 text-red-400" />
      </div>
      <div className="flex flex-col items-center gap-1 text-center">
        <h2 className="text-lg font-semibold text-white">Failed to load component</h2>
        <p className="text-xs text-neutral-400 max-w-sm">
          {error.message || "An unexpected error occurred while loading this component page."}
        </p>
        {error.digest && (
          <p className="text-[10px] text-neutral-600 font-mono mt-1">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer mt-2"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        Try Again
      </button>
    </div>
  )
}
