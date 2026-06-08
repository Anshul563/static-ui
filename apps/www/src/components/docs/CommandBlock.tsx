"use client"

import React, { useState } from "react"
import { Check, Copy } from "lucide-react"
import { getCommand, type CommandType, type PackageManager as PM } from "@/lib/package-manager"

type PackageManager = PM

const managers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

const STORAGE_KEY = "static-ui-pm"

function getStoredPM(): PackageManager {
  if (typeof window === "undefined") return "pnpm"
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && ["npm", "pnpm", "yarn", "bun"].includes(stored)) return stored as PackageManager
  return "pnpm"
}

function setStoredPM(pm: PackageManager) {
  localStorage.setItem(STORAGE_KEY, pm)
}

interface CommandBlockProps {
  type: CommandType
  slug?: string
  usageArgs?: string
}

export function CommandBlock({ type, slug, usageArgs }: CommandBlockProps) {
  const [pm, setPm] = useState<PackageManager>(getStoredPM)
  const [copied, setCopied] = useState(false)

  const command = getCommand(type, pm, slug) + (usageArgs || "")

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handlePMChange = (m: PackageManager) => {
    setPm(m)
    setStoredPM(m)
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-0.5">
          {managers.map((m) => (
            <button
              key={m}
              onClick={() => handlePMChange(m)}
              className={`px-2 py-0.5 text-xs font-medium rounded-sm transition-all cursor-pointer ${
                pm === m
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-primary" />
              <span className="text-primary">Copied</span>
            </>
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </button>
      </div>
      <div className="px-4 py-3 font-mono text-xs text-foreground flex items-center gap-2">
        <span className="text-muted-foreground select-none">$</span>
        <span className="truncate">{command}</span>
      </div>
    </div>
  )
}

export function DynamicCommand({ type, slug }: CommandBlockProps) {
  const [pm] = useState<PackageManager>(getStoredPM)
  return <>{getCommand(type, pm, slug)}</>
}
