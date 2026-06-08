"use client"

import React from "react"
import { packageManagers, PM_LABELS } from "@/lib/package-manager"
import { usePackageManager } from "@/lib/package-manager-context"

export function PackageManagerSwitcher() {
  const { packageManager, setPackageManager } = usePackageManager()

  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-card p-0.5 gap-0.5">
      {packageManagers.map((pm) => (
        <button
          key={pm}
          onClick={() => setPackageManager(pm)}
          data-active={packageManager === pm}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=false]:text-muted-foreground data-[active=false]:hover:text-foreground data-[active=false]:hover:bg-accent"
        >
          <img src={`/icons/${pm}.svg`} alt={PM_LABELS[pm]} className="h-3.5 w-3.5" />
          {PM_LABELS[pm]}
        </button>
      ))}
    </div>
  )
}
