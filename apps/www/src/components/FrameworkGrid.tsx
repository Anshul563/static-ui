"use client"

import { frameworks } from "@/lib/frameworks"
import { FrameworkCard } from "./FrameworkCard"

export function FrameworkGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {frameworks.map((fw, i) => (
        <FrameworkCard key={fw.slug} framework={fw} index={i} />
      ))}
    </div>
  )
}
