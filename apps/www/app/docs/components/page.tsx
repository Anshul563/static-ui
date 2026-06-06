"use client"

import React from "react"
import Link from "next/link"
import { Terminal, Copy, Check } from "lucide-react"
import { components, categoryLabels, type RegistryComponent } from "@/lib/registry"

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded border border-neutral-800 bg-neutral-950 px-1.5 py-0.5 text-[9px] font-mono text-neutral-500 hover:text-neutral-300 cursor-pointer"
    >
      {copied ? <Check className="h-2.5 w-2.5 text-[#22c55e]" /> : <Copy className="h-2.5 w-2.5" />}
      {copied ? "Copied" : "npx @static-ui/cli add"}
    </button>
  )
}

export default function ComponentsListingPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Components</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          All Components
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
          Unstyled, accessible primitives. Copy, paste, and fully own every
          line of code in your project.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-900 rounded-xl overflow-hidden border border-neutral-900">
        {components.map((c) => (
          <Link
            key={c.slug}
            href={`/docs/components/${c.slug}`}
            className="group relative flex flex-col gap-2 bg-[#030303] px-5 py-4 hover:bg-neutral-950/80 transition-all duration-200 hover:shadow-[inset_0_0_0_1px_#22c55e33]"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white group-hover:text-[#22c55e] transition-colors duration-200">
                {c.name}
              </span>
              <span className="rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-neutral-500">
                {categoryLabels[c.category] || c.category}
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 leading-relaxed line-clamp-1">
              {c.description}
            </span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700">
                <Terminal className="h-2.5 w-2.5" />
                {c.importPath}
              </span>
              <CopyButton text={`npx @static-ui/cli add ${c.slug}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
