"use client"

import React, { useState } from "react"
import { Terminal, Check, Copy } from "lucide-react"

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
    <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a] p-3 pl-4 max-w-xl group">
      <div className="flex items-center gap-3 font-mono text-xs text-neutral-300 min-w-0">
        <Terminal className="h-3.5 w-3.5 text-[#22c55e] shrink-0" />
        <span className="truncate">{label || command}</span>
      </div>
      <button
        onClick={handleCopy}
        className="flex h-7 w-12 items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition-all active:scale-95 cursor-pointer shrink-0 ml-2"
      >
        {copied ? (
          <Check className="h-3 w-3 text-[#22c55e]" />
        ) : (
          <Copy className="h-3 w-3 text-neutral-400" />
        )}
      </button>
    </div>
  )
}
