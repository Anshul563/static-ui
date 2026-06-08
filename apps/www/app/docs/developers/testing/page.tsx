"use client"

import { CodeBlock } from "@/components/CodeBlock"

export default function TestingPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Testing Guide</h1>
      <p className="text-muted-foreground mt-2">
        Static UI uses Vitest for unit tests and Playwright for E2E tests.
      </p>

      <h2 className="text-xl font-semibold mt-8">Test Stack</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>Vitest</strong> — Unit and integration tests
        </li>
        <li>
          <strong>@vitest/coverage-v8</strong> — Code coverage reporting
        </li>
        <li>
          <strong>Playwright</strong> — End-to-end browser tests
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Running Tests</h2>
      <CodeBlock
        code={`pnpm test              # Run all unit tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Run with coverage
pnpm e2e               # Run Playwright tests
pnpm e2e:ui            # Playwright UI mode`}
        language="bash"
      />

      <h2 className="text-xl font-semibold mt-8">Test Locations</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>packages/cli/tests/</code> — CLI command tests
        </li>
        <li>
          <code>packages/core/tests/</code> — Core utility tests
        </li>
        <li>
          <code>packages/registry/tests/</code> — Registry validation tests
        </li>
        <li>
          <code>e2e/</code> — Playwright E2E specs
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Coverage Targets</h2>
      <ul className="mt-2 space-y-2">
        <li>Lines: 80%+</li>
        <li>Functions: 80%+</li>
        <li>Branches: 75%+</li>
        <li>Statements: 80%+</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Writing Tests</h2>
      <p className="mt-2">Tests use Vitest globals API with describe/it blocks:</p>
      <CodeBlock
        code={`import { describe, it, expect } from "vitest"

describe("component", () => {
  it("behaves correctly", () => {
    expect(true).toBe(true)
  })
})`}
        language="typescript"
      />

      <h2 className="text-xl font-semibold mt-8">E2E Tests</h2>
      <p className="mt-2">
        Playwright tests cover critical user journeys across Chromium, Firefox, and mobile
        viewports. Tests run against the development server.
      </p>
    </div>
  )
}
