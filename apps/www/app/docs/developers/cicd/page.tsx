"use client"

export default function CicdPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">CI/CD</h1>
      <p className="text-muted-foreground mt-2">
        Static UI uses GitHub Actions for continuous integration and delivery.
      </p>

      <h2 className="text-xl font-semibold mt-8">CI Workflows</h2>

      <h3 className="text-lg font-semibold mt-6">ci.yml</h3>
      <p className="mt-1">Runs on push and pull requests to main:</p>
      <ul className="mt-2 space-y-1">
        <li>
          <strong>lint-typecheck:</strong> ESLint + TypeScript + Syncpack + Knip + Prettier
        </li>
        <li>
          <strong>test:</strong> Vitest with coverage
        </li>
        <li>
          <strong>registry:</strong> Registry build and validation
        </li>
        <li>
          <strong>build:</strong> All packages build + Size Limit
        </li>
        <li>
          <strong>e2e:</strong> Playwright E2E tests (Chromium)
        </li>
        <li>
          <strong>storybook:</strong> Storybook build verification
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">release.yml</h3>
      <p className="mt-1">Automated npm publishing via Changesets:</p>
      <ul className="mt-2 space-y-1">
        <li>Triggers on changeset PR merge</li>
        <li>Builds all packages</li>
        <li>Uses changesets/action for versioning and publishing</li>
        <li>Requires NPM_TOKEN secret for authentication</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6">validate-registry.yml</h3>
      <p className="mt-1">Validates registry integrity on registry-related changes:</p>
      <ul className="mt-2 space-y-1">
        <li>Checks for duplicate entries</li>
        <li>Verifies all referenced source files exist</li>
        <li>Validates metadata completeness</li>
        <li>Runs registry test suite</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Caching</h2>
      <p className="mt-2">
        All workflows use PNPM cache for node_modules and Turbo remote caching for build outputs.
        This reduces CI times significantly.
      </p>

      <h2 className="text-xl font-semibold mt-8">Secrets Required</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <code>NPM_TOKEN</code> — npm publish token (release workflow)
        </li>
        <li>
          <code>GITHUB_TOKEN</code> — Auto-provided by GitHub Actions
        </li>
      </ul>
    </div>
  )
}
