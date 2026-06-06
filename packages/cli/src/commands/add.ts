import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { resolveAlias, readStaticConfig, installDependencies } from "../utils/index.js";
import { fetchRegistry, getComponent } from "../registry/index.js";

export async function addAction(componentNames: string[]) {
  p.intro(`${color.bgCyan(color.black(" Static UI - Add Components "))}`);

  const projectRoot = process.cwd();
  let config;
  try {
    config = readStaticConfig(projectRoot);
  } catch {
    p.cancel("static.json not found. Run `static-ui init` first.");
    process.exit(1);
  }

  const s = p.spinner();
  s.start("Fetching registry...");

  let registry;
  try {
    registry = await fetchRegistry();
  } catch (err) {
    s.stop("Failed.");
    p.cancel(`Registry error: ${(err as Error).message}`);
    process.exit(1);
  }

  s.stop("Registry loaded!");

  const targetFolder = resolveAlias(projectRoot, config.aliases.ui);
  await fs.ensureDir(targetFolder);

  let names = componentNames;
  if (names.length === 1 && names[0].toLowerCase() === "all") {
    names = registry.map((item) => item.name);
  }

  const added: string[] = [];
  const notFound: string[] = [];
  const userUtilsAlias = config.aliases.utils;

  for (const name of names) {
    const component = getComponent(name, registry);
    if (!component) {
      notFound.push(name);
      continue;
    }

    s.start(`Adding ${name}...`);

    for (const file of component.files) {
      const dest = path.join(targetFolder, file.name);
      const updatedContent = file.content
        .replace(/from\s+"@\/lib\/utils"/g, `from "${userUtilsAlias}"`)
        .replace(/from\s+"\.\.\/(?:\.\.\/)*lib\/utils"/g, `from "${userUtilsAlias}"`);
      await fs.outputFile(dest, updatedContent, "utf8");
    }

    if (component.dependencies && component.dependencies.length > 0) {
      installDependencies(projectRoot, component.dependencies);
    }

    added.push(name);
    s.stop(`Added ${name}`);
  }

  const rel = path.relative(projectRoot, targetFolder);
  if (added.length > 0) {
    p.outro(`${color.green("✔")} Added: ${color.bold(added.join(", "))} to ${color.cyan(rel)}`);
  }
  if (notFound.length > 0) {
    p.cancel(`Not found: ${notFound.join(", ")}`);
  }
}
