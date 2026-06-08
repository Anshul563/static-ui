"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function WorkflowPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Development Workflow</h1>
      <p className="text-muted-foreground mt-2">
        How to set up and work with the Static UI monorepo.
      </p>

      <h2 className="text-xl font-semibold mt-8">Prerequisites</h2>
      <ul className="mt-2 space-y-2">
        <li>Node.js 20+</li>
        <li>PNPM 11.5+</li>
        <li>Git</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Setup</h2>
      <CodeBlock
        code={`git clone https://github.com/Anshul563/static-ui.git
cd static-ui
pnpm install
pnpm build`}
        language="bash"
      />

      <h2 className="text-xl font-semibold mt-8">Development Loop</h2>
      <ol className="mt-2 space-y-2 list-decimal pl-5">
        <li>Make changes in the appropriate package</li>
        <li>
          Run <code>pnpm typecheck</code> to verify types
        </li>
        <li>
          Run <code>pnpm test</code> to run tests
        </li>
        <li>
          Run <code>pnpm lint</code> for code quality
        </li>
        <li>Commit using conventional commits (enforced by commitlint)</li>
        <li>Push — CI will run all checks automatically</li>
      </ol>

      <h2 className="text-xl font-semibold mt-8">Pre-commit Hooks</h2>
      <p className="mt-2">Husky automatically runs:</p>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>pre-commit:</strong> lint-staged (eslint + prettier on staged files)
        </li>
        <li>
          <strong>commit-msg:</strong> commitlint (conventional commit validation)
        </li>
        <li>
          <strong>pre-push:</strong> typecheck + build
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Adding a New Component</h2>
      <ol className="mt-2 space-y-2 list-decimal pl-5">
        <li>
          Create the component file in <code>packages/ui/src/</code>
        </li>
        <li>
          Export it from <code>packages/ui/src/index.ts</code>
        </li>
        <li>
          Add entry to <code>packages/registry/registry.json</code>
        </li>
        <li>
          Add dependency override in <code>build-registry.ts</code> if needed
        </li>
        <li>
          Run <code>pnpm registry</code> to rebuild the registry
        </li>
        <li>
          Run <code>pnpm validate:registry</code> to verify
        </li>
      </ol>
    </div>
  )
}
