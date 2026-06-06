"use client"

import React, { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { ChevronRight, Terminal, Check, Copy } from "lucide-react"

const THEMES_META = [
  { name: "Green", slug: "green", description: "Fresh and clean green accent theme", color: "#22c55e", isDefault: true },
  { name: "Blue", slug: "blue",description: "Professional blue accent theme", color: "#3b82f6" },
  { name: "Zinc", slug: "zinc", description: "Neutral and minimal zinc theme", color: "#a1a1aa" },
  { name: "Slate", slug: "slate", description: "Cool gray slate theme", color: "#94a3b8" },
  { name: "Gaming", slug: "gaming", description: "Vibrant neon gaming theme", color: "#ec4899" },
  { name: "Cyberpunk", slug: "cyberpunk", description: "Bold cyberpunk dystopian theme", color: "#eab308" },
  { name: "Modern", slug: "modern", description: "Sleek modern teal theme", color: "#14b8a6" },
]

interface ThemeCSS {
  ":root": Record<string, string>
  dark: Record<string, string>
}

const THEMES_DATA: Record<string, ThemeCSS> = {
  green: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.13 0.028 261.69)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.13 0.028 261.69)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.13 0.028 261.69)", "--primary": "oklch(0.527 0.154 150.07)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.966 0.022 144.65)", "--secondary-foreground": "oklch(0.304 0.062 152.85)", "--muted": "oklch(0.966 0.022 144.65)", "--muted-foreground": "oklch(0.556 0.034 152.85)",
      "--accent": "oklch(0.966 0.022 144.65)", "--accent-foreground": "oklch(0.304 0.062 152.85)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.922 0.018 144.65)", "--input": "oklch(0.922 0.018 144.65)", "--ring": "oklch(0.527 0.154 150.07)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.13 0.028 261.69)", "--foreground": "oklch(0.985 0.002 247.86)", "--card": "oklch(0.13 0.028 261.69)", "--card-foreground": "oklch(0.985 0.002 247.86)",
      "--popover": "oklch(0.13 0.028 261.69)", "--popover-foreground": "oklch(0.985 0.002 247.86)", "--primary": "oklch(0.527 0.154 150.07)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.268 0.054 152.85)", "--secondary-foreground": "oklch(0.985 0.002 247.86)", "--muted": "oklch(0.268 0.054 152.85)", "--muted-foreground": "oklch(0.708 0.034 152.85)",
      "--accent": "oklch(0.268 0.054 152.85)", "--accent-foreground": "oklch(0.985 0.002 247.86)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.268 0.054 152.85)", "--input": "oklch(0.268 0.054 152.85)", "--ring": "oklch(0.527 0.154 150.07)"
    }
  },
  blue: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.13 0.028 261.69)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.13 0.028 261.69)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.13 0.028 261.69)", "--primary": "oklch(0.546 0.245 262.88)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.946 0.054 262.88)", "--secondary-foreground": "oklch(0.278 0.069 262.88)", "--muted": "oklch(0.946 0.054 262.88)", "--muted-foreground": "oklch(0.556 0.04 262.88)",
      "--accent": "oklch(0.946 0.054 262.88)", "--accent-foreground": "oklch(0.278 0.069 262.88)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.922 0.022 262.88)", "--input": "oklch(0.922 0.022 262.88)", "--ring": "oklch(0.546 0.245 262.88)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.13 0.028 261.69)", "--foreground": "oklch(0.985 0.002 247.86)", "--card": "oklch(0.13 0.028 261.69)", "--card-foreground": "oklch(0.985 0.002 247.86)",
      "--popover": "oklch(0.13 0.028 261.69)", "--popover-foreground": "oklch(0.985 0.002 247.86)", "--primary": "oklch(0.546 0.245 262.88)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.278 0.069 262.88)", "--secondary-foreground": "oklch(0.985 0.002 247.86)", "--muted": "oklch(0.278 0.069 262.88)", "--muted-foreground": "oklch(0.708 0.04 262.88)",
      "--accent": "oklch(0.278 0.069 262.88)", "--accent-foreground": "oklch(0.985 0.002 247.86)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.278 0.069 262.88)", "--input": "oklch(0.278 0.069 262.88)", "--ring": "oklch(0.546 0.245 262.88)"
    }
  },
  zinc: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.141 0.005 285.82)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.141 0.005 285.82)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.141 0.005 285.82)", "--primary": "oklch(0.141 0.005 285.82)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.967 0.001 286.38)", "--secondary-foreground": "oklch(0.21 0.006 285.88)", "--muted": "oklch(0.967 0.001 286.38)", "--muted-foreground": "oklch(0.552 0.016 285.94)",
      "--accent": "oklch(0.967 0.001 286.38)", "--accent-foreground": "oklch(0.21 0.006 285.88)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.92 0.004 286.32)", "--input": "oklch(0.92 0.004 286.32)", "--ring": "oklch(0.141 0.005 285.82)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.141 0.005 285.82)", "--foreground": "oklch(0.985 0 0)", "--card": "oklch(0.141 0.005 285.82)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.141 0.005 285.82)", "--popover-foreground": "oklch(0.985 0 0)", "--primary": "oklch(1 0 0)", "--primary-foreground": "oklch(0.141 0.005 285.82)",
      "--secondary": "oklch(0.274 0.006 286.03)", "--secondary-foreground": "oklch(0.985 0 0)", "--muted": "oklch(0.274 0.006 286.03)", "--muted-foreground": "oklch(0.705 0.015 286.07)",
      "--accent": "oklch(0.274 0.006 286.03)", "--accent-foreground": "oklch(0.985 0 0)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.274 0.006 286.03)", "--input": "oklch(0.274 0.006 286.03)", "--ring": "oklch(0.871 0.006 286.29)"
    }
  },
  slate: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.129 0.042 264.7)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.129 0.042 264.7)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.129 0.042 264.7)", "--primary": "oklch(0.129 0.042 264.7)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.968 0.007 264.5)", "--secondary-foreground": "oklch(0.208 0.042 265.76)", "--muted": "oklch(0.968 0.007 264.5)", "--muted-foreground": "oklch(0.554 0.046 257.42)",
      "--accent": "oklch(0.968 0.007 264.5)", "--accent-foreground": "oklch(0.208 0.042 265.76)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.929 0.013 255.51)", "--input": "oklch(0.929 0.013 255.51)", "--ring": "oklch(0.129 0.042 264.7)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.129 0.042 264.7)", "--foreground": "oklch(0.984 0.003 247.86)", "--card": "oklch(0.129 0.042 264.7)", "--card-foreground": "oklch(0.984 0.003 247.86)",
      "--popover": "oklch(0.129 0.042 264.7)", "--popover-foreground": "oklch(0.984 0.003 247.86)", "--primary": "oklch(1 0 0)", "--primary-foreground": "oklch(0.129 0.042 264.7)",
      "--secondary": "oklch(0.279 0.041 260.03)", "--secondary-foreground": "oklch(0.984 0.003 247.86)", "--muted": "oklch(0.279 0.041 260.03)", "--muted-foreground": "oklch(0.704 0.04 256.79)",
      "--accent": "oklch(0.279 0.041 260.03)", "--accent-foreground": "oklch(0.984 0.003 247.86)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.279 0.041 260.03)", "--input": "oklch(0.279 0.041 260.03)", "--ring": "oklch(0.871 0.006 286.29)"
    }
  },
  gaming: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.09 0.02 300)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.09 0.02 300)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.09 0.02 300)", "--primary": "oklch(0.623 0.265 340.32)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.685 0.235 215.78)", "--secondary-foreground": "oklch(1 0 0)", "--muted": "oklch(0.92 0.02 300)", "--muted-foreground": "oklch(0.5 0.05 300)",
      "--accent": "oklch(0.685 0.235 215.78)", "--accent-foreground": "oklch(1 0 0)", "--destructive": "oklch(0.637 0.237 25.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.85 0.03 300)", "--input": "oklch(0.85 0.03 300)", "--ring": "oklch(0.623 0.265 340.32)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.09 0.02 300)", "--foreground": "oklch(0.985 0.002 247.86)", "--card": "oklch(0.09 0.02 300)", "--card-foreground": "oklch(0.985 0.002 247.86)",
      "--popover": "oklch(0.09 0.02 300)", "--popover-foreground": "oklch(0.985 0.002 247.86)", "--primary": "oklch(0.623 0.265 340.32)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.685 0.235 215.78)", "--secondary-foreground": "oklch(1 0 0)", "--muted": "oklch(0.2 0.04 300)", "--muted-foreground": "oklch(0.6 0.06 300)",
      "--accent": "oklch(0.685 0.235 215.78)", "--accent-foreground": "oklch(1 0 0)", "--destructive": "oklch(0.637 0.237 25.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.25 0.04 300)", "--input": "oklch(0.25 0.04 300)", "--ring": "oklch(0.685 0.235 215.78)"
    }
  },
  cyberpunk: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.07 0.04 280)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.07 0.04 280)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.07 0.04 280)", "--primary": "oklch(0.905 0.22 116.35)", "--primary-foreground": "oklch(0.07 0.04 280)",
      "--secondary": "oklch(0.6 0.27 230)", "--secondary-foreground": "oklch(1 0 0)", "--muted": "oklch(0.9 0.04 280)", "--muted-foreground": "oklch(0.5 0.06 280)",
      "--accent": "oklch(0.6 0.27 230)", "--accent-foreground": "oklch(1 0 0)", "--destructive": "oklch(0.637 0.237 25.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.8 0.06 280)", "--input": "oklch(0.8 0.06 280)", "--ring": "oklch(0.905 0.22 116.35)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.07 0.04 280)", "--foreground": "oklch(0.985 0.002 247.86)", "--card": "oklch(0.07 0.04 280)", "--card-foreground": "oklch(0.985 0.002 247.86)",
      "--popover": "oklch(0.07 0.04 280)", "--popover-foreground": "oklch(0.985 0.002 247.86)", "--primary": "oklch(0.905 0.22 116.35)", "--primary-foreground": "oklch(0.07 0.04 280)",
      "--secondary": "oklch(0.6 0.27 230)", "--secondary-foreground": "oklch(1 0 0)", "--muted": "oklch(0.15 0.06 280)", "--muted-foreground": "oklch(0.6 0.08 280)",
      "--accent": "oklch(0.6 0.27 230)", "--accent-foreground": "oklch(1 0 0)", "--destructive": "oklch(0.637 0.237 25.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.2 0.08 280)", "--input": "oklch(0.2 0.08 280)", "--ring": "oklch(0.905 0.22 116.35)"
    }
  },
  modern: {
    ":root": {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.13 0.02 240)", "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.13 0.02 240)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.13 0.02 240)", "--primary": "oklch(0.6 0.18 195)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.96 0.02 195)", "--secondary-foreground": "oklch(0.25 0.04 195)", "--muted": "oklch(0.96 0.02 195)", "--muted-foreground": "oklch(0.55 0.03 195)",
      "--accent": "oklch(0.96 0.02 195)", "--accent-foreground": "oklch(0.25 0.04 195)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.92 0.02 195)", "--input": "oklch(0.92 0.02 195)", "--ring": "oklch(0.6 0.18 195)", "--radius": "0.5rem"
    },
    dark: {
      "--background": "oklch(0.13 0.02 240)", "--foreground": "oklch(0.985 0.002 247.86)", "--card": "oklch(0.13 0.02 240)", "--card-foreground": "oklch(0.985 0.002 247.86)",
      "--popover": "oklch(0.13 0.02 240)", "--popover-foreground": "oklch(0.985 0.002 247.86)", "--primary": "oklch(0.6 0.18 195)", "--primary-foreground": "oklch(1 0 0)",
      "--secondary": "oklch(0.22 0.04 195)", "--secondary-foreground": "oklch(0.985 0.002 247.86)", "--muted": "oklch(0.22 0.04 195)", "--muted-foreground": "oklch(0.65 0.04 195)",
      "--accent": "oklch(0.22 0.04 195)", "--accent-foreground": "oklch(0.985 0.002 247.86)", "--destructive": "oklch(0.577 0.245 27.33)", "--destructive-foreground": "oklch(1 0 0)",
      "--border": "oklch(0.22 0.04 195)", "--input": "oklch(0.22 0.04 195)", "--ring": "oklch(0.6 0.18 195)"
    }
  }
}

