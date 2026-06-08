"use client"

import React, { useState } from "react"
import { Check, ChevronRight, Copy } from "lucide-react"
import { notFound, useParams } from "next/navigation"
import { CommandBlock } from "@/components/CommandBlock"
import { Card } from "@/components/ui/card"

const BLOCKS_META = [
  {
    name: "Dashboard 01",
    slug: "dashboard-01",
    description: "Full dashboard layout with sidebar, header, and stats",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["sidebar", "card", "button", "avatar"],
  },
  {
    name: "Dashboard 02",
    slug: "dashboard-02",
    description: "Analytics dashboard variant with charts",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["sidebar", "card", "tabs", "select", "button"],
  },
  {
    name: "Login 01",
    slug: "login-01",
    description: "Clean login form with email and password",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["button", "input", "label", "card"],
  },
  {
    name: "Login 02",
    slug: "login-02",
    description: "Login form with social auth providers",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["button", "input", "label", "card", "separator"],
  },
  {
    name: "Pricing 01",
    slug: "pricing-01",
    description: "Three-tier pricing card layout",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["card", "button", "badge"],
  },
  {
    name: "Pricing 02",
    slug: "pricing-02",
    description: "Pricing table with feature comparison",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["card", "button", "badge", "table"],
  },
  {
    name: "Hero 01",
    slug: "hero-01",
    description: "Centered hero section with CTA buttons",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["button", "badge"],
  },
  {
    name: "Hero 02",
    slug: "hero-02",
    description: "Split hero section with image and text",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["button", "badge"],
  },
  {
    name: "Feature 01",
    slug: "feature-01",
    description: "Three-column feature grid",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["card"],
  },
  {
    name: "Feature 02",
    slug: "feature-02",
    description: "Alternating feature section with icons",
    deps: ["@base-ui/react", "lucide-react"],
    registryDeps: ["card"],
  },
]

const BLOCKS_CODE: Record<string, string> = {
  "dashboard-01": `"use client"

import * as React from "react"

export function Dashboard01() {
  return (
    <div className="flex min-h-screen">
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
            <Card key={stat.label} className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-green-500">{stat.change}</p>
            </Card>
          ))}
        </div>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Recent Activity</p>
              <div className="text-sm text-foreground">No recent activity to show.</div>
            </Card>
      </main>
    </div>
  )
}`,
  "dashboard-02": `"use client"

import * as React from "react"

export function Dashboard02() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border bg-background p-4">
        <div className="text-lg font-bold text-foreground mb-8">Static UI</div>
        <nav className="space-y-1">
          {["Overview", "Analytics", "Reports", "Settings"].map((item) => (
            <a key={item} href="#" className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">Track your performance metrics.</p>
          </div>
          <select className="h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Page Views</p>
              <p className="text-3xl font-bold text-foreground">54,321</p>
              <div className="mt-4 h-32 flex items-end gap-2">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: h + "%" }} />
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold text-foreground">3.24%</p>
              <p className="text-xs text-green-500 mt-2">+0.5% from last month</p>
            </Card>
        </div>
      </main>
    </div>
  )
}`,
  "login-01": `"use client"

import * as React from "react"

export function Login01() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
      </Card>
    </div>
  )
}`,
  "login-02": `"use client"

import * as React from "react"

export function Login02() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-sm p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
          <p className="text-sm text-muted-foreground">Choose your sign up method</p>
        </div>
        <div className="space-y-3">
          <button className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Continue with Google</button>
          <button className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Continue with GitHub</button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
          </div>
          <button type="submit" className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Create account</button>
        </div>
      </Card>
    </div>
  )
}`,
  "pricing-01": `"use client"

import * as React from "react"

export function Pricing01() {
  const tiers = [
    { name: "Starter", price: "$9", description: "Perfect for getting started", popular: false },
    { name: "Pro", price: "$29", description: "Best for growing teams", popular: true },
    { name: "Enterprise", price: "$99", description: "For large organizations", popular: false },
  ]
  return (
    <section className="py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">Simple pricing</h2>
        <p className="text-muted-foreground mt-2">Choose the plan that fits your needs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {tiers.map((tier) => (
          <Card key={tier.name} className={\`\${tier.popular ? "ring-primary" : ""} p-6 relative\`}>
            {tier.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground">Most Popular</span>}
            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
            <p className="mt-4"><span className="text-4xl font-bold text-foreground">{tier.price}</span><span className="text-sm text-muted-foreground">/month</span></p>
            <button className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
          </Card>
        ))}
      </div>
    </section>
  )
}`,
  "pricing-02": `"use client"

import * as React from "react"

export function Pricing02() {
  const features = ["Unlimited projects", "Team collaboration", "API access", "Priority support", "Custom domains", "Analytics dashboard"]
  const plans = [
    { name: "Free", price: "$0", features: [true, true, false, false, false, false] },
    { name: "Pro", price: "$29", features: [true, true, true, true, false, false] },
    { name: "Business", price: "$79", features: [true, true, true, true, true, true] },
  ]
  return (
    <section className="py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground">Compare plans</h2>
        <p className="text-muted-foreground mt-2">Find the right plan for your team</p>
      </div>
      <div className="overflow-x-auto max-w-4xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Feature</th>
              {plans.map((p) => <th key={p.name} className="py-3 px-4 text-sm font-semibold text-foreground text-center">{p.name}<div className="text-lg font-bold">{p.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></div></th>)}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={feature} className="border-b border-border">
                <td className="py-3 px-4 text-sm text-foreground">{feature}</td>
                {plans.map((p) => (
                  <td key={p.name} className="py-3 px-4 text-center">
                    {p.features[idx] ? <span className="text-green-500">✓</span> : <span className="text-muted-foreground/40">✕</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}`,
  "hero-01": `"use client"

import * as React from "react"

export function Hero01() {
  return (
    <section className="py-24 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4">New release v2.0</span>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Build beautiful interfaces with Static UI</h1>
        <p className="mt-4 text-lg text-muted-foreground">A modern component library built on Base UI and Tailwind CSS v4. Open source and ready to use.</p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
          <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Learn more</button>
        </div>
      </div>
    </section>
  )
}`,
  "hero-02": `"use client"

import * as React from "react"

export function Hero02() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground mb-4">Featured</span>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Design faster with pre-built components</h1>
          <p className="mt-4 text-muted-foreground">Stop writing repetitive UI code. Static UI gives you accessible, customizable components that you can copy and paste into your projects.</p>
          <div className="mt-6 flex gap-3">
            <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Browse components</button>
            <button className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">View on GitHub</button>
          </div>
        </div>
        <Card className="p-8 aspect-4/3 flex-row items-center justify-center">
              <p className="text-muted-foreground">Preview</p>
            </Card>
      </div>
    </section>
  )
}`,
  "feature-01": `"use client"

import * as React from "react"

export function Feature01() {
  const features = [
    { title: "Accessible", description: "Built on Base UI with full ARIA support and keyboard navigation out of the box." },
    { title: "Customizable", description: "Style with Tailwind CSS v4 classes. No opinionated themes to override." },
    { title: "Lightweight", description: "Copy what you need. Zero unnecessary dependencies in your bundle." },
  ]
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foreground">Why Static UI?</h2>
          <p className="text-muted-foreground mt-2">Everything you need to build modern interfaces</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card key={f.title} className="p-6">
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}`,
  "feature-02": `"use client"

import * as React from "react"

export function Feature02() {
  const features = [
    { title: "Seamless integration", description: "Drop into any Next.js, Vite, or Remix project. No build tool configuration needed." },
    { title: "Consistent design", description: "Every component uses the same Tailwind CSS variable tokens for a unified look." },
    { title: "Community driven", description: "Open source and free. Contributions, issues, and feedback are always welcome." },
  ]
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {features.map((f, i) => (
          <div key={f.title} className={\`flex flex-col \${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-center\`}>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.description}</p>
            </div>
            <Card className="flex-1 p-8 aspect-video flex-row items-center justify-center">
              <p className="text-muted-foreground text-sm">Illustration</p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}`,
}

