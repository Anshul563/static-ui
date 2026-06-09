"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { components } from "@/lib/registry"

const gettingStarted = [
  { name: "Introduction", href: "/docs" },
  { name: "Installation", href: "/docs/installation" },
  { name: "Theming", href: "/docs/themes" },
  { name: "CLI", href: "/docs/cli" },
]

const blocks = [
  { name: "Overview", href: "/docs/blocks" },
  { name: "Dashboard 01", href: "/docs/blocks/dashboard-01" },
  { name: "Dashboard 02", href: "/docs/blocks/dashboard-02" },
  { name: "Login 01", href: "/docs/blocks/login-01" },
  { name: "Login 02", href: "/docs/blocks/login-02" },
  { name: "Pricing 01", href: "/docs/blocks/pricing-01" },
  { name: "Pricing 02", href: "/docs/blocks/pricing-02" },
  { name: "Hero 01", href: "/docs/blocks/hero-01" },
  { name: "Hero 02", href: "/docs/blocks/hero-02" },
  { name: "Feature 01", href: "/docs/blocks/feature-01" },
  { name: "Feature 02", href: "/docs/blocks/feature-02" },
]

const templates = [
  { name: "Overview", href: "/docs/templates" },
  { name: "Marketing", href: "/docs/templates/marketing" },
  { name: "Dashboard", href: "/docs/templates/dashboard" },
  { name: "Auth", href: "/docs/templates/auth" },
]

const themes = [
  { name: "Overview", href: "/docs/themes" },
  { name: "Green", href: "/docs/themes/green" },
  { name: "Blue", href: "/docs/themes/blue" },
  { name: "Zinc", href: "/docs/themes/zinc" },
  { name: "Slate", href: "/docs/themes/slate" },
  { name: "Gaming", href: "/docs/themes/gaming" },
  { name: "Cyberpunk", href: "/docs/themes/cyberpunk" },
  { name: "Modern", href: "/docs/themes/modern" },
]

const showcase = [{ name: "Showcase", href: "/docs/showcase" }]

const developers = [
  { name: "Architecture", href: "/docs/developers/architecture" },
  { name: "Monorepo Structure", href: "/docs/developers/monorepo" },
  { name: "Development Workflow", href: "/docs/developers/workflow" },
  { name: "Contributing", href: "/docs/developers/contributing" },
  { name: "Testing", href: "/docs/developers/testing" },
  { name: "Release Process", href: "/docs/developers/release" },
  { name: "Commit Conventions", href: "/docs/developers/commits" },
  { name: "Versioning", href: "/docs/developers/versioning" },
  { name: "CI/CD", href: "/docs/developers/cicd" },
  { name: "Project Health", href: "/docs/developers/project-health" },
]

function SidebarGroup({
  title,
  items,
  pathname,
}: {
  title: string
  items: { name: string; href: string }[]
  pathname: string
}) {
  return (
    <div>
      <h4 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </h4>
      <ul className="space-y-px">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative block rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-0.5 before:rounded-full before:bg-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function DocsSidebar() {
  const pathname = usePathname()

  const componentNavItems = components.map((c) => ({
    name: c.name,
    href: `/docs/components/${c.slug}`,
  }))

  return (
    <nav className="flex flex-col gap-6 text-sm">
      <SidebarGroup title="Getting Started" items={gettingStarted} pathname={pathname} />

      <div>
        <h4 className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Components
        </h4>
        <div className="max-h-[280px] overflow-y-auto scrollbar-minimal space-y-px">
          {componentNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative block rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold before:absolute before:left-0 before:top-1/4 before:h-1/2 before:w-0.5 before:rounded-full before:bg-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      <SidebarGroup title="Blocks" items={blocks} pathname={pathname} />
      <SidebarGroup title="Templates" items={templates} pathname={pathname} />
      <SidebarGroup title="Themes" items={themes} pathname={pathname} />
      <SidebarGroup title="Showcase" items={showcase} pathname={pathname} />
      <SidebarGroup title="Developers" items={developers} pathname={pathname} />
    </nav>
  )
}
