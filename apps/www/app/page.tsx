"use client"

import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  FileUp,
  Layout,
  MessageSquare,
  Monitor,
  Palette,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { FrameworkSection } from "@/components/FrameworkSection"
import Navbar from "@/components/Navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 text-primary shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg
      className="h-4 w-4 text-muted-foreground/40 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

const comparisonData = [
  { feature: "Multi-Framework", us: true, them: false },
  { feature: "AI Components", us: true, them: false },
  { feature: "Themes", us: true, them: false },
  { feature: "Templates", us: true, them: false },
  { feature: "Registry", us: true, them: true },
  { feature: "CLI Detection", us: true, them: false },
  { feature: "Open Source", us: true, them: true },
  { feature: "Component Ownership", us: true, them: true },
]

const aiComponents = [
  {
    title: "AI Chat",
    description: "Streaming chat interface with markdown and code rendering.",
    icon: MessageSquare,
    gradient: "from-emerald-500/20 to-teal-500/5",
    install: "npx @static-ui/cli add ai-chat",
  },
  {
    title: "AI Sidebar",
    description: "Context-aware sidebar for AI-assisted workflows.",
    icon: Layout,
    gradient: "from-blue-500/20 to-indigo-500/5",
    install: "npx @static-ui/cli add ai-sidebar",
  },
  {
    title: "AI Prompt",
    description: "Prompt input with history, suggestions, and shortcuts.",
    icon: Terminal,
    gradient: "from-purple-500/20 to-pink-500/5",
    install: "npx @static-ui/cli add ai-prompt",
  },
  {
    title: "AI Message",
    description: "Structured message components with role-based styling.",
    icon: Bot,
    gradient: "from-amber-500/20 to-orange-500/5",
    install: "npx @static-ui/cli add ai-message",
  },
  {
    title: "AI File Upload",
    description: "Drag-and-drop file upload with progress and preview.",
    icon: FileUp,
    gradient: "from-rose-500/20 to-red-500/5",
    install: "npx @static-ui/cli add ai-file-upload",
  },
  {
    title: "AI Code Block",
    description: "Syntax-highlighted code blocks with copy and expand.",
    icon: Code2,
    gradient: "from-cyan-500/20 to-teal-500/5",
    install: "npx @static-ui/cli add ai-code-block",
  },
]

const templates = [
  {
    name: "Marketing",
    slug: "marketing",
    description: "Landing pages, feature sections, pricing tables.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Dashboard",
    slug: "dashboard",
    description: "Analytics, metrics, data tables, and charts.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    name: "Auth",
    slug: "auth",
    description: "Login, signup, password reset, and OAuth flows.",
    color: "from-purple-500 to-pink-600",
  },
  {
    name: "Future Templates",
    slug: "",
    description: "E-commerce, blog, admin panel, and more coming soon.",
    color: "from-neutral-500 to-neutral-600",
  },
]

const themes = [
  { name: "Green", slug: "green", gradient: "from-emerald-500 to-teal-600" },
  { name: "Blue", slug: "blue", gradient: "from-blue-500 to-indigo-600" },
  { name: "Slate", slug: "slate", gradient: "from-slate-500 to-slate-700" },
  { name: "Zinc", slug: "zinc", gradient: "from-zinc-500 to-zinc-700" },
  {
    name: "Modern",
    slug: "modern",
    gradient: "from-violet-500 to-fuchsia-600",
  },
  { name: "Gaming", slug: "gaming", gradient: "from-rose-500 to-amber-600" },
  {
    name: "Cyberpunk",
    slug: "cyberpunk",
    gradient: "from-cyan-500 to-pink-600",
  },
]

