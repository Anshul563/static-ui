import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { readStaticConfig } from "../utils/index.js";
import { fetchRegistry, getComponent } from "../registry/index.js";

export async function diffAction() {
  p.intro(`${color.bgCyan(color.black(" Static UI - Diff "))}`);

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

  const uiDir = config.aliases.ui.replace(/^@\//, "");
  const actualDir = fs.existsSync(path.join(projectRoot, "src"))
    ? path.join(projectRoot, "src", uiDir)
    : path.join(projectRoot, uiDir);

  if (!(await fs.pathExists(actualDir))) {
    p.cancel(`Components directory not found at ${config.aliases.ui}`);
    process.exit(1);
  }

  const installedFiles = await fs.readdir(actualDir);
  const userUtilsAlias = config.aliases.utils;
  let changes = 0;

  for (const file of installedFiles) {
    const ext = path.extname(file);
    if (![".ts", ".tsx", ".js", ".jsx"].includes(ext)) continue;

    const name = path.basename(file, ext);
    const registryItem = getComponent(name, registry);
    if (!registryItem) continue;

    const registryFile = registryItem.files.find((f) => f.name === file);
    if (!registryFile) continue;

    const localPath = path.join(actualDir, file);
    const localContent = await fs.readFile(localPath, "utf8");
    const normalizedContent = registryFile.content
      .replace(/from\s+"@\/lib\/utils"/g, `from "${userUtilsAlias}"`)
      .replace(/from\s+"\.\.\/(?:\.\.\/)*lib\/utils"/g, `from "${userUtilsAlias}"`);

    if (localContent !== normalizedContent) {
      changes++;
      console.log();
      console.log(`  ${color.yellow("Δ")} ${color.bold(name)} (${file})`);

      const localLines = localContent.split("\n");
      const registryLines = normalizedContent.split("\n");
      const maxLen = Math.max(localLines.length, registryLines.length);

      for (let i = 0; i < maxLen; i++) {
        const l = localLines[i] ?? "";
        const r = registryLines[i] ?? "";
        if (l !== r) {
          if (l !== undefined) {
            console.log(`    ${color.red("-")} ${l}`);
          }
          if (r !== undefined) {
            console.log(`    ${color.green("+")} ${r}`);
          }
        }
      }
    }
  }

  if (changes === 0) {
    p.outro(`${color.green("✔")} All components are up to date.`);
  } else {
    console.log();
    p.outro(`${color.yellow(`${changes} file(s) differ from registry.`)}`);
  }
}
