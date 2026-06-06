import React from "react"
import type { Metadata } from "next"
import { Terminal, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Introduction - Static UI Docs",
  description: "Beautifully designed component primitives that you can copy, paste, and completely control inside your applications.",
  openGraph: {
    title: "Introduction - Static UI Docs",
    description: "Copy, paste, and fully own every line of code.",
  },
}

export default function DocsIntroductionPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Breadcrumb Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Getting Started</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Introduction</h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          Beautifully designed component primitives that you can copy, paste, and completely control inside your applications.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      {/* Philosophy */}
      <div className="space-y-4 text-sm leading-relaxed text-neutral-400">
        <p>
          Static UI is <strong className="text-white font-medium">not a component library</strong> in the traditional sense. It is not an npm package that you download as an unchangeable dependency block. Instead, it is a suite of carefully engineered open-source code templates powered by unstyled Base UI controllers and styled with Tailwind CSS v4.
        </p>
        <p>
          You use our custom command-line interface engine to generate these primitives directly into your local workspaces, allowing you total execution ownership over structure, themes, and logic variants.
        </p>
      </div>

      {/* Why track */}
      <div className="space-y-3 mt-4">
        <h2 className="text-xl font-semibold tracking-tight text-white">Why Static UI?</h2>
        <p className="text-sm leading-relaxed text-neutral-400">
          Traditional component packages create an extraction layer away from your design system tokens. When you need to override a specific behavior or tweak a microscopic animation frame, you are forced to fight style scope leaks or library wrappers. Static UI places the source code directly under your cursor.
        </p>
      </div>

      {/* Immediate Action Area */}
      <div className="flex items-center gap-4 mt-6">
        <Link 
          href="/docs/installation" 
          className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white px-4 text-xs font-medium text-black hover:bg-neutral-200 transition-colors"
        >
          Proceed to Installation <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}