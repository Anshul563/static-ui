import * as p from "@clack/prompts";
import color from "picocolors";
import { detectFramework, getAdapterById } from "../adapters/index.js";
import { readStaticConfig } from "../utils/index.js";

export async function frameworkAction() {
  p.intro(`${color.bgCyan(color.black(" Static UI - Current Framework "))}`);

  const projectRoot = process.cwd();

  let config;
  try {
    config = readStaticConfig(projectRoot);
  } catch {
    p.cancel("static.json not found. Run `init` first.");
    process.exit(1);
  }

  const detection = detectFramework(projectRoot);
  const configuredFramework = getAdapterById(config.framework) || getAdapterById(config.framework.toLowerCase());

  if (!configuredFramework) {
    p.cancel(`Unknown framework "${config.framework}" in static.json`);
    process.exit(1);
  }

  const isTypeScript = config.language === "typescript";

  console.log();
  console.log(`  ${color.bold("Framework:")}     ${color.cyan(configuredFramework.label)}`);
  console.log(`  ${color.bold("Version:")}       ${detection?.version ? color.green(detection.version) : color.yellow("Unknown")}`);
  console.log(`  ${color.bold("Language:")}      ${isTypeScript ? color.green("TypeScript") : color.yellow("JavaScript")}`);
  console.log(`  ${color.bold("Theme:")}         ${color.green(config.theme)}`);
  console.log(`  ${color.bold("Router:")}        ${config.routerType || "N/A"}`);
  console.log();

  p.outro(`${color.green("✔")} Framework info displayed`);
}
