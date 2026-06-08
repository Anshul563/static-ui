"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { CommandCopy } from "./CommandCopy"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/CodeBlock"

interface PreviewCardProps {
  title: string
  description?: string
  preview?: React.ReactNode
  code?: string
  cliCommand?: string
  isInstalled?: boolean
  dependencies?: string[]
}

export function PreviewCard({
  title,
  description,
  preview,
  code,
  cliCommand,
  isInstalled,
  dependencies,
}: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "cli">(
    "preview"
  )
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const tabs = []
  if (preview) tabs.push({ id: "preview" as const, label: "Preview" })
  if (code) tabs.push({ id: "code" as const, label: "Code" })
  if (cliCommand) tabs.push({ id: "cli" as const, label: "CLI" })

  return (
    <Card>
      <div className="p-4 pb-0 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {isInstalled !== undefined && (
            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                isInstalled
                  ? "border-green-900 bg-green-950/50 text-green-400"
                  : "border-border bg-muted text-muted-foreground"
              }`}
            >
              {isInstalled ? "Installed" : "Not installed"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex gap-4 text-xs font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "code" && code && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-accent hover:text-foreground transition-all cursor-pointer"
            >
              {copied ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>
      </div>

      {dependencies && dependencies.length > 0 && (
        <div className="px-4 pt-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] text-muted-foreground font-medium">
              Dependencies:
            </span>
            {dependencies.map((dep) => (
              <span
                key={dep}
                className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        {activeTab === "preview" && preview && (
          <Card size="sm" className="bg-background min-h-48 flex-row items-center justify-center p-6 relative bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
            {preview}
          </Card>
        )}

        {activeTab === "code" && code && (
          <CodeBlock code={code} language="tsx" showLineNumbers />
        )}

        {activeTab === "cli" && cliCommand && (
          <div className="flex items-center justify-center min-h-32">
            <CommandCopy command={cliCommand} label={cliCommand} />
          </div>
        )}
      </div>
    </Card>
  )
}
