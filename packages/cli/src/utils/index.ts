import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";

export function resolveAlias(projectRoot: string, alias: string): string {
  const cleanAlias = alias.replace(/^@\//, "");
  if (fs.existsSync(path.join(projectRoot, "src"))) {
    return path.join(projectRoot, "src", cleanAlias);
  }
  return path.join(projectRoot, cleanAlias);
}

export function getPackageManager(projectRoot: string): string {
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(projectRoot, "bun.lockb"))) return "bun";
  return "npm";
}

export function installDependencies(projectRoot: string, deps: string[]): void {
  if (deps.length === 0) return;
  const pm = getPackageManager(projectRoot);
  const installCmd = pm === "pnpm" ? "add" : pm === "yarn" ? "add" : pm === "bun" ? "add" : "install";
  try {
    execSync(`${pm} ${installCmd} ${deps.join(" ")}`, { cwd: projectRoot, stdio: "ignore" });
  } catch {
    // Best-effort
  }
}

export interface StaticConfig {
  $schema: string;
  framework: string;
  routerType: string;
  language: string;
  theme: string;
  aliases: {
    components: string;
    ui: string;
    utils: string;
  };
  [key: string]: unknown;
}

export function readStaticConfig(projectRoot: string): StaticConfig {
  const configPath = path.join(projectRoot, "static.json");
  if (!fs.existsSync(configPath)) {
    throw new Error("static.json not found. Run `init` first.");
  }
  return fs.readJsonSync(configPath) as StaticConfig;
}
