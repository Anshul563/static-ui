"use client"

import { frameworkCategories, statusConfig } from "@/lib/frameworks"
import { Card } from "@/../static-ui/ui/card"

export function FrameworkRoadmap() {
  const totalPhases = frameworkCategories.length
  const completedPhases = frameworkCategories.filter(
    (c) => c.status === "stable"
  ).length
  const progressPercent = Math.round((completedPhases / totalPhases) * 100)

  return (
    <Card className="bg-card/40 p-6 md:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-foreground">Framework Roadmap</h3>
        <span className="text-[11px] text-muted-foreground font-mono">
          {progressPercent}% complete
        </span>
      </div>

      <div className="relative mb-8 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400 transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {frameworkCategories.map((category) => {
          const isComplete = category.status === "stable"
          const isActive = category.status === "beta"
          const isFuture = category.status === "planned"

          return (
            <Card
              key={category.phase}
              size="sm"
              className={`relative border p-3.5 transition-all ${
                isComplete
                  ? "border-primary/20 bg-primary/5"
                  : isActive
                    ? "border-blue-400/20 bg-blue-400/5"
                    : "border-border bg-muted/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono font-medium uppercase tracking-wider ${
                    isComplete
                      ? "text-primary"
                      : isActive
                        ? "text-blue-400"
                        : "text-muted-foreground"
                  }`}
                >
                  {category.title}
                </span>
                <span
                  className={`text-[10px] font-medium ${
                    statusConfig[category.status].color
                  }`}
                >
                  {statusConfig[category.status].label}
                </span>
              </div>

              <div className="space-y-1">
                {category.items.map((fw) => (
                  <div
                    key={fw.slug}
                    className={`flex items-center gap-2 text-xs ${
                      isFuture ? "text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    <span className="h-1 w-1 rounded-full bg-current shrink-0" />
                    {fw.name}
                  </div>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}
