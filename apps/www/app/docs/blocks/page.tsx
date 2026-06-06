import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Terminal } from "lucide-react"

export const metadata: Metadata = {
  title: "Blocks - Static UI",
  description: "Pre-built layout sections and page patterns. Copy and paste entire blocks into your project.",
  openGraph: {
    title: "Blocks - Static UI",
    description: "Pre-built layout sections and page patterns.",
  },
}

const blocks = [
  { name: "Dashboard 01", slug: "dashboard-01", description: "Full dashboard layout with sidebar, header, and stats", deps: 2 },
  { name: "Dashboard 02", slug: "dashboard-02", description: "Analytics dashboard variant with charts", deps: 2 },
  { name: "Login 01", slug: "login-01", description: "Clean login form with email and password", deps: 2 },
  { name: "Login 02", slug: "login-02", description: "Login form with social auth providers", deps: 2 },
  { name: "Pricing 01", slug: "pricing-01", description: "Three-tier pricing card layout", deps: 2 },
  { name: "Pricing 02", slug: "pricing-02", description: "Pricing table with feature comparison", deps: 2 },
  { name: "Hero 01", slug: "hero-01", description: "Centered hero section with CTA buttons", deps: 2 },
  { name: "Hero 02", slug: "hero-02", description: "Split hero section with image and text", deps: 2 },
  { name: "Feature 01", slug: "feature-01", description: "Three-column feature grid", deps: 2 },
  { name: "Feature 02", slug: "feature-02", description: "Alternating feature section with icons", deps: 2 },
]

export default function BlocksListingPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Blocks</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Blocks</h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
          Pre-built layout sections and page patterns. Copy and paste entire blocks into your project.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-900 rounded-xl overflow-hidden border border-neutral-900">
        {blocks.map((block) => (
          <Link
            key={block.slug}
            href={`/docs/blocks/${block.slug}`}
            className="flex flex-col gap-1.5 bg-[#030303] px-5 py-4 hover:bg-neutral-950/80 transition-colors group"
          >
            <span className="text-sm font-medium text-white group-hover:text-[#22c55e] transition-colors">
              {block.name}
            </span>
            <span className="text-[11px] text-neutral-500 leading-relaxed line-clamp-1">
              {block.description}
            </span>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700">
                <Terminal className="h-2.5 w-2.5" />
                npx @static-ui/cli add {block.slug}
              </span>
              <span className="text-[10px] text-neutral-700">
                {block.deps} dependencies
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
