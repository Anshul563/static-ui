"use client"

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
}
