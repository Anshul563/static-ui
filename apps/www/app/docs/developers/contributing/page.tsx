"use client"

export default function ContributingPage() {
  return (
    <div className="prose-custom">
      <h1 className="text-3xl font-bold tracking-tight">Contributing Guide</h1>
      <p className="text-muted-foreground mt-2">
        We welcome contributions from the community. Here is how you can help.
      </p>

      <h2 className="text-xl font-semibold mt-8">Code of Conduct</h2>
      <p className="mt-2">
        This project follows a Contributor Code of Conduct. By participating, you agree to maintain
        a respectful and inclusive environment.
      </p>

      <h2 className="text-xl font-semibold mt-8">How to Contribute</h2>
      <ol className="mt-2 space-y-2 list-decimal pl-5">
        <li>Fork the repository</li>
        <li>
          Create a feature branch: <code>git checkout -b feat/my-feature</code>
        </li>
        <li>Make your changes following the development workflow</li>
        <li>Write or update tests as needed</li>
        <li>
          Commit using conventional commits: <code>feat: add my feature</code>
        </li>
        <li>Push and create a Pull Request</li>
      </ol>

      <h2 className="text-xl font-semibold mt-8">What to Work On</h2>
      <ul className="mt-2 space-y-2">
        <li>
          <strong>New Components:</strong> Add new UI components following existing patterns
        </li>
        <li>
          <strong>Bug Fixes:</strong> Fix issues in existing components
        </li>
        <li>
          <strong>Documentation:</strong> Improve docs, examples, and guides
        </li>
        <li>
          <strong>Tests:</strong> Increase test coverage
        </li>
        <li>
          <strong>Framework Support:</strong> Add adapters for new frameworks
        </li>
        <li>
          <strong>Performance:</strong> Optimize bundle size and runtime
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Pull Request Guidelines</h2>
      <ul className="mt-2 space-y-2">
        <li>Keep PRs focused on a single concern</li>
        <li>Include tests for new functionality</li>
        <li>Update documentation when adding features</li>
        <li>Ensure all CI checks pass</li>
        <li>Request review from maintainers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8">Getting Help</h2>
      <p className="mt-2">
        Open an issue on GitHub for bugs, feature requests, or questions. We aim to respond within
        48 hours.
      </p>
    </div>
  )
}
