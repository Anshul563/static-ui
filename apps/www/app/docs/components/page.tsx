"use client"

import React from "react"
import { Check, Copy, Terminal } from "lucide-react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/../static-ui/ui/breadcrumb"
import { getCommand } from "@/lib/package-manager"
import { usePackageManager } from "@/lib/package-manager-context"
import { categoryLabels, components } from "@/lib/registry"

function CopyButton({ slug }: { slug: string }) {
  const { packageManager } = usePackageManager()
  const [copied, setCopied] = React.useState(false)
  const command = getCommand("add", packageManager, slug)
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(command)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground hover:text-foreground cursor-pointer"
    >
      {copied ? <Check className="h-2.5 w-2.5 text-primary" /> : <Copy className="h-2.5 w-2.5" />}
      {copied ? "Copied" : command}
    </button>
  )
}

export default function ComponentsListingPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">All Components</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
          Unstyled, accessible primitives. Copy, paste, and fully own every line of code in your
          project.
        </p>
      </div>

      <hr className="border-border my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-muted rounded-xl overflow-hidden border border-border">
        {components.map((c) => (
          <Link
            key={c.slug}
            href={`/docs/components/${c.slug}`}
            className="group relative flex flex-col gap-2 bg-background px-5 py-4 hover:bg-card/80 transition-all duration-200 hover:shadow-[inset_0_0_0_1px_var(--primary)/0.2]"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                {c.name}
              </span>
              <span className="rounded-full border border-border bg-card px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                {categoryLabels[c.category] || c.category}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-relaxed line-clamp-1">
              {c.description}
            </span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                <Terminal className="h-2.5 w-2.5" />
                {c.importPath}
              </span>
              <CopyButton slug={c.slug} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
