"use client"

import {
  Accessibility,
  ChevronRight,
  Layers,
  Package,
  Terminal,
  Wrench,
} from "lucide-react"
import { notFound } from "next/navigation"
import { CommandBlock } from "@/components/docs/CommandBlock"
import { Badge } from "@/../static-ui/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/../static-ui/ui/breadcrumb"
import { Card } from "@/../static-ui/ui/card"
import { categoryLabels, getRelatedComponents, registryBySlug } from "@/lib/registry"
import { ComponentPreview } from "@/components/docs/ComponentPreview"
import { componentMeta } from "@/lib/component-meta"

const INSTALLED_SLUGS = new Set([
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "avatar",
  "badge",
  "breadcrumb",
  "button",
  "calendar",
  "card",
  "carousel",
  "checkbox",
  "collapsible",
  "context-menu",
  "dialog",
  "drawer",
  "dropdown-menu",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "kbd",
  "label",
  "number-field",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "scroll-area",
  "select",
  "separator",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toast",
  "toggle",
  "toggle-group",
  "tooltip",
  "typography",
])

export default function ComponentDetailClient({
  slug,
  source,
}: {
  slug: string
  source: string | null
}) {
  const meta = componentMeta[slug]
  const regEntry = registryBySlug[slug]

  if (!meta || !regEntry) return notFound()

  const isInstalled = INSTALLED_SLUGS.has(slug)
  const related = getRelatedComponents(slug)
  const accessibility = meta.accessibility
  const props = meta.props

  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{meta.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">{meta.name}</h1>
          <Badge variant="outline" className="text-xs">
            {categoryLabels[regEntry.category] || regEntry.category}
          </Badge>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {meta.description}
        </p>
      </div>

      {isInstalled ? (
        <ComponentPreview slug={slug} source={source} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-1">
            <div className="flex gap-4 text-xs font-medium">
              <span className="pb-2 border-b-2 border-primary text-primary font-semibold">
                Preview
              </span>
            </div>
          </div>
          <Card className="bg-background min-h-75 flex-row items-center justify-center p-6 relative bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
            <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
              <p className="text-xs font-medium text-muted-foreground">
                Component not yet installed
              </p>
              <p className="text-[10px] text-muted-foreground">
                Use the CLI command below to add it to your project
              </p>
            </div>
          </Card>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Terminal className="h-4 w-4 text-primary" />
          Installation
        </h3>
        <p className="text-xs text-muted-foreground">
          Run the following command to add this component to your project:
        </p>
        <CommandBlock type="add" slug={slug} />
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Package className="h-4 w-4 text-primary" />
          Import
        </h3>
        <p className="text-xs text-muted-foreground">
          Import the component directly from the package:
        </p>
        <Card className="bg-card/80 p-3 pl-4 max-w-xl flex-row items-center justify-between">
          <code className="font-mono text-xs text-foreground">
            {`import { ${meta.name.replace(/\s+/g, "")} } from "@static-ui/ui"`}
          </code>
        </Card>
      </div>

      <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
          <Wrench className="h-4 w-4 text-primary" />
          API Reference
        </h3>
        <p className="text-xs text-muted-foreground">Common props available for this component:</p>
        <Card className="block p-0">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border bg-card/50">
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Prop</th>
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Type</th>
                <th className="text-left px-4 py-2.5 font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              {props.map((prop) => (
                <tr key={prop.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 font-mono text-[11px] text-primary">{prop.name}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-chart-2">{prop.type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {regEntry.dependencies.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Package className="h-4 w-4 text-primary" />
            Dependencies
          </h3>
          <ul className="flex flex-wrap gap-2">
            {regEntry.dependencies.map((dep: string) => (
              <li
                key={dep}
                className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-mono text-muted-foreground"
              >
                {dep}
              </li>
            ))}
          </ul>
        </div>
      )}

      {accessibility && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Accessibility className="h-4 w-4 text-primary" />
            Accessibility
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{accessibility}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground tracking-tight">
            <Layers className="h-4 w-4 text-primary" />
            Related Components
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {related.map((rel) => (
              <Card
                key={rel.slug}
                size="sm"
                className="group flex-row items-center justify-between bg-card/60 px-4 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {rel.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{rel.description}</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
