"use client"

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
            <div key={f.title} className="rounded-xl border border-border bg-card p-6 text-card-foreground shadow-xs">
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
