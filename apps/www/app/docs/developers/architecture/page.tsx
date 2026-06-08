"use client"

export default function ArchitecturePage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Architecture Overview</h1>
      <p className="text-muted-foreground mt-2">
        Static UI is a multi-framework UI component library built on a modular, Turborepo-based
        monorepo.
      </p>

      <h2 className="text-xl font-semibold mt-8">Core Principles</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>Source of Truth:</strong> All components are defined once in{" "}
          <code>packages/ui</code> using React.
        </li>
        <li>
          <strong>Code Generation:</strong> The registry and core packages generate
          framework-specific output.
        </li>
        <li>
          <strong>Copy-Paste:</strong> Components are designed to be copied into consumer projects,
          not installed as runtime dependencies.
        </li>
        <li>
          <strong>Unstyled & Accessible:</strong> Built on <code>@base-ui/react</code> for
          accessible, unstyled primitives.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Package Architecture</h2>
      <pre className="mt-2 p-4 bg-muted rounded-lg text-sm">
        {`static-ui/
├── packages/
│   ├── ui/          # React component source of truth
│   ├── cli/         # CLI tool (init, add, theme commands)
│   ├── core/        # Schemas and code generators
│   ├── registry/    # Component registry for distribution
│   └── themes/      # Theme definitions (CSS variables)
├── apps/
│   ├── www/         # Documentation website
│   └── storybook/   # Component development environment
└── e2e/             # Playwright end-to-end tests`}
      </pre>

      <h2 className="text-xl font-semibold mt-8">Data Flow</h2>
      <ol className="mt-2 space-y-2 list-decimal pl-5">
        <li>
          Components are authored in <code>packages/ui/src</code>
        </li>
        <li>
          Registry metadata is defined in <code>packages/registry/registry.json</code>
        </li>
        <li>
          Build script reads UI source + metadata to produce <code>dist/index.json</code>
        </li>
        <li>CLI fetches registry and installs components into consumer projects</li>
        <li>Consumer projects use components with framework-specific adapters</li>
      </ol>
    </div>
  )
}
