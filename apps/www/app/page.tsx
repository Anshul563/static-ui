"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Terminal, ArrowRight, Layers, Cpu, ShieldCheck, Check, Copy, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText("npx @static-ui/cli init")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#030303] text-neutral-200 selection:bg-[#22c55e]/30 selection:text-[#22c55e] overflow-x-hidden">
      
      {/* Decorative Grid Background Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-900 bg-[#030303]/70 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white tracking-tight text-lg">
            <img src="/logo.svg" alt="Static UI" className="h-5 w-auto" />
            Static UI
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <Link href="/docs" className="transition-colors hover:text-white">Documentation</Link>
            <Link href="/docs/components" className="transition-colors hover:text-white">Components</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">GitHub</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-neutral-400 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-900 bg-[#030303] px-6 py-4 space-y-3 flex flex-col text-sm font-medium">
            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white py-1">Documentation</Link>
            <Link href="/docs/components" onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-white py-1">Components</Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white py-1">GitHub</a>
          </div>
        )}
      </header>

      {/* Hero Core Segment */}
      <main className="relative mx-auto max-w-5xl px-6 pt-24 pb-24 text-center lg:pt-36">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/40 px-3 py-1 text-xs font-medium text-[#22c55e] backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          Powered by Base UI & Tailwind v4
        </div>
        
        {/* Headline */}
        <h1 className="mt-8 text-4xl font-medium tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.15]">
          Build interfaces with <br />
          <span className="bg-gradient-to-r from-[#22c55e] via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
            absolute source control.
          </span>
        </h1>
        
        {/* Paragraph */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg leading-relaxed">
          An atomic, unstyled component engine. Copy, paste, and fully customize raw component blueprints directly inside your layout workspaces. No rigid package dependencies.
        </p>

        {/* Interactive Interactive Clipboard Executor */}
        <div className="mx-auto mt-10 max-w-sm">
          <div className="flex items-center justify-between rounded-xl border border-neutral-800 bg-[#0a0a0a]/80 p-2.5 pl-4 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:border-neutral-700 transition-colors group">
            <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-neutral-300">
              <Terminal className="h-4 w-4 text-[#22c55e]" />
              <span className="select-all">npx @static-ui/cli init</span>
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center h-8 w-16 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white cursor-pointer transition-all active:scale-95"
              aria-label="Copy initialization command"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-[#22c55e]" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white transition-colors" />
              )}
            </button>
          </div>
        </div>

        {/* CTA Anchors */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/docs" className="w-full sm:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 transition-colors shadow-lg">
            Read Documentation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/docs" className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950 px-6 text-sm font-medium text-neutral-300 hover:bg-neutral-900 transition-colors">
            Browse Primitives
          </Link>
        </div>

        {/* Technical Value Pillars Grid Layout */}
        <section className="mt-32 grid gap-6 sm:grid-cols-3 text-left relative z-10">
          
          <div className="group rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-6 backdrop-blur-md hover:border-neutral-800 transition-all">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 w-fit mb-4 group-hover:border-[#22c55e]/30 transition-colors">
              <Layers className="h-5 w-5 text-[#22c55e]" />
            </div>
            <h3 className="text-sm font-medium text-white">Unstyled Core</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Built over clean Base UI logic controllers. Complete design token flexibility with zero rigid component style overrides.
            </p>
          </div>

          <div className="group rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-6 backdrop-blur-md hover:border-neutral-800 transition-all">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 w-fit mb-4 group-hover:border-[#22c55e]/30 transition-colors">
              <Cpu className="h-5 w-5 text-[#22c55e]" />
            </div>
            <h3 className="text-sm font-medium text-white">Tailwind v4 Optimized</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Zero runtime overhead. Leverages the high-performance native CSS compilation pipeline for instantaneous rendering trees.
            </p>
          </div>

          <div className="group rounded-xl border border-neutral-900 bg-[#0a0a0a]/40 p-6 backdrop-blur-md hover:border-neutral-800 transition-all">
            <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 w-fit mb-4 group-hover:border-[#22c55e]/30 transition-colors">
              <ShieldCheck className="h-5 w-5 text-[#22c55e]" />
            </div>
            <h3 className="text-sm font-medium text-white">Strictly Accessible</h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Full compliance with ARIA patterns out of the box. Keyboard routing and screen reader focus trees handled flawlessly.
            </p>
          </div>

        </section>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-neutral-900 bg-[#030303] py-6 text-center text-xs text-neutral-600">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Static UI. Built open-source for modern developers.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  )
}