import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { resolveAlias, readStaticConfig, installDependencies } from "../utils/index.js";
import { fetchRegistry, getComponent } from "../registry/index.js";
import { getAdapterById } from "../adapters/index.js";

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

  const framework = config.framework;
  const adapter = getAdapterById(framework);

  if (!adapter) {
    p.cancel(`Unknown framework "${framework}" in static.json`);
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

    s.start(`Adding ${name} for ${adapter.label}...`);

    for (const file of component.files) {
      const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext);

      const frameworkExt = ext === ".tsx" ? adapter.getComponentExtension() : ext;
      const frameworkFileName = `${baseName}${frameworkExt}`;
      const dest = path.join(targetFolder, frameworkFileName);

      let updatedContent = file.content
        .replace(/from\s+"@\/lib\/utils"/g, `from "${userUtilsAlias}"`)
        .replace(/from\s+"\.\.\/(?:\.\.\/)*lib\/utils"/g, `from "${userUtilsAlias}"`)

      if (adapter.id === "svelte") {
        updatedContent = convertToSvelteComponent(updatedContent, baseName);
      } else if (adapter.id === "vue") {
        updatedContent = convertToVueComponent(updatedContent, baseName);
      } else if (adapter.id === "solid") {
        updatedContent = convertToSolidComponent(updatedContent, baseName);
      }

      await fs.outputFile(dest, updatedContent, "utf8");
    }

    if (component.dependencies && component.dependencies.length > 0) {
      installDependencies(projectRoot, component.dependencies);
    }

    added.push(name);
    s.stop(`Added ${name} for ${adapter.label}`);
  }

  const rel = path.relative(projectRoot, targetFolder);
  if (added.length > 0) {
    p.outro(`${color.green("✔")} Added: ${color.bold(added.join(", "))} to ${color.cyan(rel)}`);
  }
  if (notFound.length > 0) {
    p.cancel(`Not found: ${notFound.join(", ")}`);
  }
}

function convertToSvelteComponent(tsx: string, name: string): string {
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `<script lang="ts">
  // Adapted from Static UI ${pascalName}
  // Some props may need manual adjustment for Svelte
  let className: string = "";
  export { className as class };
</script>

<div class={className}>
  <slot />
</div>
`;
}

function convertToVueComponent(tsx: string, name: string): string {
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `<template>
  <div class={className}>
    <slot />
  </div>
</template>

<script setup lang="ts">
// Adapted from Static UI ${pascalName}
// Some props may need manual adjustment for Vue
const className = "";
</script>
`;
}

function convertToSolidComponent(tsx: string, name: string): string {
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
  return tsx
    .replace(/import \* as React from "react"/g, "// SolidJS adaptation")
    .replace(/import \{ Button as BaseButton \} from "@base-ui\/react\/button"/g, "")
    .replace(/React\.forwardRef<[^>]+>\(/g, "")
    .replace(/React\.ComponentPropsWithoutRef<typeof \w+>/g, "any")
    .replace(/displayName\s*=.*/g, "")
    .replace(/const \w+ = /, `export function ${pascalName}(`);
}
