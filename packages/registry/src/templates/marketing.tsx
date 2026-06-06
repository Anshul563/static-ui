"use client"

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
}
