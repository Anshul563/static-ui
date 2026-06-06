import { Loader2 } from "lucide-react"

export default function ComponentDetailLoading() {
  return (
    <div className="flex flex-col gap-10 py-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-neutral-600">
          <span className="h-3 w-12 rounded bg-neutral-900" />
          <span className="h-3 w-3" />
          <span className="h-3 w-16 rounded bg-neutral-900" />
          <span className="h-3 w-3" />
          <span className="h-3 w-14 rounded bg-neutral-900" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-48 rounded-lg bg-neutral-900" />
          <div className="h-4 w-16 rounded-full bg-neutral-900" />
        </div>
        <div className="h-4 w-96 rounded bg-neutral-900" />
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex gap-4 pb-1">
          <div className="h-4 w-14 rounded bg-neutral-900" />
          <div className="h-4 w-10 rounded bg-neutral-900" />
        </div>
        <div className="rounded-xl border border-neutral-900 bg-neutral-950/50 min-h-[300px] flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-neutral-700" />
        </div>
      </div>

      {/* Installation skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-28 rounded bg-neutral-900" />
        <div className="h-3 w-64 rounded bg-neutral-900" />
        <div className="h-10 w-full max-w-xl rounded-xl bg-neutral-900" />
      </div>
    </div>
  )
}
