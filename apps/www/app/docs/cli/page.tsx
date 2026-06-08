"use client"

import { ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/CodeBlock"

interface CommandDef {
  name: string
  description: string
  usage: string
  args?: string
  flags?: { flag: string; desc: string }[]
}

const commands: CommandDef[] = [
  {
    name: "init",
    description:
      "Scaffolds a fresh static.json configuration file in your project root. This sets up the workspace engine environment required for all subsequent CLI operations.",
    usage: "npx @static-ui/cli init",
    flags: [
      { flag: "--yes, -y", desc: "Accept defaults without prompting" },
      { flag: "--dir <path>", desc: "Target directory for initialization" },
    ],
  },
  {
    name: "add",
    description:
      "Downloads and injects one or more component primitives directly into your source tree. Components are placed according to the output paths defined in static.json.",
    usage: "npx @static-ui/cli add <component>",
    args: "<component> — Component name (e.g. button, accordion, dialog)",
    flags: [
      { flag: "--path <dir>", desc: "Override output directory" },
      { flag: "--all", desc: "Add all available components" },
    ],
  },
  {
    name: "doctor",
    description:
      "Runs a diagnostic check against your workspace to detect configuration issues, missing dependencies, and version mismatches in your static.json setup.",
    usage: "npx @static-ui/cli doctor",
    flags: [
      { flag: "--fix", desc: "Attempt auto-correction of detected issues" },
      { flag: "--verbose", desc: "Detailed diagnostic output" },
    ],
  },
  {
    name: "theme",
    description:
      "Generates or updates CSS theme variable sets from the bundled theme JSON definitions. Applies the selected theme's color tokens to your global stylesheet.",
    usage: "npx @static-ui/cli theme <theme-name>",
    args: "<theme-name> — One of: green, blue, zinc, slate, gaming, cyberpunk, modern",
    flags: [
      { flag: "--output <path>", desc: "Write theme CSS to a custom path" },
      { flag: "--list", desc: "List all available themes" },
    ],
  },
  {
    name: "search",
    description:
      "Queries the component registry for available primitives matching the provided search terms. Returns matching component names and brief descriptions.",
    usage: "npx @static-ui/cli search <query>",
    args: "<query> — Search term to match against component metadata",
  },
  {
    name: "list",
    description:
      "Prints a formatted inventory of every component available in the registry, optionally filtered by category or installation status.",
    usage: "npx @static-ui/cli list",
    flags: [
      { flag: "--installed", desc: "Only show already-installed components" },
      { flag: "--json", desc: "Output in JSON format" },
    ],
  },
  {
    name: "update",
    description:
      "Pulls the latest revisions of installed component files from the upstream registry. Existing files are merged rather than overwritten to preserve local customizations.",
    usage: "npx @static-ui/cli update [component]",
    args: "[component] — Optional specific component to update; omits all",
    flags: [
      { flag: "--dry-run", desc: "Preview changes without writing files" },
      { flag: "--force", desc: "Overwrite local changes" },
    ],
  },
  {
    name: "diff",
    description:
      "Compares your local component files against the latest registry versions and displays a colorized diff of any differences that need reconciliation.",
    usage: "npx @static-ui/cli diff [component]",
    flags: [
      { flag: "--stat", desc: "Summary statistics only, no full diff" },
    ],
  },
  {
    name: "info",
    description:
      "Displays detailed metadata about your Static UI workspace, including installed components, current theme, configuration paths, and version numbers.",
    usage: "npx @static-ui/cli info",
    flags: [
      { flag: "--json", desc: "Output all info as JSON" },
    ],
  },
  {
    name: "migrate",
    description:
      "Handles migration of components and configurations between major versions of the CLI. Automatically detects the source version and applies the correct transform pipeline.",
    usage: "npx @static-ui/cli migrate",
    flags: [
      { flag: "--from <version>", desc: "Explicit source version override" },
      { flag: "--dry-run", desc: "Preview migration without applying" },
    ],
  },
]

function CommandCard({ cmd }: { cmd: CommandDef }) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <code className="inline-block rounded-md border border-border bg-card px-2.5 py-1 font-mono text-sm font-semibold text-primary">
            {cmd.name}
          </code>
          {cmd.args && (
            <p className="text-[11px] text-muted-foreground font-mono mt-1">{cmd.args}</p>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{cmd.description}</p>

      <CodeBlock code={cmd.usage} language="bash" />

      {cmd.flags && cmd.flags.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            Flags
          </p>
          <div className="flex flex-wrap gap-2">
            {cmd.flags.map((f) => (
              <span
                key={f.flag}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card/50 px-2 py-1 text-[11px] text-muted-foreground"
              >
                <code className="text-foreground">{f.flag}</code>
                <span className="text-muted-foreground">—</span>
                <span>{f.desc}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

export default function DocsCliPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          Docs <ChevronRight className="h-3 w-3" /> Getting Started{" "}
          <ChevronRight className="h-3 w-3" />{" "}
          <span className="text-muted-foreground">CLI</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">CLI Reference</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Complete command reference for the Static UI command-line interface.
        </p>
      </div>

      <hr className="border-border my-2" />

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          The Static UI CLI (<code className="text-foreground text-xs font-mono bg-muted px-1 py-0.5 rounded-sm">@static-ui/cli</code>) is the primary gateway for generating components, managing themes, and maintaining your workspace configuration. All commands follow the <code className="text-foreground text-xs font-mono bg-muted px-1 py-0.5 rounded-sm">npx @static-ui/cli &lt;command&gt;</code> pattern.
        </p>
      </div>

      <div className="grid gap-5">
        {commands.map((cmd) => (
          <CommandCard key={cmd.name} cmd={cmd} />
        ))}
      </div>
    </div>
  )
}
