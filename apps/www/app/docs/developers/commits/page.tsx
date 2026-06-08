"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function CommitsPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Commit Conventions</h1>
      <p className="text-muted-foreground mt-2">
        Static UI enforces conventional commits using commitlint and Husky.
      </p>

      <h2 className="text-xl font-semibold mt-8">Format</h2>
      <CodeBlock
        code={`<type>(<scope>): <description>

[optional body]

[optional footer]`}
        language="text"
      />

      <h2 className="text-xl font-semibold mt-8">Allowed Types</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>feat</code> — New feature
        </li>
        <li>
          <code>fix</code> — Bug fix
        </li>
        <li>
          <code>docs</code> — Documentation only
        </li>
        <li>
          <code>refactor</code> — Code change that neither fixes a bug nor adds a feature
        </li>
        <li>
          <code>perf</code> — Performance improvement
        </li>
        <li>
          <code>test</code> — Adding or updating tests
        </li>
        <li>
          <code>build</code> — Build system or external dependencies
        </li>
        <li>
          <code>ci</code> — CI configuration
        </li>
        <li>
          <code>chore</code> — Other changes that don't modify src or test files
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Examples</h2>
      <CodeBlock
        code={`feat: add bun support
feat(cli): add --yes flag to init command
fix: registry validation bug
docs: update installation guide
refactor(core): simplify generator logic
test: add framework detection tests
ci: add Playwright workflow`}
        language="text"
      />

      <h2 className="text-xl font-semibold mt-8">Rejected Examples</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>update stuff</code> — Missing type
        </li>
        <li>
          <code>test</code> — Too vague, missing description
        </li>
        <li>
          <code>asd</code> — Nonsensical
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Scope</h2>
      <p className="mt-2">
        Scopes help identify the affected package. Common scopes:
        <code>cli</code>, <code>ui</code>, <code>core</code>, <code>registry</code>,
        <code>themes</code>, <code>www</code>, <code>storybook</code>.
      </p>
    </div>
  )
}
