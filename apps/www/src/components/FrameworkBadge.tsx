import type { FrameworkStatus } from "@/lib/frameworks"
import { statusConfig } from "@/lib/frameworks"

interface FrameworkBadgeProps {
  status: FrameworkStatus
  className?: string
}

export function FrameworkBadge({ status, className = "" }: FrameworkBadgeProps) {
  const config = statusConfig[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${config.bgColor} ${config.borderColor} ${config.color} ${className}`}
    >
      <span className={`h-1 w-1 rounded-full ${status === "stable" ? "bg-[#22c55e]" : status === "beta" ? "bg-blue-400" : "bg-neutral-500"}`} />
      {config.label}
    </span>
  )
}
