"use client"

import React, { useState } from "react"
import { Check, Copy, Terminal } from "lucide-react"
import { CommandCopy } from "./CommandCopy"

interface PreviewCardProps {
  title: string
  description?: string
  preview?: React.ReactNode
  code?: string
  cliCommand?: string
  isInstalled?: boolean
  dependencies?: string[]
}

function highlightCode(code: string): React.ReactNode {
  const tokens = code.split(
    /(\b(?:import|from|export|default|function|return|const|let|var|class|extends|interface|type|typeof|void|if|else|for|while|as|async|await)\b|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/.*$|\/\*[\s\S]*?\*\/))/m
  )

  return tokens.map((token, i) => {
    if (
      /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)$/.test(token)
    ) {
      return (
        <span key={i} className="text-amber-400/80">
          {token}
        </span>
      )
    }
    if (/^(\/\/.*|\/\*[\s\S]*?\*\/)$/.test(token)) {
      return (
        <span key={i} className="text-neutral-600">
          {token}
        </span>
      )
    }
    if (
      /^(import|from|export|default|function|return|const|let|var|class|extends|interface|type|typeof|void|if|else|for|while|as|async|await)$/.test(
        token
      )
    ) {
      return (
        <span key={i} className="text-purple-400/80">
          {token}
        </span>
      )
    }
    return token
  })
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
    <div className="rounded-xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden">
      <div className="p-4 pb-0 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            {description && (
              <p className="text-xs text-neutral-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {isInstalled !== undefined && (
            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium ${
                isInstalled
                  ? "border-green-900 bg-green-950/50 text-green-400"
                  : "border-neutral-800 bg-neutral-900 text-neutral-500"
              }`}
            >
              {isInstalled ? "Installed" : "Not installed"}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-neutral-900 pb-1">
          <div className="flex gap-4 text-xs font-medium">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#22c55e] text-[#22c55e] font-semibold"
                    : "border-transparent text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "code" && code && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
            >
              {copied ? (
                <Check className="h-3 w-3 text-[#22c55e]" />
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
            <span className="text-[10px] text-neutral-500 font-medium">
              Dependencies:
            </span>
            {dependencies.map((dep) => (
              <span
                key={dep}
                className="rounded-md border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="p-4">
        {activeTab === "preview" && preview && (
          <div className="rounded-lg border border-neutral-900 bg-[#030303] min-h-48 flex items-center justify-center p-6 relative overflow-hidden bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
            {preview}
          </div>
        )}

        {activeTab === "code" && code && (
          <pre className="w-full font-mono text-[11px] text-neutral-300 overflow-x-auto whitespace-pre rounded-lg bg-[#050505] border border-neutral-950 p-4 leading-relaxed">
            <code>{highlightCode(code)}</code>
          </pre>
        )}

        {activeTab === "cli" && cliCommand && (
          <div className="flex items-center justify-center min-h-32">
            <CommandCopy command={cliCommand} label={cliCommand} />
          </div>
        )}
      </div>
    </div>
  )
}