export default function BlockDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const meta = BLOCKS_META.find((b) => b.slug === slug)

  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")
  const [copiedCode, setCopiedCode] = useState(false)

  if (!meta) return notFound()

  const code = BLOCKS_CODE[slug] || ""

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const blockName = meta.name
  const gradientFrom = [
    "#22c55e",
    "#3b82f6",
    "#a1a1aa",
    "#94a3b8",
    "#ec4899",
    "#eab308",
    "#14b8a6",
    "#8b5cf6",
    "#f97316",
    "#06b6d4",
  ][BLOCKS_META.indexOf(meta) % 10]
  const gradientTo = [
    "#166534",
    "#1e40af",
    "#52525b",
    "#475569",
    "#9d174d",
    "#a16207",
    "#0f766e",
    "#5b21b6",
    "#c2410c",
    "#0891b2",
  ][BLOCKS_META.indexOf(meta) % 10]

  return (
    <div className="flex flex-col gap-8 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          Docs <ChevronRight className="h-3 w-3" /> Blocks <ChevronRight className="h-3 w-3" />{" "}
          <span className="text-muted-foreground">{blockName}</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">{blockName}</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {meta.description}
        </p>
      </div>

      <hr className="border-border" />

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "preview" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "code" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Code
            </button>
          </div>
          {activeTab === "code" && (
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1 text-[11px] font-medium text-foreground hover:bg-accent hover:text-foreground transition-all cursor-pointer"
            >
              {copiedCode ? (
                <Check className="h-3 w-3 text-primary" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copiedCode ? "Copied" : "Copy Code"}
            </button>
          )}
        </div>

        <Card className="bg-background min-h-75 flex-row items-center justify-center p-6 relative bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
          {activeTab === "preview" ? (
            <div
              className="w-full h-64 rounded-lg flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${gradientFrom}33, ${gradientTo}22)`,
              }}
            >
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-xl mx-auto mb-3 flex items-center justify-center text-2xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                >
                  {blockName.charAt(0)}
                </div>
                <p className="text-sm font-medium text-muted-foreground">{blockName}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Block preview — add to your project to see it live
                </p>
              </div>
            </div>
          ) : (
            <Card
              size="sm"
              className="w-full font-mono text-[11px] overflow-x-auto whitespace-pre p-4 bg-card text-left leading-relaxed max-h-100 overflow-y-auto"
            >
              <code>{code}</code>
            </Card>
          )}
        </Card>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Installation</h3>
        <p className="text-xs text-muted-foreground">
          Run the following command to add this block to your project:
        </p>
        <div className="max-w-xl">
          <CommandBlock type="add" slug={slug} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Dependencies</h3>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Package dependencies:</p>
          <div className="flex flex-wrap gap-2">
            {meta.deps.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-mono text-foreground"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Required components (also installed):</p>
          <div className="flex flex-wrap gap-2">
            {meta.registryDeps.map((dep) => (
              <span
                key={dep}
                className="inline-flex items-center rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-mono text-foreground"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
