"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, GitPullRequest, Shield } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { categoryLabels, registryBySlug } from "@/lib/registry"
import Image from "next/image"

const pageOrder = [
  "/docs",
  "/docs/installation",
  "/docs/themes",
  "/docs/cli",
  "/docs/components",
  "/docs/components/accordion",
  "/docs/components/alert",
  "/docs/components/alert-dialog",
  "/docs/components/aspect-ratio",
  "/docs/components/avatar",
  "/docs/components/badge",
  "/docs/components/breadcrumb",
  "/docs/components/button",
  "/docs/components/calendar",
  "/docs/components/card",
  "/docs/components/carousel",
  "/docs/components/checkbox",
  "/docs/components/collapsible",
  "/docs/components/context-menu",
  "/docs/components/dialog",
  "/docs/components/drawer",
  "/docs/components/dropdown-menu",
  "/docs/components/hover-card",
  "/docs/components/input",
  "/docs/components/input-group",
  "/docs/components/input-otp",
  "/docs/components/kbd",
  "/docs/components/label",
  "/docs/components/number-field",
  "/docs/components/pagination",
  "/docs/components/popover",
  "/docs/components/progress",
  "/docs/components/radio-group",
  "/docs/components/scroll-area",
  "/docs/components/select",
  "/docs/components/separator",
  "/docs/components/sidebar",
  "/docs/components/skeleton",
  "/docs/components/slider",
  "/docs/components/sonner",
  "/docs/components/spinner",
  "/docs/components/switch",
  "/docs/components/table",
  "/docs/components/tabs",
  "/docs/components/textarea",
  "/docs/components/toast",
  "/docs/components/toggle",
  "/docs/components/toggle-group",
  "/docs/components/tooltip",
  "/docs/components/typography",
  "/docs/blocks",
  "/docs/blocks/dashboard-01",
  "/docs/blocks/dashboard-02",
  "/docs/blocks/login-01",
  "/docs/blocks/login-02",
  "/docs/blocks/pricing-01",
  "/docs/blocks/pricing-02",
  "/docs/blocks/hero-01",
  "/docs/blocks/hero-02",
  "/docs/blocks/feature-01",
  "/docs/blocks/feature-02",
  "/docs/templates",
  "/docs/templates/marketing",
  "/docs/templates/dashboard",
  "/docs/templates/auth",
  "/docs/themes/green",
  "/docs/themes/blue",
  "/docs/themes/zinc",
  "/docs/themes/slate",
  "/docs/themes/gaming",
  "/docs/themes/cyberpunk",
  "/docs/themes/modern",
  "/docs/showcase",
  "/docs/developers/architecture",
  "/docs/developers/monorepo",
  "/docs/developers/workflow",
  "/docs/developers/contributing",
  "/docs/developers/testing",
  "/docs/developers/release",
  "/docs/developers/commits",
  "/docs/developers/versioning",
  "/docs/developers/cicd",
  "/docs/developers/project-health",
]

const pageLabels: Record<string, string> = {
  "/docs": "Introduction",
  "/docs/installation": "Installation",
  "/docs/themes": "Themes",
  "/docs/cli": "CLI",
  "/docs/components": "Components",
  "/docs/blocks": "Blocks",
  "/docs/templates": "Templates",
  "/docs/showcase": "Showcase",
}

function useActiveHeading(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>(
      "main h2, main h3, [data-doc-content] h2, [data-doc-content] h3"
    )

    if (!headings.length) {
      setActiveId(null)
      return
    }

    headings.forEach((h, i) => {
      if (!h.id) {
        h.id = `heading-${i}`
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    )

    headings.forEach((h) => observer.observe(h))

    return () => observer.disconnect()
  }, [])

  return activeId
}

function useHeadings() {
  const [headings, setHeadings] = useState<{ id: string; label: string; level: number }[]>([])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      "main h2, main h3, [data-doc-content] h2, [data-doc-content] h3"
    )

    const result = Array.from(els).map((h, i) => {
      if (!h.id) h.id = `heading-${i}`
      return {
        id: h.id,
        label: h.textContent || "",
        level: h.tagName === "H3" ? 3 : 2,
      }
    })

    setHeadings(result)
  }, [])

  return headings
}

