# Static UI

A modern, multi-framework UI library. Copy, paste, and customize unstyled components built on Base UI and Tailwind CSS v4.

```bash
npx @static-ui/cli init
```

## Features

- **Multi-Framework** — Works with React, Next.js, Vue, Nuxt, SolidJS, Svelte, Astro, and Remix
- **Auto Detection** — CLI automatically detects your framework and installs the correct components
- **Unstyled Core** — Built on Base UI primitives with full design token flexibility
- **Tailwind v4** — Zero runtime overhead, native CSS compilation
- **Copy-Paste** — Components are source files you own, not package dependencies
- **Theming** — 7 built-in themes (green, blue, zinc, slate, gaming, cyberpunk, modern)
- **Blocks & Templates** — Pre-built sections and full page layouts
- **Accessible** — ARIA-compliant with full keyboard and screen reader support

## Quick Start

```bash
# Initialize Static UI in your project
npx @static-ui/cli init

# Add components
npx @static-ui/cli add button
npx @static-ui/cli add dialog
npx @static-ui/cli add card

# Apply a theme
npx @static-ui/cli theme green

# Check your setup
npx @static-ui/cli doctor
```

## Framework Support

| Framework | Status      | Auto Detect |
| --------- | ----------- | ----------- |
| Next.js   | Stable      | ✓           |
| React     | Stable      | ✓           |
| Vue       | Beta        | ✓           |
| Nuxt      | Beta        | ✓           |
| SolidJS   | Coming Soon |             |
| Svelte    | Coming Soon |             |
| Astro     | Coming Soon |             |
| Remix     | Coming Soon |             |

## CLI Commands

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `init`            | Initialize Static UI in your project     |
| `add <component>` | Add components from the registry         |
| `doctor`          | Check project setup compatibility        |
| `theme <name>`    | Apply a theme to your project            |
| `framework`       | Display current framework info           |
| `list`            | List all available components            |
| `update`          | Update installed components              |
| `search`          | Search the registry                      |
| `diff`            | Compare installed with registry versions |

## Themes

```bash
npx @static-ui/cli theme green
npx @static-ui/cli theme blue
npx @static-ui/cli theme zinc
npx @static-ui/cli theme slate
npx @static-ui/cli theme gaming
npx @static-ui/cli theme cyberpunk
npx @static-ui/cli theme modern
```

## Blocks & Templates

Pre-built sections and full-page layouts:

- **Blocks**: hero-01, hero-02, feature-01, feature-02, pricing-01, pricing-02, login-01, login-02, dashboard-01, dashboard-02
- **Templates**: marketing, dashboard, auth

## AI Components

Specialized components for AI chat interfaces: ai-chat, ai-message, ai-prompt, ai-code-block, ai-file-upload, ai-chat-layout, ai-sidebar, ai-conversation

## Development

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run type checking
pnpm typecheck

# Run linting
pnpm lint

# Start development
pnpm dev
```

## Development Workflow

Static UI uses a production-ready Git workflow to keep broken code out of commits, pushes, pull requests, and releases.

### Git hooks

Husky installs automatically through `pnpm install` via the root `prepare` script.

- `pre-commit` runs `pnpm lint-staged` and checks only staged files.
- `commit-msg` runs Commitlint and enforces Conventional Commits.
- `pre-push` runs `pnpm typecheck` and `pnpm build` before code can be pushed.

If a hook fails, fix the reported issue, stage the changed files again, and rerun the commit or push.

### Commit messages

Use Conventional Commits:

```bash
feat: add bun support
fix: registry generation bug
docs: update installation guide
refactor: improve framework detection
chore: update dependencies
```

Invalid messages such as `update`, `test`, `asdf`, or `stuff` are rejected.

### Formatting and checks

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format
pnpm format:check
pnpm validate:registry
```

`lint-staged` formats changed files with Prettier and runs ESLint fixes for changed app files. Turborepo powers `lint`, `typecheck`, and `build`, so only packages with matching tasks participate.

### Registry validation

Before publishing, Static UI validates `packages/registry/registry.json` and the generated registry output when present. Validation checks for duplicate entries, missing metadata, invalid frameworks, missing files, and broken generated entries.

### Release process

```bash
pnpm release
```

The release command stops on the first error:

1. Typecheck
2. Lint
3. Build
4. Validate registry
5. Publish with Changesets

Publishing requires npm authentication and valid package versions.

## Project Structure

```
static-ui/
├── apps/
│   ├── www/              # Website & documentation
│   └── storybook/        # Component storybook
├── packages/
│   ├── ui/               # React components (source of truth)
│   ├── cli/              # CLI tool
│   ├── registry/         # Component registry
│   ├── core/             # Schemas & code generators
│   └── themes/           # Theme definitions
```

## License

MIT

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
