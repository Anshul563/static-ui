import fs from "fs-extra";
import path from "path";
import type { FrameworkAdapter, DetectionResult } from "./types.js";
import { reactAdapter } from "./react.js";
import { nextjsAdapter } from "./nextjs.js";
import { vueAdapter } from "./vue.js";
import { nuxtAdapter } from "./nuxt.js";
import { solidAdapter } from "./solid.js";
import { svelteAdapter } from "./svelte.js";
import { astroAdapter } from "./astro.js";
import { remixAdapter } from "./remix.js";

const allAdapters: FrameworkAdapter[] = [
  nextjsAdapter,
  remixAdapter,
  nuxtAdapter,
  astroAdapter,
  vueAdapter,
  solidAdapter,
  svelteAdapter,
  reactAdapter,
];

export function getAdapterById(id: string): FrameworkAdapter | undefined {
  return allAdapters.find((a) =>
    a.id === id ||
    a.label.toLowerCase() === id.toLowerCase() ||
    a.id.toLowerCase() === id.toLowerCase()
  );
}

export function getAllAdapters(): FrameworkAdapter[] {
  return [...allAdapters];
}

function readDeps(projectRoot: string): Record<string, string> {
  try {
    const pkgPath = path.join(projectRoot, "package.json");
    if (!fs.existsSync(pkgPath)) return {};
    const pkg = fs.readJsonSync(pkgPath);
    return { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  } catch {
    return {};
  }
}

export function detectFramework(projectRoot: string): DetectionResult | null {
  const deps = readDeps(projectRoot);

  const scored = allAdapters
    .map((adapter) => ({
      adapter,
      score: adapter.detect(deps, projectRoot),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const best = scored[0];
  const isTypeScript = fs.existsSync(path.join(projectRoot, "tsconfig.json")) || !!deps["typescript"];
  const hasTailwind = !!deps["tailwindcss"] || fs.existsSync(path.join(projectRoot, "tailwind.config.ts")) || fs.existsSync(path.join(projectRoot, "tailwind.config.js"));

  return {
    framework: best.adapter,
    version: best.adapter.getVersion?.(deps),
    isTypeScript,
    hasTailwind,
  };
}

export function detectAllFrameworks(projectRoot: string): Array<{ adapter: FrameworkAdapter; score: number }> {
  const deps = readDeps(projectRoot);
  return allAdapters
    .map((adapter) => ({
      adapter,
      score: adapter.detect(deps, projectRoot),
    }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
}
