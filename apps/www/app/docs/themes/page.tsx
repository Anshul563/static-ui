import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Terminal, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Themes - Static UI",
  description: "Pre-built color themes for Static UI. Each theme provides a complete set of CSS variables for both light and dark mode.",
  openGraph: {
    title: "Themes - Static UI",
    description: "Pre-built color themes for Static UI.",
  },
}

const themes = [
  { name: "Green", slug: "green", description: "Fresh and clean green accent theme", color: "#22c55e", isDefault: true },
  { name: "Blue", slug: "blue", description: "Professional blue accent theme", color: "#3b82f6" },
  { name: "Zinc", slug: "zinc", description: "Neutral and minimal zinc theme", color: "#a1a1aa" },
  { name: "Slate", slug: "slate", description: "Cool gray slate theme", color: "#94a3b8" },
  { name: "Gaming", slug: "gaming", description: "Vibrant neon gaming theme", color: "#ec4899" },
  { name: "Cyberpunk", slug: "cyberpunk", description: "Bold cyberpunk dystopian theme", color: "#eab308" },
  { name: "Modern", slug: "modern", description: "Sleek modern teal theme", color: "#14b8a6" },
]

const swatches: Record<string, { primary: string; secondary: string; accent: string; ring: string }> = {
  green: { primary: "#22c55e", secondary: "#86efac", accent: "#22c55e", ring: "#22c55e" },
  blue: { primary: "#3b82f6", secondary: "#93c5fd", accent: "#3b82f6", ring: "#3b82f6" },
  zinc: { primary: "#18181b", secondary: "#a1a1aa", accent: "#a1a1aa", ring: "#18181b" },
  slate: { primary: "#1e293b", secondary: "#94a3b8", accent: "#94a3b8", ring: "#1e293b" },
  gaming: { primary: "#ec4899", secondary: "#60a5fa", accent: "#ec4899", ring: "#ec4899" },
  cyberpunk: { primary: "#eab308", secondary: "#60a5fa", accent: "#eab308", ring: "#eab308" },
  modern: { primary: "#14b8a6", secondary: "#5eead4", accent: "#14b8a6", ring: "#14b8a6" },
}

export default function ThemesListingPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Themes</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Themes</h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
          Pre-built color themes for Static UI. Each theme provides a complete set of CSS variables for both light and dark mode.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const s = swatches[theme.slug]
          return (
            <Link
              key={theme.slug}
              href={`/docs/themes/${theme.slug}`}
              className="group relative flex flex-col rounded-xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-700 transition-all"
            >
              <div
                className="h-24 flex items-end p-4"
                style={{ background: `linear-gradient(135deg, ${theme.color}33, ${theme.color}11)` }}
              >
                <div className="flex gap-1.5">
                  <span className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: s.primary }} />
                  <span className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: s.secondary }} />
                  <span className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: s.accent }} />
                  <span className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: s.ring }} />
                </div>
              </div>
              <div className="p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white group-hover:text-[#22c55e] transition-colors">
                    {theme.name}
                  </span>
                  {theme.isDefault && (
                    <span className="inline-flex items-center rounded-full border border-[#22c55e]/30 bg-[#22c55e]/10 px-2 py-0.5 text-[10px] font-medium text-[#22c55e]">
                      <Check className="h-2.5 w-2.5 mr-0.5" />
                      Default
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-neutral-500 leading-relaxed line-clamp-1">
                  {theme.description}
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 mt-1">
                  <Terminal className="h-2.5 w-2.5" />
                  npx @static-ui/cli theme {theme.slug}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
