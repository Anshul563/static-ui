import React from "react"
import { Check, Terminal } from "lucide-react"
import Link from "next/link"
import { DynamicCommand } from "@/components/docs/CommandBlock"
import { Card } from "@/components/ui/card"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Themes",
  description:
    "Pre-built color themes for Static UI. Each theme provides a complete set of CSS variables for both light and dark mode.",
  path: "/docs/themes",
})

const themes = [
  {
    name: "Green",
    slug: "green",
    description: "Fresh and clean green accent theme",
    color: "#22c55e",
    isDefault: true,
  },
  { name: "Blue", slug: "blue", description: "Professional blue accent theme", color: "#3b82f6" },
  { name: "Zinc", slug: "zinc", description: "Neutral and minimal zinc theme", color: "#a1a1aa" },
  { name: "Slate", slug: "slate", description: "Cool gray slate theme", color: "#94a3b8" },
  { name: "Gaming", slug: "gaming", description: "Vibrant neon gaming theme", color: "#ec4899" },
  {
    name: "Cyberpunk",
    slug: "cyberpunk",
    description: "Bold cyberpunk dystopian theme",
    color: "#eab308",
  },
  { name: "Modern", slug: "modern", description: "Sleek modern teal theme", color: "#14b8a6" },
]

const swatches: Record<
  string,
  { primary: string; secondary: string; accent: string; ring: string }
> = {
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
        <p className="text-xs font-medium text-muted-foreground">Themes</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Themes</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
          Pre-built color themes for Static UI. Each theme provides a complete set of CSS variables
          for both light and dark mode.
        </p>
      </div>

      <hr className="border-border my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const s = swatches[theme.slug]
          return (
            <Link key={theme.slug} href={`/docs/themes/${theme.slug}`}>
              <Card className="group relative transition-all">
                <div
                  className="h-24 flex items-end p-4"
                  style={{
                    background: `linear-gradient(135deg, ${theme.color}33, ${theme.color}11)`,
                  }}
                >
                  <div className="flex gap-1.5">
                    <span
                      className="h-6 w-6 rounded-full border border-white/20"
                      style={{ backgroundColor: s.primary }}
                    />
                    <span
                      className="h-6 w-6 rounded-full border border-white/20"
                      style={{ backgroundColor: s.secondary }}
                    />
                    <span
                      className="h-6 w-6 rounded-full border border-white/20"
                      style={{ backgroundColor: s.accent }}
                    />
                    <span
                      className="h-6 w-6 rounded-full border border-white/20"
                      style={{ backgroundColor: s.ring }}
                    />
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {theme.name}
                    </span>
                    {theme.isDefault && (
                      <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        <Check className="h-2.5 w-2.5 mr-0.5" />
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">
                    {theme.description}
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mt-1">
                    <Terminal className="h-2.5 w-2.5" />
                    <DynamicCommand type="theme" slug={theme.slug} />
                  </span>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