function getPageLabel(path: string): string {
  if (pageLabels[path]) return pageLabels[path]

  const slugMatch = path.match(/\/docs\/(components|blocks|templates|themes)\/(.+)/)
  if (slugMatch) {
    const [, section, slug] = slugMatch
    if (section === "components") {
      const entry = registryBySlug[slug]
      if (entry) return entry.name
    }
    return slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  }

  const devMatch = path.match(/\/docs\/developers\/(.+)/)
  if (devMatch) {
    return devMatch[1]
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  }

  return "Page"
}

export function DocsRightPanel() {
  const pathname = usePathname()
  const headings = useHeadings()
  const activeId = useActiveHeading()

  const currentIdx = pageOrder.indexOf(pathname)
  const prevPage = currentIdx > 0 ? pageOrder[currentIdx - 1] : null
  const nextPage = currentIdx < pageOrder.length - 1 ? pageOrder[currentIdx + 1] : null

  const componentSlug = pathname.match(/^\/docs\/components\/(.+)/)?.[1]
  const regEntry = componentSlug ? registryBySlug[componentSlug] : null

  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"
  const editUrl = `${githubUrl}/edit/main/apps/www/app${pathname === "/docs" ? "/docs/page" : pathname}/page.tsx`
  const issueUrl = `${githubUrl}/issues/new?title=${encodeURIComponent(`Docs: ${getPageLabel(pathname)}`)}`

  return (
    <aside className="hidden lg:block w-65 shrink-0">
      <div className="sticky top-20 flex flex-col gap-6 py-8 scrollbar-minimal" style={{ maxHeight: "calc(100vh - 5rem)", overflowY: "auto" }}>
        {headings.length > 0 && (
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              On This Page
            </h4>
            <ul className="space-y-1">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={cn(
                      "block text-[12px] leading-relaxed transition-colors",
                      h.level === 3 && "pl-3",
                      activeId === h.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById(h.id)
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    }}
                  >
                    {h.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border" />

        {(prevPage || nextPage) && (
          <div>
            <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Navigation
            </h4>
            <div className="space-y-1">
              {prevPage && (
                <Link
                  href={prevPage}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <ChevronLeft className="h-3 w-3 shrink-0" />
                  <span className="truncate">{getPageLabel(prevPage)}</span>
                </Link>
              )}
              {nextPage && (
                <Link
                  href={nextPage}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                >
                  <span className="truncate">{getPageLabel(nextPage)}</span>
                  <ChevronRight className="h-3 w-3 shrink-0" />
                </Link>
              )}
            </div>
          </div>
        )}

        {regEntry && (
          <>
            <div className="border-t border-border" />
            <div>
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Component Info
              </h4>
              <div className="space-y-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="text-foreground font-medium">
                    {categoryLabels[regEntry.category] || regEntry.category}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1 text-green-500 font-medium">
                    <Shield className="h-3 w-3" />
                    Stable
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Framework</span>
                  <span className="text-foreground font-medium">React</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border" />
            <div>
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Package
              </h4>
              <div className="flex items-center justify-between rounded-md border border-border bg-card px-2.5 py-1.5">
                <code className="text-[11px] font-mono text-foreground">{regEntry.importPath}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(regEntry.importPath)}
                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </>
        )}

        <div className="border-t border-border" />
        <div>
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Contribute
          </h4>
          <ul className="space-y-1">
            <li>
              <a
                href={issueUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <GitPullRequest className="h-3 w-3 shrink-0" />
                Report an issue
              </a>
            </li>
            <li>
              <a
                href={`${githubUrl}/discussions`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={12}
                  height={12}
                  className="shrink-0"
                />
                Request a feature
              </a>
            </li>
            <li>
              <a
                href={editUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                Edit this page
              </a>
            </li>
          </ul>
        </div>

        <div className="border-t border-border" />
        <div>
          <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Resources
          </h4>
          <ul className="space-y-1">
            <li>
              <a
                href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry.staticui.online"}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                Storybook
              </a>
            </li>
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                GitHub
              </a>
            </li>
            <li>
              <Link
                href="/docs"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
              >
                <ExternalLink className="h-3 w-3 shrink-0" />
                Documentation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
