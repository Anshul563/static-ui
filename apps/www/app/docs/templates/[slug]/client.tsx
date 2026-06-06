"use client"

import React, { useState } from "react"
import { notFound, useParams } from "next/navigation"
import { ChevronRight, Terminal, Check, Copy } from "lucide-react"

const TEMPLATES_META = [
  { name: "Marketing", slug: "marketing", description: "Full marketing landing page with hero, features, and pricing sections", deps: ["@base-ui/react", "lucide-react", "next"], registryDeps: ["hero-01", "feature-01", "pricing-01", "button"] },
  { name: "Dashboard", slug: "dashboard", description: "Full dashboard template with sidebar navigation and analytics", deps: ["@base-ui/react", "lucide-react", "next"], registryDeps: ["dashboard-01", "sidebar", "button", "card"] },
  { name: "Auth", slug: "auth", description: "Authentication pages template with login and register modes", deps: ["@base-ui/react", "lucide-react", "next"], registryDeps: ["login-01", "login-02"] },
]

const TEMPLATES_CODE: Record<string, string> = {
  marketing: `"use client"

import * as React from "react"

export function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto flex h-14 items-center justify-between px-4">
          <span className="text-lg font-bold">Static UI</span>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#" className="hover:text-foreground transition-colors">Docs</a>
          </nav>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-24 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4">New release v2.0</span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Build beautiful interfaces with Static UI</h1>
            <p className="mt-4 text-lg text-muted-foreground">A modern component library built on Base UI and Tailwind CSS v4.</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
              <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Learn more</button>
            </div>
          </div>
        </section>
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Why Static UI?</h2>
              <p className="text-muted-foreground mt-2">Everything you need to build modern interfaces</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ title: "Accessible", desc: "Built on Base UI with full ARIA support." }, { title: "Customizable", desc: "Style with Tailwind CSS v4. No themes to override." }, { title: "Lightweight", desc: "Copy what you need. Zero unnecessary deps." }].map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Simple pricing</h2>
            <p className="text-muted-foreground mt-2">Choose the plan that fits your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[{ name: "Starter", price: "$9" }, { name: "Pro", price: "$29" }, { name: "Enterprise", price: "$99" }].map((tier) => (
              <div key={tier.name} className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="mt-4"><span className="text-4xl font-bold">{tier.price}</span><span className="text-sm text-muted-foreground">/month</span></p>
                <button className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        &copy; 2026 Static UI. All rights reserved.
      </footer>
    </div>
  )
}`,
  dashboard: `"use client"

import * as React from "react"

export function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-muted/50">
      <aside className="w-64 border-r border-border bg-background p-4">
        <div className="text-lg font-bold text-foreground mb-8">Static UI</div>
        <nav className="space-y-1">
          {["Overview", "Analytics", "Customers", "Settings"].map((item) => (
            <a key={item} href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, here is your overview.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Revenue", value: "$45,231", change: "+20.1%" },
            { label: "Active Users", value: "2,350", change: "+180.1%" },
            { label: "Sales", value: "12,234", change: "+19%" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-green-500">{stat.change}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs">
          <p className="text-sm text-muted-foreground mb-2">Recent Activity</p>
          <div className="text-sm text-foreground">No recent activity to show.</div>
        </div>
      </main>
    </div>
  )
}`,
  auth: `"use client"

import * as React from "react"

export function AuthPage() {
  const [mode, setMode] = React.useState<"login" | "register">("login")
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs">
        <div className="flex mb-6 rounded-md border border-border p-1 bg-muted/50">
          <button onClick={() => setMode("login")} className={\`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors \${mode === "login" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}\`}>Sign in</button>
          <button onClick={() => setMode("register")} className={\`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors \${mode === "register" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"}\`}>Register</button>
        </div>
        {mode === "login" ? (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="text-center mb-2">
              <h1 className="text-xl font-bold text-foreground">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input type="email" placeholder="m@example.com" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input type="password" placeholder="Enter your password" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs" />
            </div>
            <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Sign in</button>
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="text-center mb-2">
              <h1 className="text-xl font-bold text-foreground">Create account</h1>
              <p className="text-sm text-muted-foreground">Enter your details to get started</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input type="text" placeholder="John Doe" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input type="email" placeholder="m@example.com" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input type="password" placeholder="Create a password" className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-xs" />
            </div>
            <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Create account</button>
          </form>
        )}
      </div>
    </div>
  )
}`,
}

