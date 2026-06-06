import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { readStaticConfig } from "../utils/index.js";
import { fetchRegistry, getComponent } from "../registry/index.js";

export async function updateAction() {
  p.intro(`${color.bgCyan(color.black(" Static UI - Update "))}`);

  const projectRoot = process.cwd();
  let config;
  try {
    config = readStaticConfig(projectRoot);
  } catch {
    p.cancel("static.json not found. Run `init` first.");
    process.exit(1);
  }

  const s = p.spinner();
  s.start("Fetching registry...");

  let registry;
  try {
    registry = await fetchRegistry();
  } catch (err) {
    s.stop("Failed.");
    p.cancel(`Error: ${(err as Error).message}`);
    process.exit(1);
  }

  s.stop("Registry loaded!");

  const uiDir = path.resolve(projectRoot, config.aliases.ui.replace(/^@\//, ""));
  const actualDir = fs.existsSync(path.join(projectRoot, "src"))
    ? path.join(projectRoot, "src", config.aliases.ui.replace(/^@\//, ""))
    : path.join(projectRoot, config.aliases.ui.replace(/^@\//, ""));

  if (!(await fs.pathExists(actualDir))) {
    p.cancel(`Components directory not found at ${config.aliases.ui}`);
    process.exit(1);
  }

  const installedFiles = await fs.readdir(actualDir);
  const updatable: string[] = [];

  for (const file of installedFiles) {
    const name = path.basename(file, path.extname(file));
    const component = getComponent(name, registry);
    if (component) {
      updatable.push(name);
    }
  }

  if (updatable.length === 0) {
    p.outro("No components found that can be updated.");
    return;
  }

  console.log();
  console.log(`  ${color.cyan(`${updatable.length}`)} component(s) can be updated:`);
  for (const name of updatable) {
    console.log(`    ${color.green("■")} ${color.bold(name)}`);
  }
  console.log();

  const proceed = await p.confirm({
    message: `Update ${updatable.length} component(s)?`,
  });

  if (p.isCancel(proceed) || !proceed) {
    p.cancel("Update cancelled.");
    process.exit(0);
  }

  const userUtilsAlias = config.aliases.utils;
  let updated = 0;

  for (const name of updatable) {
    const component = getComponent(name, registry)!;

    for (const file of component.files) {
      const dest = path.join(actualDir, file.name);
      const updatedContent = file.content
        .replace(/from\s+"@\/lib\/utils"/g, `from "${userUtilsAlias}"`)
        .replace(/from\s+"\.\.\/(?:\.\.\/)*lib\/utils"/g, `from "${userUtilsAlias}"`);
      await fs.outputFile(dest, updatedContent, "utf8");
    }

    if (component.dependencies?.length) {
      const pm = fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml")) ? "pnpm add" :
                 fs.existsSync(path.join(projectRoot, "yarn.lock")) ? "yarn add" : "npm install";
      const { execSync } = await import("child_process");
      try {
        execSync(`${pm} ${component.dependencies.join(" ")}`, { cwd: projectRoot, stdio: "ignore" });
      } catch {
        // best-effort
      }
    }

    updated++;
  }

  p.outro(`${color.green("✔")} Updated ${color.bold(String(updated))} component(s).`);
}
