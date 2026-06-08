"use client"

import type { Framework } from "@/lib/frameworks"
import { FrameworkBadge } from "./FrameworkBadge"
import { Check } from "lucide-react"
import { statusConfig } from "@/lib/frameworks"
import { Card } from "@/components/ui/card"

interface FrameworkCardProps {
  framework: Framework
  index: number
}

export function FrameworkCard({ framework, index }: FrameworkCardProps) {
  const Icon = framework.icon
  const isStableOrBeta = framework.status !== "planned"
  const statusStyle = statusConfig[framework.status]

  return (
    <Card
      className="group relative bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-card/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.03)]"
      style={{
        animationDuration: "500ms",
        animationDelay: `${index * 80}ms`,
        animationFillMode: "both",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center bg-secondary rounded-lg`}
          >
            <img src={framework.icon} alt={`${framework.name} icon`} className="h-8 w-8 p-1" />
          </div>
          <div>
            <h3 className={`text-sm font-semibold ${isStableOrBeta ? "text-foreground" : "text-muted-foreground"}`}>
              {framework.name}
            </h3>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              {framework.description.length > 40 ? `${framework.description.slice(0, 40)}...` : framework.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        {framework.autoDetect ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-chart-2">
            <Check className="h-3 w-3" />
            Auto Detect
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground font-medium">Manual</span>
        )}

        <FrameworkBadge status={framework.status} />
      </div>
    </Card>
  )
}
