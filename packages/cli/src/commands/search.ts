import * as p from "@clack/prompts";
import color from "picocolors";
import { fetchRegistry } from "../registry/index.js";

export async function searchAction(query?: string) {
  if (!query) {
    p.cancel("Please provide a search query.");
    process.exit(1);
  }

  p.intro(`${color.bgCyan(color.black(" Static UI - Search "))}`);

  const s = p.spinner();
  s.start("Searching registry...");

  let registry;
  try {
    registry = await fetchRegistry();
  } catch (err) {
    s.stop("Failed.");
    p.cancel(`Error: ${(err as Error).message}`);
    process.exit(1);
  }

  const q = query.toLowerCase();
  const results = registry.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.dependencies?.some((d) => d.toLowerCase().includes(q))
  );

  s.stop(`Found ${results.length} match(es)`);

  if (results.length === 0) {
    p.outro(`No components matching "${query}"`);
    return;
  }

  console.log();
  for (const item of results) {
    const deps = item.dependencies?.length
      ? color.dim(` [${item.dependencies.join(", ")}]`)
      : "";
    console.log(`  ${color.green("■")} ${color.bold(item.name)}${deps}`);
  }
  console.log();

  p.outro(`Showing ${color.cyan(String(results.length))} result(s) for "${query}"`);
}
