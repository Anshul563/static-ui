import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function ComponentDetailLoading() {
  return (
    <div className="flex flex-col gap-10 py-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="h-3 w-12 rounded bg-muted" />
          <span className="h-3 w-3" />
          <span className="h-3 w-16 rounded bg-muted" />
          <span className="h-3 w-3" />
          <span className="h-3 w-14 rounded bg-muted" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-4 w-96 rounded bg-muted" />
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex gap-4 pb-1">
          <div className="h-4 w-14 rounded bg-muted" />
          <div className="h-4 w-10 rounded bg-muted" />
        </div>
        <Card className="bg-card/50 min-h-[300px] flex-row items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </Card>
      </div>

      {/* Installation skeleton */}
      <div className="space-y-3">
        <div className="h-5 w-28 rounded bg-muted" />
        <div className="h-3 w-64 rounded bg-muted" />
        <div className="h-10 w-full max-w-xl rounded-xl bg-muted" />
      </div>
    </div>
  )
}
