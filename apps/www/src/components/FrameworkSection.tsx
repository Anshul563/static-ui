"use client"

import Link from "next/link"
import { ArrowRight, Cpu, Blocks, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FrameworkGrid } from "./FrameworkGrid"
import { FrameworkTerminal } from "./FrameworkTerminal"
import { FrameworkRoadmap } from "./FrameworkRoadmap"

const features = [
  {
    icon: Cpu,
    title: "Auto Detection",
    description:
      "Static UI automatically detects your framework and project configuration—no manual setup required.",
  },
  {
    icon: Blocks,
    title: "Framework Adapters",
    description:
      "Components are optimized for each framework instead of being generic wrappers. Native performance everywhere.",
  },
  {
    icon: Share2,
    title: "Shared Ecosystem",
    description:
      "Use the same themes, blocks, templates, and design system across multiple frameworks with zero friction.",
  },
]

export function FrameworkSection() {
  return (
    <section className="relative px-6 py-6 md:py-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(34,197,94,0.03),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-chart-1 backdrop-blur-xs mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-chart-1 animate-pulse" />
            Multi-Framework Architecture
          </div>

          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.15]">
            Supported{" "}
            <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-500 bg-clip-text text-transparent font-semibold">
              Frameworks
            </span>
          </h2>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Build once. Install everywhere.
          </p>

          <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Static UI automatically detects your framework and installs the correct
            components, themes, and templates with a single command.
          </p>
        </div>

        <FrameworkGrid />

        <div className="mt-20 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <FrameworkTerminal />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="group bg-card/40 p-5 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <Card size="sm" className="flex h-9 w-9 shrink-0 flex-row items-center justify-center bg-muted/60 group-hover:border-primary/30 transition-colors p-0 [--card-spacing:0]">
                      <Icon className="h-4 w-4 text-chart-2" />
                    </Card>
                    <div>
                      <h3 className="text-sm font-medium text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="mt-20">
          <FrameworkRoadmap />
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
            Ready to build with Static UI?
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Install in seconds. One CLI. Every framework.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Card className="inline-flex flex-row items-center gap-2 bg-card/80 px-4 py-2.5 font-mono text-sm text-foreground backdrop-blur-sm">
              <span className="text-primary">$</span>
              <span>npx @static-ui/cli init</span>
            </Card>

            <div className="flex gap-3">
              <Link
                href="/docs"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-card px-5 text-sm font-medium text-foreground hover:bg-accent transition-colors shadow-lg"
              >
                View Documentation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
