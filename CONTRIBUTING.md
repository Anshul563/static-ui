# Contributing to Static UI

Thank you for your interest in contributing to Static UI! We welcome contributions from everyone.

## Code of Conduct

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Issues

1. Search existing issues to avoid duplicates
2. Use the issue template
3. Include:
   - Framework and version
   - Node.js and pnpm versions
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Feature Requests

1. Check existing discussions and feature requests
2. Open a discussion first for major changes
3. Explain the use case and motivation

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Run tests: `pnpm lint && pnpm typecheck && pnpm build`
5. Push to your fork
6. Open a pull request

### Development Setup

```bash
pnpm install
pnpm build
pnpm dev
```

### Project Structure

- `packages/ui/` — React components
- `packages/cli/` — CLI tool
- `packages/registry/` — Component registry
- `packages/core/` — Component schemas and code generators
- `packages/themes/` — Theme definitions
- `apps/www/` — Website and documentation
- `apps/storybook/` — Component storybook

### Adding a New Component

1. Add the component to `packages/ui/src/`
2. Add stories to `apps/storybook/src/stories/`
3. Add metadata to `packages/registry/registry.json`
4. Add the component export to `packages/ui/src/index.ts`
5. Run `pnpm build` to verify

### Adding a New Theme

1. Create a JSON file in `packages/themes/`
2. Add to the CLI theme command in `packages/cli/src/commands/theme.ts`
3. Add to the ThemeSwitcher in `apps/www/src/components/ThemeSwitcher.tsx`

## Style Guide

- Use TypeScript strictly
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Ensure components are accessible (ARIA)
- Use Tailwind CSS v4 for styling
- Keep components unstyled and customizable

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
