"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function ReleasePage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Release Process</h1>
      <p className="text-muted-foreground mt-2">
        Static UI uses Changesets for automated versioning and publishing.
      </p>

      <h2 className="text-xl font-semibold mt-8">Release Flow</h2>
      <ol className="mt-2 space-y-2 list-decimal pl-5">
        <li>
          Create a changeset: <code>pnpm changeset</code>
        </li>
        <li>
          Version packages: <code>pnpm changeset version</code>
        </li>
        <li>
          Publish to npm: <code>pnpm changeset publish</code>
        </li>
      </ol>

      <h2 className="text-xl font-semibold mt-8">Creating a Changeset</h2>
      <CodeBlock code={`pnpm changeset`} language="bash" />
      <p className="mt-2">
        Follow the prompts to describe your changes and select affected packages.
      </p>

      <h2 className="text-xl font-semibold mt-8">Versioning</h2>
      <p className="mt-2">We follow semantic versioning (SemVer):</p>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>Major (1.x):</strong> Breaking API changes
        </li>
        <li>
          <strong>Minor (0.x):</strong> New features, backward compatible
        </li>
        <li>
          <strong>Patch (0.0.x):</strong> Bug fixes and minor improvements
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Published Packages</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>@static-ui/cli</code> — CLI tool
        </li>
        <li>
          <code>@static-ui/core</code> — Core schemas and generators
        </li>
        <li>
          <code>@static-ui/ui</code> — UI components
        </li>
        <li>
          <code>@static-ui/themes</code> — Theme definitions
        </li>
        <li>
          <code>@static-ui/registry</code> — Component registry
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Release Pipeline</h2>
      <p className="mt-2">The full release pipeline runs automatically via GitHub Actions:</p>
      <CodeBlock
        code={`pnpm release  # Runs: typecheck → lint → test → validate → size → build → publish`}
        language="bash"
      />

      <h2 className="text-xl font-semibold mt-8">Changelogs</h2>
      <p className="mt-2">
        Changelogs are auto-generated from conventional commit messages. Each package has its own
        CHANGELOG.md file.
      </p>
    </div>
  )
}
