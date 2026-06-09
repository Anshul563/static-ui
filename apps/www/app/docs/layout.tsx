"use client"

import React, { useEffect, useState } from "react"
import { ExternalLink, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/../static-ui/ui/badge"
import { DocsRightPanel } from "@/components/docs/DocsRightPanel"
import { DocsSidebar } from "@/components/docs/DocsSidebar"
import { SearchModal } from "@/components/SearchModal"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { ThemeToggleButton } from "@/components/ThemeToggleButton"
import { cn } from "@/lib/utils"

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
              {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <Link href="/" className="flex items-center gap-1 font-semibold text-foreground">
              <Image
                src="/logo.svg"
                alt="Static UI"
                width={20}
                height={20}
                className="h-5 w-auto"
              />
              Static UI{" "}
              <Badge variant="outline" className="">
                Docs
              </Badge>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/docs/components" className="transition-colors hover:text-foreground">
              Components
            </Link>
            <Link href="/docs/blocks" className="transition-colors hover:text-foreground">
              Blocks
            </Link>
            <Link href="/docs/templates" className="transition-colors hover:text-foreground">
              Templates
            </Link>
            <Link href="/docs/themes" className="transition-colors hover:text-foreground">
              Themes
            </Link>
            <Link href="/docs/showcase" className="transition-colors hover:text-foreground">
              Showcase
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry.staticui.online"}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground flex items-center gap-1"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Storybook
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground flex items-center gap-1"
            >
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
        <DocsSidebar />
      </aside>

      {/* 3-Column Layout */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr_260px] gap-8 pt-8">
          {/* Left Sidebar (Desktop) */}
          <aside
            className="sticky top-20 hidden md:block self-start scrollbar-minimal"
            style={{ maxHeight: "calc(100vh - 5rem)", overflowY: "auto" }}
          >
            <DocsSidebar />
          </aside>

          {/* Main Content */}
          <main className="min-w-0 w-full pb-16">{children}</main>

          {/* Right Panel */}
          <DocsRightPanel />
        </div>
      </div>
    </div>
  )
}
