"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

interface HealthData {
  packages: number
  components: number
  themes: number
  blocks: number
  templates: number
  totalRegistry: number
  version: string
}

export default function ProjectHealthPage() {
  const [data, setData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [pkg, registry] = await Promise.all([
          fetch("/package.json")
            .then((r) => r.json())
            .catch(() => ({ version: "0.1.0" })),
          fetch("/docs/registry-data.json")
            .then((r) => r.json())
            .catch(() => null),
        ])
        setData({
          packages: 8,
          components: registry
            ? registry.filter((i: { type: string }) => i.type === "components:ui").length
            : 48,
          themes: 7,
          blocks: registry
            ? registry.filter((i: { type: string }) => i.type === "components:block").length
            : 10,
          templates: registry
            ? registry.filter((i: { type: string }) => i.type === "components:template").length
            : 3,
          totalRegistry: registry ? registry.length : 69,
          version: pkg.version || "0.1.0",
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="text-muted-foreground">Loading project health data...</div>
  }

  const stats = [
    { label: "Total Packages", value: data?.packages ?? 8 },
    { label: "UI Components", value: data?.components ?? 48 },
    { label: "Themes", value: data?.themes ?? 7 },
    { label: "Blocks", value: data?.blocks ?? 10 },
    { label: "Templates", value: data?.templates ?? 3 },
    { label: "Registry Entries", value: data?.totalRegistry ?? 69 },
  ]

  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Project Health</h1>
      <p className="text-muted-foreground mt-2">
        Live dashboard showing key metrics about the Static UI project.
      </p>

      <div className="mt-6 mb-8">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Latest Version</div>
          <div className="text-2xl font-bold mt-1">{data?.version ?? "0.1.0"}</div>
        </Card>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 text-center">
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
          </Card>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-10">CI Status</h2>
      <p className="mt-2">
        <a
          href="https://github.com/Anshul563/static-ui/actions"
          target="_blank"
          rel="noreferrer"
          className="text-primary hover:underline"
        >
          View GitHub Actions →
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-8">Coverage</h2>
      <p className="mt-2">Target: 80%+ line coverage across all packages.</p>

      <h2 className="text-xl font-semibold mt-8">Bundle Size Budgets</h2>
      <ul className="mt-2 space-y-2">
        <li>Button: 5 KB</li>
        <li>Dialog: 5 KB</li>
        <li>Select: 5 KB</li>
        <li>Card: 3 KB</li>
        <li>AI Components: 8 KB</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Quality Checks</h2>
      <ul className="mt-2 space-y-2">
        <li>✅ ESLint — Zero warnings policy</li>
        <li>✅ Prettier — Consistent formatting</li>
        <li>✅ TypeScript — Strict mode</li>
        <li>✅ Husky — Pre-commit/pre-push hooks</li>
        <li>✅ Commitlint — Conventional commits enforced</li>
        <li>✅ Knip — Dead code detection</li>
        <li>✅ Syncpack — Dependency synchronization</li>
        <li>✅ Size Limit — Bundle size budgets</li>
      </ul>
    </div>
  )
}
