"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ExternalLink } from "lucide-react"
import { SearchModal } from "@/components/SearchModal"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { ThemeToggleButton } from "@/components/ThemeToggleButton"
import { Badge } from "@/components/ui/badge"

const sidebarNavigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs" },
      { name: "Installation", href: "/docs/installation" },
      { name: "Theming", href: "/docs/themes" },
      { name: "CLI", href: "/docs/cli" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Accordion", href: "/docs/components/accordion" },
      { name: "Alert", href: "/docs/components/alert" },
      { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
      { name: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
      { name: "Avatar", href: "/docs/components/avatar" },
      { name: "Badge", href: "/docs/components/badge" },
      { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { name: "Button", href: "/docs/components/button" },
      { name: "Calendar", href: "/docs/components/calendar" },
      { name: "Card", href: "/docs/components/card" },
      { name: "Carousel", href: "/docs/components/carousel" },
      { name: "Checkbox", href: "/docs/components/checkbox" },
      { name: "Collapsible", href: "/docs/components/collapsible" },
      { name: "Context Menu", href: "/docs/components/context-menu" },
      { name: "Dialog", href: "/docs/components/dialog" },
      { name: "Drawer", href: "/docs/components/drawer" },
      { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { name: "Hover Card", href: "/docs/components/hover-card" },
      { name: "Input", href: "/docs/components/input" },
      { name: "Input Group", href: "/docs/components/input-group" },
      { name: "Input OTP", href: "/docs/components/input-otp" },
      { name: "Kbd", href: "/docs/components/kbd" },
      { name: "Label", href: "/docs/components/label" },
      { name: "Number Field", href: "/docs/components/number-field" },
      { name: "Pagination", href: "/docs/components/pagination" },
      { name: "Popover", href: "/docs/components/popover" },
      { name: "Progress", href: "/docs/components/progress" },
      { name: "Radio Group", href: "/docs/components/radio-group" },
      { name: "Scroll Area", href: "/docs/components/scroll-area" },
      { name: "Select", href: "/docs/components/select" },
      { name: "Separator", href: "/docs/components/separator" },
      { name: "Sidebar", href: "/docs/components/sidebar" },
      { name: "Skeleton", href: "/docs/components/skeleton" },
      { name: "Slider", href: "/docs/components/slider" },
      { name: "Sonner", href: "/docs/components/sonner" },
      { name: "Spinner", href: "/docs/components/spinner" },
      { name: "Switch", href: "/docs/components/switch" },
      { name: "Table", href: "/docs/components/table" },
      { name: "Tabs", href: "/docs/components/tabs" },
      { name: "Textarea", href: "/docs/components/textarea" },
      { name: "Toast", href: "/docs/components/toast" },
      { name: "Toggle", href: "/docs/components/toggle" },
      { name: "Toggle Group", href: "/docs/components/toggle-group" },
      { name: "Tooltip", href: "/docs/components/tooltip" },
      { name: "Typography", href: "/docs/components/typography" },
    ],
  },
  {
    title: "Blocks",
    items: [
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
    ],
  },
  {
    title: "Templates",
    items: [
      { name: "Overview", href: "/docs/templates" },
      { name: "Marketing", href: "/docs/templates/marketing" },
      { name: "Dashboard", href: "/docs/templates/dashboard" },
      { name: "Auth", href: "/docs/templates/auth" },
    ],
  },
  {
    title: "Themes",
    items: [
      { name: "Overview", href: "/docs/themes" },
      { name: "Green", href: "/docs/themes/green" },
      { name: "Blue", href: "/docs/themes/blue" },
      { name: "Zinc", href: "/docs/themes/zinc" },
      { name: "Slate", href: "/docs/themes/slate" },
      { name: "Gaming", href: "/docs/themes/gaming" },
      { name: "Cyberpunk", href: "/docs/themes/cyberpunk" },
      { name: "Modern", href: "/docs/themes/modern" },
    ],
  },
  {
    title: "Showcase",
    items: [
      { name: "Showcase", href: "/docs/showcase" },
    ],
  },
]

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <div className="space-y-6 text-sm">
      {sidebarNavigation.map((group) => (
        <div key={group.title} className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-chart-2">
            {group.title}
          </h4>
          <ul className="space-y-1 border-l border-border">
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href} className="relative -left-px">
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-1.5 pl-3 text-xs font-medium border-l transition-all",
                      isActive
                        ? "text-primary border-primary bg-card/40 font-semibold"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileSidebarOpen])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              {mobileSidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
            <Link href="/" className="flex items-center gap-1 font-semibold text-foreground">
              <img src="/logo.svg" alt="Static UI" className="h-5 w-auto" />
              Static UI <Badge variant="outline" className="">Docs</Badge>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <Link href="/docs/components" className="transition-colors hover:text-foreground">Components</Link>
            <Link href="/docs/blocks" className="transition-colors hover:text-foreground">Blocks</Link>
            <Link href="/docs/templates" className="transition-colors hover:text-foreground">Templates</Link>
            <Link href="/docs/themes" className="transition-colors hover:text-foreground">Themes</Link>
            <Link href="/docs/showcase" className="transition-colors hover:text-foreground">Showcase</Link>
            <a href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry-staticui.vercel.app"} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              Storybook
            </a>
            <a href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground flex items-center gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              GitHub
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <SearchModal />
            <ThemeSwitcher />
            <ThemeToggleButton />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 overflow-y-auto border-r border-border bg-background p-4 transition-transform duration-200 md:hidden",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Docs Shell Layout Grid */}
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 pt-8">
        {/* Left Scrollable Sidebar Container (Desktop) */}
        <aside className="sticky top-20 hidden h-[calc(100vh-6rem)] overflow-y-auto pb-10 pr-4 md:block custom-sidebar">
          <SidebarContent pathname={pathname} />
        </aside>

        {/* Dynamic Reading Content Canvas */}
        <main className="max-w-3xl pb-16 min-w-0 w-full">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-8 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Static UI. Built open-source for modern developers.</p>
            <div className="flex gap-4">
              <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
              <a href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry-staticui.vercel.app"} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Storybook</a>
              <a href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

