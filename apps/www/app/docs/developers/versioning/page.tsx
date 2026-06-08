"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function VersioningPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Versioning</h1>
      <p className="text-muted-foreground mt-2">
        Static UI follows semantic versioning (SemVer 2.0) for all packages.
      </p>

      <h2 className="text-xl font-semibold mt-8">Semantic Versioning</h2>
      <CodeBlock
        code={`MAJOR.MINOR.PATCH

1.2.3 → Major: 1, Minor: 2, Patch: 3`}
        language="text"
      />

      <ul className="mt-2 space-y-2">
        <li>
          <strong>MAJOR</strong> — Incompatible API changes
        </li>
        <li>
          <strong>MINOR</strong> — Backward-compatible new functionality
        </li>
        <li>
          <strong>PATCH</strong> — Backward-compatible bug fixes
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Package Versioning Strategy</h2>
      <p className="mt-2">
        All packages are versioned independently using Changesets. This allows:
      </p>
      <ul className="mt-2 space-y-2">
        <li>Individual package release cadences</li>
        <li>Accurate dependency tracking between packages</li>
        <li>Auto-generated changelogs per package</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Current Versions</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>@static-ui/cli</code> — 0.1.0
        </li>
        <li>
          <code>@static-ui/core</code> — 0.1.0
        </li>
        <li>
          <code>@static-ui/ui</code> — 0.1.0
        </li>
        <li>
          <code>@static-ui/themes</code> — 0.1.0
        </li>
        <li>
          <code>@static-ui/registry</code> — 0.1.0
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Dependency Management</h2>
      <p className="mt-2">
        Internal packages use <code>workspace:*</code> protocol. Syncpack ensures consistent
        dependency versions across the monorepo. Run <code>pnpm syncpack</code> to check for
        mismatches.
      </p>
    </div>
  )
}
