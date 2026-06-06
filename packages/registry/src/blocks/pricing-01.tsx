"use client"

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
          <div key={tier.name} className={`rounded-xl border ${tier.popular ? "border-primary" : "border-border"} bg-card p-6 text-card-foreground shadow-xs relative`}>
            {tier.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground">Most Popular</span>}
            <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
            <p className="mt-4"><span className="text-4xl font-bold text-foreground">{tier.price}</span><span className="text-sm text-muted-foreground">/month</span></p>
            <button className="mt-6 inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">Get started</button>
          </div>
        ))}
      </div>
    </section>
  )
}
