"use client"

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
                    {p.features[idx] ? <svg className="w-4 h-4 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : <svg className="w-4 h-4 mx-auto text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
