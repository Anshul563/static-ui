"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function MonorepoPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Monorepo Structure</h1>
      <p className="text-muted-foreground mt-2">
        Static UI uses Turborepo with PNPM workspaces for scalable monorepo management.
      </p>

      <h2 className="text-xl font-semibold mt-8">Workspace Configuration</h2>
      <CodeBlock
        code={`packages:
  - "apps/*"
  - "packages/*"`}
        language="yaml"
      />

      <h2 className="text-xl font-semibold mt-8">Package Manager</h2>
      <p className="mt-2">PNPM v11.5.2 with the following configuration:</p>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>Package Manager:</strong> pnpm@11.5.2
        </li>
        <li>
          <strong>Lockfile:</strong> pnpm-lock.yaml
        </li>
        <li>
          <strong>Workspace protocol:</strong> workspace:* for internal dependencies
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Turbo Pipeline</h2>
      <p className="mt-2">The turbo.json defines the build, test, and deployment pipeline:</p>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>build:</strong> Depends on ^build, outputs to dist/ and .next/
        </li>
        <li>
          <strong>typecheck:</strong> Depends on ^build
        </li>
        <li>
          <strong>test:</strong> Depends on ^build, runs vitest
        </li>
        <li>
          <strong>lint:</strong> Depends on ^build, runs eslint
        </li>
        <li>
          <strong>e2e:</strong> Depends on build, runs playwright
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Key Commands</h2>
      <CodeBlock
        code={`pnpm dev          # Start all dev servers
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm lint         # Lint all packages
pnpm typecheck    # TypeScript check all packages
pnpm clean        # Clean all build outputs`}
        language="bash"
      />
    </div>
  )
}
