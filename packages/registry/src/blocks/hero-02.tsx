"use client"

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
        <div className="rounded-xl border border-border bg-card p-8 text-card-foreground shadow-xs aspect-[4/3] flex items-center justify-center">
          <p className="text-muted-foreground">Preview</p>
        </div>
      </div>
    </section>
  )
}
