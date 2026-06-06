"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Command, FileText, Palette, Layout, FileCode, ArrowRight } from "lucide-react"
import fuzzysort from "fuzzysort"
import { trackSearch } from "@/lib/analytics"

interface SearchItem {
  title: string
  description: string
  href: string
  category: "component" | "block" | "template" | "theme" | "page"
}

const searchIndex: SearchItem[] = [
  { title: "Introduction", description: "Get started with Static UI", href: "/docs", category: "page" },
  { title: "Installation", description: "How to install Static UI", href: "/docs/installation", category: "page" },
  { title: "Theming", description: "Customize your theme with CSS variables", href: "/docs/themes", category: "page" },
  { title: "CLI", description: "Command line interface reference", href: "/docs/cli", category: "page" },
  { title: "Showcase", description: "Projects built with Static UI", href: "/docs/showcase", category: "page" },
  ...["Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge", "Breadcrumb", "Button", "Calendar", "Card", "Carousel", "Checkbox", "Collapsible", "Context Menu", "Dialog", "Drawer", "Dropdown Menu", "Hover Card", "Input", "Input Group", "Input OTP", "Kbd", "Label", "Number Field", "Pagination", "Popover", "Progress", "Radio Group", "Scroll Area", "Select", "Separator", "Sidebar", "Skeleton", "Slider", "Sonner", "Spinner", "Switch", "Table", "Tabs", "Textarea", "Toast", "Toggle", "Toggle Group", "Tooltip", "Typography"].map((name) => ({
    title: name,
    description: `${name} component documentation`,
    href: `/docs/components/${name.toLowerCase().replace(/\s+/g, "-")}`,
    category: "component" as const,
  })),
  ...["Dashboard 01", "Dashboard 02", "Login 01", "Login 02", "Pricing 01", "Pricing 02", "Hero 01", "Hero 02", "Feature 01", "Feature 02"].map((name) => ({
    title: name,
    description: `${name} block pattern`,
    href: `/docs/blocks/${name.toLowerCase().replace(/\s+/g, "-")}`,
    category: "block" as const,
  })),
  ...["Marketing", "Dashboard", "Auth"].map((name) => ({
    title: name,
    description: `${name} page template`,
    href: `/docs/templates/${name.toLowerCase()}`,
    category: "template" as const,
  })),
  ...["Green", "Blue", "Zinc", "Slate", "Gaming", "Cyberpunk", "Modern"].map((name) => ({
    title: `${name} Theme`,
    description: `${name} color theme for Static UI`,
    href: `/docs/themes/${name.toLowerCase()}`,
    category: "theme" as const,
  })),
  ...["Ai Chat", "Ai Message", "Ai Prompt", "Ai Code Block", "Ai File Upload", "Ai Chat Layout", "Ai Sidebar", "Ai Conversation"].map((name) => ({
    title: name,
    description: `${name} AI component`,
    href: `/docs/components/${name.toLowerCase().replace(/\s+/g, "-")}`,
    category: "component" as const,
  })),
]

const categoryIcons: Record<string, React.ReactNode> = {
  component: <FileText className="h-3.5 w-3.5 text-blue-400" />,
  block: <Layout className="h-3.5 w-3.5 text-purple-400" />,
  template: <FileCode className="h-3.5 w-3.5 text-amber-400" />,
  theme: <Palette className="h-3.5 w-3.5 text-pink-400" />,
  page: <FileText className="h-3.5 w-3.5 text-green-400" />,
}

export function SearchModal() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery("")
      setResults([])
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!query.trim()) {
      setResults(searchIndex.slice(0, 10))
      setSelectedIndex(0)
      return
    }
    const fuzzy = fuzzysort.go(query, searchIndex, {
      keys: ["title", "description"],
      threshold: -10000,
      limit: 10,
    })
    const matched = fuzzy.map((r) => r.obj)
    setResults(matched)
    setSelectedIndex(0)
  }, [query])

  const navigate = useCallback(
    (item: SearchItem) => {
      trackSearch(query, results.length)
      setOpen(false)
      router.push(item.href)
    },
    [query, results.length, router]
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault()
      navigate(results[selectedIndex])
    }
  }

  useEffect(() => {
    if (listRef.current) {
      const selected = listRef.current.children[selectedIndex] as HTMLElement
      if (selected) selected.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-300 hover:border-neutral-700 transition-colors cursor-pointer"
        aria-label="Search documentation"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search docs...</span>
        <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 text-[9px] font-mono text-neutral-600 ml-2">
          <Command className="h-2.5 w-2.5" />K
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-neutral-800 bg-[#0a0a0a] shadow-2xl shadow-black/60 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-neutral-800 px-4 py-3">
              <Search className="h-4 w-4 text-neutral-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search components, blocks, themes..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
                ESC
              </kbd>
            </div>
            <div ref={listRef} className="max-h-80 overflow-y-auto p-2 space-y-0.5">
              {results.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-neutral-500">
                  <Search className="h-5 w-5" />
                  <p className="text-xs">No results found</p>
                </div>
              ) : (
                results.map((item, index) => (
                  <button
                    key={item.href}
                    onClick={() => navigate(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer ${
                      index === selectedIndex
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                    }`}
                  >
                    <span className="shrink-0">{categoryIcons[item.category]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{item.title}</div>
                      <div className="text-[10px] text-neutral-500 truncate">{item.description}</div>
                    </div>
                    <ArrowRight className="h-3 w-3 text-neutral-600 shrink-0 opacity-0 group-hover:opacity-100" />
                  </button>
                ))
              )}
            </div>
            <div className="border-t border-neutral-800 px-4 py-2 flex items-center gap-4 text-[10px] text-neutral-600">
              <span className="flex items-center gap-1"><kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">↵</kbd> Open</span>
              <span className="flex items-center gap-1"><kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5 font-mono">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
