"use client"

import { frameworkCategories, statusConfig } from "@/lib/frameworks"

export function FrameworkRoadmap() {
  const totalPhases = frameworkCategories.length
  const completedPhases = frameworkCategories.filter(
    (c) => c.status === "stable"
  ).length
  const progressPercent = Math.round((completedPhases / totalPhases) * 100)

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#0a0a0a]/40 p-6 md:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-white">Framework Roadmap</h3>
        <span className="text-[11px] text-neutral-500 font-mono">
          {progressPercent}% complete
        </span>
      </div>

      <div className="relative mb-8 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#22c55e] to-emerald-400 transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {frameworkCategories.map((category) => {
          const isComplete = category.status === "stable"
          const isActive = category.status === "beta"
          const isFuture = category.status === "planned"

          return (
            <div
              key={category.phase}
              className={`relative rounded-lg border p-3.5 transition-all ${
                isComplete
                  ? "border-[#22c55e]/20 bg-[#22c55e]/5"
                  : isActive
                    ? "border-blue-400/20 bg-blue-400/5"
                    : "border-neutral-800 bg-neutral-900/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono font-medium uppercase tracking-wider ${
                    isComplete
                      ? "text-[#22c55e]"
                      : isActive
                        ? "text-blue-400"
                        : "text-neutral-600"
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
                      isFuture ? "text-neutral-600" : "text-neutral-300"
                    }`}
                  >
                    <span className="h-1 w-1 rounded-full bg-current shrink-0" />
                    {fw.name}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
