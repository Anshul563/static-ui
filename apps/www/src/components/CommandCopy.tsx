"use client"

import React, { useState } from "react"
import { Terminal, Check, Copy } from "lucide-react"
import { Card } from "@/../static-ui/ui/card"

interface CommandCopyProps {
  command: string
  label?: string
}

export function CommandCopy({ command, label }: CommandCopyProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="flex-row items-center justify-between p-3 pl-4 max-w-xl group">
      <div className="flex items-center gap-3 font-mono text-xs text-foreground min-w-0">
        <Terminal className="h-3.5 w-3.5 text-primary shrink-0" />
        <span className="truncate">{label || command}</span>
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
    </Card>
  )
}