export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState("green")
  const [copiedCommands, setCopiedCommands] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedCommands((prev) => ({ ...prev, [key]: true }))
    setTimeout(() => setCopiedCommands((prev) => ({ ...prev, [key]: false })), 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-20 overflow-hidden">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent)] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Badge variant="outline" className="mb-6 px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse mr-2 inline-block" />
            Open-Source Component Library
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[0.7]">
            Build <span className="text-primary italic">modern</span> applications <br />{" "}
            <span className="text-3xl mb-2">with</span> <br />
            <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold mt-2">
              complete code ownership
            </span>
            <span className="text-foreground">.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Open-source components, AI-ready blocks, themes, templates, and multi-framework support
            for modern developers.
          </p>

          <div className="mx-auto mt-8 max-w-sm">
            <Card className="flex-row items-center justify-between p-2.5 pl-4 bg-card/80 backdrop-blur-md transition-colors group border border-border/50">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-foreground">
                <Terminal className="h-4 w-4 text-primary shrink-0" />
                <span className="select-all">npx @static-ui/cli init</span>
              </div>
              <button
                onClick={() => handleCopy("npx @static-ui/cli init", "hero")}
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted border border-border hover:bg-accent text-foreground cursor-pointer transition-all active:scale-95"
                aria-label="Copy initialization command"
              >
                {copiedCommands["hero"] ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </button>
            </Card>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => router.push("/docs")}
              size="lg"
              className="group text-base h-11 px-6"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/docs/components")}
              size="lg"
              className="text-base h-11 px-6"
            >
              Browse Components
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 max-w-3xl mx-auto">
            <AnimatedCounter end={50} suffix="+" label="Components" />
            <AnimatedCounter end={10} suffix="+" label="Blocks" />
            <AnimatedCounter end={7} suffix="" label="Themes" />
            <AnimatedCounter end={8} suffix="" label="Frameworks" />
            <AnimatedCounter end={1} label="MIT Licensed" />
            <AnimatedCounter end={1} label="Open Source" />
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_100%,color-mix(in_oklch,var(--primary)_5%,transparent),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3 w-3 mr-1.5 inline-block" />
              Component Ecosystem
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              See Static UI{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                in Action
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Production-ready components that you can copy, paste, and fully own. No dependencies.
              No black boxes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="bento-card md:col-span-2 md:row-span-2 p-6 bg-linear-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Layout className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Dashboard Widget</h3>
                  <p className="text-xs text-muted-foreground">Analytics overview card</p>
                </div>
              </div>
              <div className="rounded-lg bg-card border border-border/50 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Total Revenue</span>
                  <span className="text-xs text-primary font-mono">+12.5%</span>
                </div>
                <div className="text-2xl font-bold text-foreground">$45,231.89</div>
                <div className="h-16 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary/20 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </Card>

            <Card className="bento-card p-6 bg-linear-to-br from-blue-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Monitor className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Dialog</h3>
              </div>
              <div className="rounded-lg border border-border/50 p-3 text-center">
                <div className="mx-auto h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground">Confirm Action</p>
                <p className="text-[10px] text-muted-foreground mt-1">Are you sure?</p>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 h-7 rounded-md bg-muted text-[10px] flex items-center justify-center text-muted-foreground">
                    Cancel
                  </div>
                  <div className="flex-1 h-7 rounded-md bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                    Confirm
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bento-card p-6 bg-linear-to-br from-purple-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Terminal className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Select</h3>
              </div>
              <div className="space-y-2">
                <div className="h-8 rounded-md border border-border/50 flex items-center px-3 text-xs text-muted-foreground bg-muted/30">
                  Choose option...
                  <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  {["Option A", "Option B", "Option C"].map((opt) => (
                    <div
                      key={opt}
                      className="h-7 rounded-md px-3 text-xs flex items-center text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bento-card p-6 bg-linear-to-br from-amber-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-amber-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Sidebar</h3>
              </div>
              <div className="space-y-1.5">
                {["Dashboard", "Analytics", "Settings", "Help"].map((item) => (
                  <div
                    key={item}
                    className={`h-7 rounded-md px-3 text-xs flex items-center ${item === "Dashboard" ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground"} transition-colors`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bento-card p-6 bg-linear-to-br from-rose-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                  <Star className="h-4 w-4 text-rose-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Card</h3>
              </div>
              <div className="rounded-lg border border-border/50 p-3 space-y-2">
                <div className="text-xs font-medium text-foreground">Beautiful Card</div>
                <div className="text-[10px] text-muted-foreground">
                  With description and action.
                </div>
                <div className="h-7 rounded-md bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
                  Action
                </div>
              </div>
            </Card>

            <Card className="bento-card p-6 bg-linear-to-br from-emerald-500/5 to-transparent">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Cpu className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">Button</h3>
              </div>
              <div className="space-y-2">
                <div className="h-7 rounded-md bg-primary text-xs flex items-center justify-center text-primary-foreground">
                  Primary
                </div>
                <div className="h-7 rounded-md border border-border/50 text-xs flex items-center justify-center text-foreground">
                  Secondary
                </div>
                <div className="h-7 rounded-md text-xs flex items-center justify-center text-muted-foreground border border-dashed border-border/50">
                  Ghost
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Components */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,color-mix(in_oklch,var(--primary)_5%,transparent),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Bot className="h-3 w-3 mr-1.5 inline-block" />
              AI-Ready
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              Built for{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                AI Products
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Launch AI applications faster with production-ready AI components. Chat, prompts,
              streams, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiComponents.map((ai) => {
              const Icon = ai.icon
              const copyKey = `ai-${ai.title}`
              return (
                <Card key={ai.title} className="bento-card group bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div
                        className={`h-10 w-10 rounded-xl bg-linear-to-br ${ai.gradient} flex items-center justify-center ring-1 ring-foreground/5`}
                      >
                        <Icon className="h-5 w-5 text-foreground" />
                      </div>
                      <Badge variant="outline" className="text-[10px] px-2 py-0 h-5">
                        New
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{ai.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {ai.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-muted/50 border border-border/50 px-3 py-2 font-mono text-[11px] text-muted-foreground group-hover:border-primary/20 transition-colors">
                      <span className="text-primary shrink-0">$</span>
                      <span className="truncate flex-1">{ai.install}</span>
                      <button
                        onClick={() => handleCopy(ai.install, copyKey)}
                        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        {copiedCommands[copyKey] ? (
                          <Check className="h-3 w-3 text-primary" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative py-20 lg:py-28">
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <ShieldCheck className="h-3 w-3 mr-1.5 inline-block" />
              Why Static UI?
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              Why choose{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                Static UI
              </span>
              ?
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              We believe in complete component ownership. No lock-in, no hidden dependencies, just
              clean code that belongs to you.
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="comparison-table w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left">Feature</th>
                    <th className="text-center">
                      <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                        Static UI
                      </span>
                    </th>
                    <th className="text-center text-muted-foreground">shadcn/ui</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="hover:bg-muted/20 transition-colors">
                      <td className="font-medium text-foreground">{row.feature}</td>
                      <td className="text-center">
                        <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10">
                          {row.us ? <CheckIcon /> : <MinusIcon />}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-muted">
                          {row.them ? <CheckIcon /> : <MinusIcon />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Framework Section */}
      <FrameworkSection />

      {/* Templates */}
      <section className="relative py-20 lg:py-28">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Layout className="h-3 w-3 mr-1.5 inline-block" />
              Production Ready
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              Production{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                Templates
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Full-page templates built with Static UI components. Copy, customize, and deploy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((tmpl) => (
              <Card
                key={tmpl.name}
                className="bento-card group bg-card/50 backdrop-blur-sm overflow-hidden"
              >
                <div
                  className={`h-32 bg-linear-to-br ${tmpl.color} flex items-center justify-center`}
                >
                  <Layout className="h-10 w-10 text-white/30" />
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground">{tmpl.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div className="flex gap-2 pt-1">
                    {tmpl.slug ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() => router.push(`/docs/templates/${tmpl.slug}`)}
                        >
                          View Template
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                          onClick={() =>
                            handleCopy(`npx @static-ui/cli add ${tmpl.slug}`, `tmpl-${tmpl.slug}`)
                          }
                        >
                          {copiedCommands[`tmpl-${tmpl.slug}`] ? "Copied!" : "Install"}
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 text-muted-foreground"
                        disabled
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Gallery */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_100%,color-mix(in_oklch,var(--primary)_5%,transparent),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Palette className="h-3 w-3 mr-1.5 inline-block" />7 Themes
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              Theme{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                Marketplace
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Choose from 7 handcrafted themes. Install with a single command.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {themes.map((theme) => (
              <button
                key={theme.slug}
                onClick={() => setActiveTheme(theme.slug)}
                className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTheme === theme.slug
                    ? "bg-foreground text-background shadow-lg"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full bg-linear-to-br ${theme.gradient} mr-2`}
                />
                {theme.name}
              </button>
            ))}
          </div>

          <Card className="overflow-hidden">
            <div
              className={`h-48 sm:h-64 bg-linear-to-br ${themes.find((t) => t.slug === activeTheme)?.gradient} flex items-center justify-center`}
            >
              <div className="text-center">
                <Palette className="h-12 w-12 text-white/30 mx-auto mb-3" />
                <p className="text-white/70 text-sm font-mono">
                  {themes.find((t) => t.slug === activeTheme)?.name} Theme
                </p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground capitalize">
                  {activeTheme} Theme
                </p>
                <p className="text-xs text-muted-foreground">
                  npx @static-ui/cli init --theme {activeTheme}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => router.push(`/docs/themes/${activeTheme}`)}
              >
                Preview Theme
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-20 lg:py-28">
        <div className="relative mx-auto max-w-4xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
              <Star className="h-3 w-3 mr-1.5 inline-block" />
              Community
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
              Trusted by modern{" "}
              <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                developers
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card className="bg-card/40 backdrop-blur-sm p-5 text-center">
              <Star className="h-6 w-6 text-amber-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">--</div>
              <div className="text-xs text-muted-foreground mt-1">GitHub Stars</div>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-5 text-center">
              <ArrowRight className="h-6 w-6 text-primary mx-auto mb-2 rotate-90" />
              <div className="text-lg font-bold text-foreground">--</div>
              <div className="text-xs text-muted-foreground mt-1">npm Downloads</div>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-5 text-center">
              <Terminal className="h-6 w-6 text-chart-2 mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">v0.1.0</div>
              <div className="text-xs text-muted-foreground mt-1">Version</div>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-5 text-center">
              <ShieldCheck className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">MIT</div>
              <div className="text-xs text-muted-foreground mt-1">License</div>
            </Card>
            <Card className="bg-card/40 backdrop-blur-sm p-5 text-center sm:col-span-3 lg:col-span-1">
              <GitHubIcon className="h-6 w-6 text-foreground mx-auto mb-2" />
              <div className="text-lg font-bold text-foreground">--</div>
              <div className="text-xs text-muted-foreground mt-1">Contributors</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,color-mix(in_oklch,var(--primary)_5%,transparent),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-6">
          <Card className="bg-linear-to-br from-primary/5 via-transparent to-transparent border-primary/10 p-8 md:p-12 text-center">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 ring-1 ring-primary/20">
                <GitHubIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-foreground leading-[1.15]">
                Open Source{" "}
                <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
                  First
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                MIT licensed. Community driven. Built in the open. We believe the best software is
                built together.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <ShieldCheck className="h-3 w-3 mr-1.5" />
                  MIT License
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <Terminal className="h-3 w-3 mr-1.5" />
                  Community Driven
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <GitHubIcon className="h-3 w-3 mr-1.5" />
                  Contribution Friendly
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Button
                  onClick={() => router.push("https://github.com/Anshul563/static-ui")}
                  size="lg"
                  className="group text-base h-11 px-6"
                >
                  <GitHubIcon className="h-4 w-4 mr-2" />
                  View on GitHub
                  <ExternalLink className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(
                      "https://github.com/Anshul563/static-ui/blob/master/CONTRIBUTING.md"
                    )
                  }
                  size="lg"
                  className="text-base h-11 px-6"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Contributing Guide
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="relative py-16 lg:py-20">
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-medium">
            <MessageSquare className="h-3 w-3 mr-1.5 inline-block" />
            Testimonials
          </Badge>
          <Card className="bg-muted/30 border-dashed border-border/50 p-8">
            <div className="max-w-sm mx-auto space-y-3">
              <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto" />
              <p className="text-sm text-muted-foreground italic">
                &ldquo;Developer feedback coming soon&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/60">
                Your testimonial could be here. Join our community and share your experience.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_50%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
            Ready to build{" "}
            <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
              with Static UI
            </span>
            ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Install once. Own your code forever.
          </p>

          <div className="mx-auto mt-8 max-w-sm">
            <Card className="flex-row items-center justify-between p-2.5 pl-4 bg-muted/80 backdrop-blur-md border border-border/50 group">
              <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-foreground">
                <Terminal className="h-4 w-4 text-primary shrink-0" />
                <span className="select-all">npx @static-ui/cli init</span>
              </div>
              <button
                onClick={() => handleCopy("npx @static-ui/cli init", "cta")}
                className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted border border-border hover:bg-accent text-foreground cursor-pointer transition-all active:scale-95"
                aria-label="Copy initialization command"
              >
                {copiedCommands["cta"] ? (
                  <Check className="h-3.5 w-3.5 text-primary" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                )}
              </button>
            </Card>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => router.push("/docs")}
              size="lg"
              className="group text-base h-11 px-6"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/docs/components")}
              size="lg"
              className="text-base h-11 px-6"
            >
              Browse Components
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background pt-16 pb-8 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Product</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/docs/components" className="hover:text-foreground transition-colors">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/docs/blocks" className="hover:text-foreground transition-colors">
                    Blocks
                  </Link>
                </li>
                <li>
                  <Link href="/docs/templates" className="hover:text-foreground transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="/docs/themes" className="hover:text-foreground transition-colors">
                    Themes
                  </Link>
                </li>
                <li>
                  <Link href="/docs/cli" className="hover:text-foreground transition-colors">
                    CLI
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Resources</h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/docs" className="hover:text-foreground transition-colors">
                    Docs
                  </Link>
                </li>
                <li>
                  <a
                    href={
                      process.env.NEXT_PUBLIC_STORYBOOK_URL ||
                      "https://registry-staticui.vercel.app"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Storybook
                  </a>
                </li>
                <li>
                  <a
                    href={
                      process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Anshul563/static-ui/blob/master/ROADMAP.md"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Community</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"}/issues`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Issues
                  </a>
                </li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"}/discussions`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Discussions
                  </a>
                </li>
                <li>
                  <a
                    href={`${process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui"}/blob/master/CONTRIBUTING.md`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    Contributing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm">Legal</h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    License
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold text-foreground mb-3 text-sm">Static UI</h4>
              <div className="space-y-2.5">
                <p className="leading-relaxed">
                  Open-source component library for modern web applications. Copy, paste, own.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant="outline" className="text-[10px]">
                    v0.1.0
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    MIT
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2026 Static UI. Built open-source for modern developers.</p>
            <p className="text-xs text-muted-foreground">
              Beautiful React Components powered by Base UI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
