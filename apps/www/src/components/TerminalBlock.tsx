"use client"

import { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"

function parseCommands(text: string): { type: "command" | "output" | "success" | "error"; text: string }[] {
  return text.split("\n").map((line) => {
    if (line.startsWith("✓") || line.startsWith("✔")) {
      return { type: "success" as const, text: line }
    }
    if (line.startsWith("✗") || line.startsWith("✘") || line.startsWith("×")) {
      return { type: "error" as const, text: line }
    }
    if (line.startsWith("$ ")) {
      return { type: "command" as const, text: line }
    }
    return { type: "output" as const, text: line }
  })
}

export interface TerminalBlockProps {
  commands: string
}

export function TerminalBlock({ commands }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false)

  const lines = parseCommands(commands)

  const codeContent = commands.replace(/^\$\s/gm, "")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[var(--shiki-background,#0d1117)] ring-1 ring-foreground/10">
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">Terminal</span>
        </div>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy commands"}
          className="flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline text-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => {
          switch (line.type) {
            case "command":
              return (
                <div key={i} className="flex">
                  <span className="shrink-0 text-muted-foreground select-none mr-2">$</span>
                  <span className="text-foreground">{line.text.slice(2)}</span>
                </div>
              )
            case "success":
              return (
                <div key={i} className="flex items-center gap-2 text-primary">
                  <span>✓</span>
                  <span>{line.text.slice(2)}</span>
                </div>
              )
            case "error":
              return (
                <div key={i} className="flex items-center gap-2 text-destructive">
                  <span>✗</span>
                  <span>{line.text.slice(2)}</span>
                </div>
              )
            default:
              return (
                <div key={i} className="text-muted-foreground">
                  {line.text}
                </div>
              )
          }
        })}
      </div>
    </div>
  )
}