const colorLabels: Record<string, string> = {
  "--background": "Background", "--foreground": "Foreground", "--card": "Card", "--card-foreground": "Card Foreground",
  "--popover": "Popover", "--popover-foreground": "Popover Foreground", "--primary": "Primary", "--primary-foreground": "Primary Foreground",
  "--secondary": "Secondary", "--secondary-foreground": "Secondary Foreground", "--muted": "Muted", "--muted-foreground": "Muted Foreground",
  "--accent": "Accent", "--accent-foreground": "Accent Foreground", "--destructive": "Destructive", "--destructive-foreground": "Destructive Foreground",
  "--border": "Border", "--input": "Input", "--ring": "Ring", "--radius": "Radius"
}

function oklchToHex(oklch: string): string {
  if (!oklch || oklch === "0.5rem") return "#888"
  if (oklch.startsWith("oklch(")) return oklch
  return oklch
}

function ColorSwatch({ label, value }: { label: string; value: string }) {
  const hexLabel = oklchToHex(value)
  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg border border-neutral-900 bg-neutral-950/50">
      <span className="h-8 w-8 rounded-md border border-neutral-800 shrink-0" style={{ backgroundColor: hexLabel }} />
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-white">{label}</span>
        <span className="text-[10px] font-mono text-neutral-500 truncate">{value.replace("oklch(", "").replace(")", "")}</span>
      </div>
    </div>
  )
}

