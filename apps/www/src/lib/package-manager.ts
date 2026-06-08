export type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

export type CommandType = "init" | "add" | "theme"

export const PACKAGE_MANAGER_STORAGE_KEY = "static-ui-package-manager"
export const DEFAULT_PACKAGE_MANAGER: PackageManager = "pnpm"

export const packageManagers: PackageManager[] = ["npm", "pnpm", "yarn", "bun"]

export const PM_LABELS: Record<PackageManager, string> = {
  npm: "npm",
  pnpm: "pnpm",
  yarn: "yarn",
  bun: "bun",
}

function getPrefix(pm: PackageManager): string {
  switch (pm) {
    case "npm":
      return "npx"
    case "pnpm":
      return "pnpm dlx"
    case "yarn":
      return "yarn dlx"
    case "bun":
      return "bunx"
  }
}

export function getCommand(type: CommandType, pm: PackageManager, slug?: string): string {
  const prefix = getPrefix(pm)
  switch (type) {
    case "init":
      return `${prefix} @static-ui/cli init`
    case "add":
      return `${prefix} @static-ui/cli add ${slug || ""}`.trim()
    case "theme":
      return `${prefix} @static-ui/cli theme ${slug || ""}`.trim()
  }
}