export default function TemplateDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const meta = TEMPLATES_META.find((t) => t.slug === slug)
  if (!meta) return notFound()

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedInstall, setCopiedInstall] = useState(false)

  const code = TEMPLATES_CODE[slug] || ""

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText(`npx @static-ui/cli add ${slug}`)
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const gradientFrom = { marketing: "#22c55e", dashboard: "#3b82f6", auth: "#a855f7" }[slug] || "#22c55e"
  const gradientTo = { marketing: "#166534", dashboard: "#1e40af", auth: "#7c3aed" }[slug] || "#166534"

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
          Docs <ChevronRight className="h-3 w-3" /> Templates <ChevronRight className="h-3 w-3" />{" "}
          <span className="text-neutral-400">{meta.name}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">{meta.name}</h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-2xl">{meta.description}</p>
      </div>

      <hr className="border-neutral-900" />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-1">
          <div className="flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "preview" ? "border-[#22c55e] text-[#22c55e] font-semibold" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "code" ? "border-[#22c55e] text-[#22c55e] font-semibold" : "border-transparent text-neutral-500 hover:text-neutral-300"}`}
            >
              Code
            </button>
          </div>
          {activeTab === "code" && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer"
            >
              {copiedCode ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
              {copiedCode ? "Copied" : "Copy Code"}
            </button>
          )}
        </div>

        <div className="rounded-xl border border-neutral-900 bg-[#030303] min-h-[300px] flex items-center justify-center p-6 relative overflow-hidden bg-[radial-gradient(#161616_1px,transparent_1px)] bg-[size:16px_16px]">
          {activeTab === "preview" ? (
            <div
              className="w-full h-64 rounded-lg flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${gradientFrom}33, ${gradientTo}22)` }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
                  style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
                >
                  {meta.name.charAt(0)}
                </div>
                <p className="text-sm font-medium text-neutral-400">{meta.name} Template</p>
                <p className="text-xs text-neutral-600 mt-1">Template preview — add to your project to see it live</p>
              </div>
            </div>
          ) : (
            <pre className="w-full font-mono text-[11px] overflow-x-auto whitespace-pre p-4 rounded-lg bg-[#050505] border border-neutral-950 text-left leading-relaxed max-h-[400px] overflow-y-auto">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-white tracking-tight">Installation</h3>
        <p className="text-xs text-neutral-400">Run the following command to add this template to your project:</p>
        <div className="flex items-center justify-between rounded-xl border border-neutral-900 bg-[#0a0a0a]/80 p-3 pl-4 max-w-xl shadow-md">
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-300">
            <Terminal className="h-3.5 w-3.5 text-[#22c55e]" />
            <span>npx @static-ui/cli add {slug}</span>
          </div>
          <button
            onClick={handleCopyInstall}
            className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-[11px] font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all cursor-pointer ml-3"
          >
            {copiedInstall ? <Check className="h-3 w-3 text-[#22c55e]" /> : <Copy className="h-3 w-3" />}
            {copiedInstall ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white tracking-tight">Dependencies</h3>
        <div className="space-y-2">
          <p className="text-xs text-neutral-400">Package dependencies:</p>
          <div className="flex flex-wrap gap-2">
            {meta.deps.map((dep) => (
              <span key={dep} className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-[11px] font-mono text-neutral-300">{dep}</span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-neutral-400">Required blocks and components (also installed):</p>
          <div className="flex flex-wrap gap-2">
            {meta.registryDeps.map((dep) => (
              <span key={dep} className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-[11px] font-mono text-neutral-300">{dep}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