export default function ThemeDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const meta = THEMES_META.find((t) => t.slug === slug)
  if (!meta) return notFound()

  const css = THEMES_DATA[slug]
  if (!css) return notFound()

  const [copiedCommand, setCopiedCommand] = useState(false)
  const [activePreview, setActivePreview] = useState(false)

  const handleCopyCommand = async () => {
    await navigator.clipboard.writeText(`npx @static-ui/cli theme ${slug}`)
    setCopiedCommand(true)
    setTimeout(() => setCopiedCommand(false), 2000)
  }

  const rootVars = css[":root"]
  const darkVars = css.dark

  const previewStyle: React.CSSProperties = activePreview
    ? (() => {
        const props: Record<string, string> = {}
        for (const [k, v] of Object.entries(rootVars)) {
          if (k !== "--radius") props[k] = v
        }
        for (const [k, v] of Object.entries(darkVars)) {
          if (k !== "--radius") props[k] = v
        }
        return props as React.CSSProperties
      })()
    : {}

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
          Docs <ChevronRight className="h-3 w-3" /> Themes <ChevronRight className="h-3 w-3" />{" "}
          <span className="text-neutral-400">{meta.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-white">{meta.name}</h1>
          {meta.isDefault && (
            <span className="inline-flex items-center rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2.5 py-0.5 text-xs font-medium text-[#22c55e]">
              Default
            </span>
          )}
        </div>
        <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">{meta.description}</p>
      </div>

      <hr className="border-neutral-900" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white tracking-tight">Color Palette</h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">Light Mode — <code className="text-white font-mono">:root</code></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.entries(rootVars).filter(([k]) => k !== "--radius").map(([key, val]) => (
                <ColorSwatch key={key} label={colorLabels[key] || key} value={val} />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-neutral-400 mb-3">Dark Mode — <code className="text-white font-mono">.dark</code></h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {Object.entries(darkVars).filter(([k]) => k !== "--radius").map(([key, val]) => (
                <ColorSwatch key={key} label={colorLabels[key] || key} value={val} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white tracking-tight">Installation</h2>
        <p className="text-xs text-neutral-400">Apply this theme to your project using the CLI:</p>
        <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a]/80 p-3 pl-4 max-w-xl shadow-md">
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
            <Terminal className="h-3.5 w-3.5 text-[#22c55e]" />
            <span>npx @static-ui/cli theme {slug}</span>
          </div>
          <button
            onClick={handleCopyCommand}
            className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer ml-3"
          >
            {copiedCommand ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
            {copiedCommand ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white tracking-tight">Installation Instructions</h2>
        <div className="text-sm text-neutral-400 leading-relaxed space-y-3">
          <p>1. Run the CLI command above to generate the theme CSS file in your project.</p>
          <p>2. Import the generated CSS file in your <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">globals.css</code> or layout file.</p>
          <p>3. The theme variables will override the default palette for both <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">:root</code> (light) and <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">.dark</code> (dark) modes.</p>
          <p>4. Components using <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">bg-primary</code>, <code className="text-white text-xs font-mono bg-neutral-900 px-1 py-0.5 rounded-sm">text-foreground</code>, and other themed utilities will automatically reflect the new colors.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white tracking-tight">Live Preview</h2>
          <button
            onClick={() => setActivePreview(!activePreview)}
            className={`inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-medium transition-all cursor-pointer ${
              activePreview
                ? "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]"
                : "border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:bg-neutral-900"
            }`}
          >
            {activePreview ? "Applied" : "Apply Theme"}
          </button>
        </div>
        <div
          className="rounded-xl border border-neutral-900 bg-[#030303] p-6 relative overflow-hidden bg-[radial-gradient(#161616_1px,transparent_1px)] bg-[size:16px_16px]"
          style={previewStyle as React.CSSProperties}
        >
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            <button
              className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors"
              style={{
                backgroundColor: "var(--primary, #22c55e)",
                color: "var(--primary-foreground, #fff)",
              }}
            >
              Primary Button
            </button>
            <button
              className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium transition-colors"
              style={{
                borderColor: "var(--border, #333)",
                color: "var(--foreground, #fff)",
              }}
            >
              Outline Button
            </button>
            <div
              className="rounded-xl border p-4"
              style={{
                borderColor: "var(--border, #333)",
                backgroundColor: "var(--card, #111)",
                color: "var(--card-foreground, #fff)",
              }}
            >
              <p className="text-sm font-medium" style={{ color: "var(--foreground, #fff)" }}>Sample Card</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground, #888)" }}>
                This card uses the theme&apos;s CSS variables for its colors.
              </p>
            </div>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold w-fit"
              style={{
                backgroundColor: "var(--primary, #22c55e)",
                color: "var(--primary-foreground, #fff)",
              }}
            >
              Badge
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
