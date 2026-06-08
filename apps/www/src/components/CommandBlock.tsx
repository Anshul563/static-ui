"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { getCommand, type CommandType } from "@/lib/package-manager"
import { usePackageManager } from "@/lib/package-manager-context"

interface CommandBlockProps {
  type: CommandType
  slug?: string
}

export function CommandBlock({ type, slug }: CommandBlockProps) {
  const { packageManager } = usePackageManager()
  const [copied, setCopied] = useState(false)

  const command = getCommand(type, packageManager, slug)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card/80 p-3 pl-4 max-w-xl group">
      <div className="flex items-center gap-3 font-mono text-xs text-foreground min-w-0">
        <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate">{command}</span>
      </div>
      <button
        onClick={handleCopy}
        className="flex h-7 w-12 items-center justify-center rounded-md bg-muted border border-border hover:bg-accent text-foreground transition-all active:scale-95 cursor-pointer shrink-0 ml-2"
      >
        {copied ? (
          <Check className="h-3 w-3 text-primary" />
        ) : (
          <Copy className="h-3 w-3 text-muted-foreground" />
        )}
      </button>
    </div>
  )
}
