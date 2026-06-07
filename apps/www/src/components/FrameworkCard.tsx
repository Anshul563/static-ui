"use client"

import type { Framework } from "@/lib/frameworks"
import { FrameworkBadge } from "./FrameworkBadge"
import { Check } from "lucide-react"
import { statusConfig } from "@/lib/frameworks"

interface FrameworkCardProps {
  framework: Framework
  index: number
}

export function FrameworkCard({ framework, index }: FrameworkCardProps) {
  const Icon = framework.icon
  const isStableOrBeta = framework.status !== "planned"
  const statusStyle = statusConfig[framework.status]

  return (
    <div
      className="group relative rounded-xl border border-neutral-800/80 bg-[#0a0a0a]/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:bg-[#0a0a0a]/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.03)]"
      style={{
        animationDuration: "500ms",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-gradient-to-br ${framework.gradient} ${
              isStableOrBeta ? "border-neutral-700/50" : "border-neutral-800"
            } shadow-sm`}
          >
            <Icon className={`h-5 w-5 ${isStableOrBeta ? "text-white" : "text-neutral-400"}`} />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${isStableOrBeta ? "text-white" : "text-neutral-400"}`}>
              {framework.name}
            </h3>
            <p className="text-[11px] text-neutral-500 leading-tight mt-0.5">
              {framework.description.length > 40 ? `${framework.description.slice(0, 40)}...` : framework.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {framework.autoDetect ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#22c55e]">
            <Check className="h-3 w-3" />
            Auto Detect
          </span>
        ) : (
          <span className="text-[11px] text-neutral-600 font-medium">Manual</span>
        )}

        <FrameworkBadge status={framework.status} />
      </div>
    </div>
  )
}
