import React from "react"
import { Terminal, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Introduction",
  description: "Beautifully designed component primitives that you can copy, paste, and completely control inside your applications.",
  path: "/docs",
})

export default function DocsIntroductionPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Getting Started</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Introduction</h1>
        <p className="text-lg text-neutral-400 leading-relaxed">
          Beautifully designed component primitives that you can copy, paste, and completely control inside your applications.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="space-y-4 text-sm leading-relaxed text-neutral-400">
        <p>
          Static UI is a modern, unstyled component library built on top of <strong className="text-white">Base UI</strong> and styled with <strong className="text-white">Tailwind CSS v4</strong>.
          Every component is designed to be copied, pasted, and fully customized — giving you complete control over your codebase.
        </p>

        <p>
          Unlike traditional component libraries that ship as npm dependencies with locked-in styles,
          Static UI gives you the source code directly. You own every line, can modify every style,
          and never worry about breaking changes from upstream updates.
        </p>

        <div className="rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-6 backdrop-blur-md mt-6">
          <div className="flex items-start gap-4">
            <Terminal className="h-5 w-5 text-[#22c55e] mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-white">Quick Start</h3>
              <p className="text-xs text-neutral-500">
                Initialize Static UI in your project with a single command:
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-[#030303] px-4 py-2.5 font-mono text-sm text-neutral-300">
                npx @static-ui/cli init
              </div>
              <p className="text-xs text-neutral-500">
                Then add any component: <code className="text-[#22c55e]">npx @static-ui/cli add button</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/installation"
          className="group flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-5 hover:border-neutral-800 transition-all"
        >
          <div>
            <h3 className="text-sm font-medium text-white">Installation</h3>
            <p className="mt-1 text-xs text-neutral-500">Set up Static UI in your project</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-[#22c55e] transition-colors" />
        </Link>
        <Link
          href="/docs/components"
          className="group flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-5 hover:border-neutral-800 transition-all"
        >
          <div>
            <h3 className="text-sm font-medium text-white">Components</h3>
            <p className="mt-1 text-xs text-neutral-500">Browse the component library</p>
          </div>
          <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-[#22c55e] transition-colors" />
        </Link>
      </div>
    </div>
  )
}
