import * as p from "@clack/prompts";
import color from "picocolors";
import { fetchRegistry } from "../registry/index.js";

export async function listAction() {
  p.intro(`${color.bgCyan(color.black(" Static UI - Available Components "))}`);

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

  s.stop(`Found ${registry.length} components`);

  console.log();
  for (const item of registry) {
    const deps = item.dependencies?.length
      ? color.dim(` [${item.dependencies.join(", ")}]`)
      : "";
    console.log(`  ${color.green("■")} ${color.bold(item.name)}${deps}`);
  }
  console.log();

  p.outro(`Total: ${color.cyan(String(registry.length))} components available`);
}
