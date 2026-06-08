import React, { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { SearchModal } from "./SearchModal"
import { ThemeToggleButton } from "./ThemeToggleButton"
import { Badge } from "./ui/badge"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-foreground tracking-tight text-lg"
          >
            <img src="/logo.svg" alt="Static UI" className="h-5 w-auto" />
            Static UI{" "}
            <Badge variant="outline" className="ml-1">
              v0.1.0
            </Badge>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex gap-5">
              <Link href="/docs" className="transition-colors hover:text-foreground">
                Docs
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
            </div>
            <div className="h-4 w-px rounded-2xl bg-gray-300" />
            <SearchModal />
            <div className="h-4 w-px rounded-2xl bg-gray-300" />
            <ThemeToggleButton />
            <div className="h-4 w-px rounded-2xl bg-gray-300" />
            <div className="flex gap-2">
              <a
                href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry.staticui.online"}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                <img src="/icons/storybook.svg" alt="Static UI" className="h-5 w-auto" />
              </a>
              <div className="h-4 w-px rounded-2xl bg-gray-300" />
              <a
                href={
                  process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"
                }
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-foreground"
              >
                <img src="/icons/github.svg" alt="Static UI" className="h-5 w-auto" />
              </a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border bg-background px-6 py-4 space-y-3 flex flex-col text-sm font-medium">
            <Link
              href="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Docs
            </Link>
            <Link
              href="/docs/components"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Components
            </Link>
            <Link
              href="/docs/blocks"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Blocks
            </Link>
            <Link
              href="/docs/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Templates
            </Link>
            <Link
              href="/docs/themes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Themes
            </Link>
            <a
              href={process.env.NEXT_PUBLIC_STORYBOOK_URL || "https://registry.staticui.online"}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Storybook
            </a>
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground py-1"
            >
              GitHub
            </a>
          </div>
        )}
      </header>
    </div>
  )
}
