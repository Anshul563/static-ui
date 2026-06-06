"use client"

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
          <div key={f.title} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-center`}>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.description}</p>
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-8 text-card-foreground shadow-xs aspect-video flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Illustration</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
