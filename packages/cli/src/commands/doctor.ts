import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { readStaticConfig } from "../utils/index.js";
import { fetchRegistry } from "../registry/index.js";
import { detectFramework, getAdapterById, getAllAdapters } from "../adapters/index.js";

interface CheckResult {
  name: string;
  status: "pass" | "fail" | "warn";
  message: string;
}

export async function doctorAction() {
  p.intro(`${color.bgCyan(color.black(" Static UI - Doctor "))}`);

  const projectRoot = process.cwd();
  const results: CheckResult[] = [];

  const s = p.spinner();
  s.start("Running diagnostics...");

  const pkgPath = path.join(projectRoot, "package.json");
  let pkg: Record<string, unknown> = {};
  if (await fs.pathExists(pkgPath)) {
    pkg = await fs.readJson(pkgPath);
  }

  const deps = {
    ...(pkg as Record<string, unknown>)["dependencies"] as Record<string, string> || {},
    ...(pkg as Record<string, unknown>)["devDependencies"] as Record<string, string> || {},
  };

  const detection = detectFramework(projectRoot);

  if (detection) {
    results.push({
      name: "Framework",
      status: "pass",
      message: `${detection.framework.label} ${detection.version ? `v${detection.version}` : ""}`,
    });
  } else {
    results.push({ name: "Framework", status: "fail", message: "Could not detect framework" });
  }

  const pkgManager = deps["pnpm"] ? "pnpm" : deps["yarn"] ? "yarn" : deps["bun"] ? "bun" : "npm";
  results.push({ name: "Package Manager", status: "pass", message: pkgManager });

  if (detection?.isTypeScript || deps["typescript"]) {
    results.push({
      name: "TypeScript",
      status: "pass",
      message: deps["typescript"] ? `v${deps["typescript"]}` : "Detected",
    });
  } else {
    results.push({ name: "TypeScript", status: "warn", message: "Not detected" });
  }

  if (deps["tailwindcss"]) {
    results.push({ name: "Tailwind CSS", status: "pass", message: `v${deps["tailwindcss"]}` });
  } else {
    results.push({ name: "Tailwind CSS", status: "fail", message: "tailwindcss not installed" });
  }

  let config;
  try {
    config = readStaticConfig(projectRoot);
    results.push({ name: "static.json", status: "pass", message: "Configuration found" });

    const adapter = getAdapterById(config.framework);
    if (adapter) {
      const possibleCssFiles = adapter.getCssPath(projectRoot).map((c: string) => c);
      let foundCss = false;
      for (const f of possibleCssFiles) {
        const fullPath = path.isAbsolute(f) ? f : path.join(projectRoot, f);
        if (await fs.pathExists(fullPath)) {
          try {
            const content = await fs.readFile(fullPath, "utf8");
            if (content.includes("@theme inline") || content.includes("--color-background")) {
              foundCss = true;
              results.push({ name: "Theme CSS", status: "pass", message: `Found at ${f}` });
              break;
            }
          } catch { }
        }
      }
      if (!foundCss) {
        results.push({ name: "Theme CSS", status: "warn", message: "Could not verify theme variables in CSS" });
      }
    }
  } catch {
    results.push({ name: "static.json", status: "fail", message: "Not found. Run init first." });
  }

  const tsconfigPath = path.join(projectRoot, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    try {
      const tsconfig = await fs.readJson(tsconfigPath);
      const paths_ = (tsconfig.compilerOptions?.paths as Record<string, string[]>) || {};
      const hasAlias = Object.keys(paths_).some((k) => k.startsWith("@") || k.startsWith("~"));
      if (hasAlias) {
        results.push({ name: "Path aliases", status: "pass", message: "Configured in tsconfig" });
      } else {
        results.push({ name: "Path aliases", status: "warn", message: "No @/~ path aliases found" });
      }
    } catch {
      results.push({ name: "Path aliases", status: "warn", message: "Could not parse tsconfig.json" });
    }
  } else {
    results.push({ name: "Path aliases", status: "warn", message: "No tsconfig.json (JS project)" });
  }

  if (config?.theme) {
    const themePath = path.join(projectRoot, "..", "packages", "themes", `${config.theme}.json`);
    const wwwThemePath = path.join(projectRoot, "..", "..", "packages", "themes", `${config.theme}.json`);
    if (await fs.pathExists(themePath) || await fs.pathExists(wwwThemePath)) {
      results.push({ name: "Theme", status: "pass", message: `"${config.theme}" found` });
    } else {
      results.push({ name: "Theme", status: "warn", message: `"${config.theme}" theme (remote ok)` });
    }
  }

  if (deps["@base-ui/react"]) {
    results.push({ name: "@base-ui/react", status: "pass", message: `v${deps["@base-ui/react"]}` });
  } else if (["vue", "nuxt", "solid", "svelte"].includes(config?.framework || "")) {
    results.push({ name: "@base-ui/react", status: "pass", message: "Not required for framework" });
  } else {
    results.push({ name: "@base-ui/react", status: "warn", message: "Not installed (optional)" });
  }

  try {
    await fetchRegistry();
    results.push({ name: "Registry", status: "pass", message: "Reachable" });
  } catch {
    results.push({ name: "Registry", status: "fail", message: "Could not fetch registry" });
  }

  s.stop("Diagnostics complete!");

  console.log();
  for (const r of results) {
    const icon = r.status === "pass" ? color.green("✓") : r.status === "warn" ? color.yellow("!") : color.red("✗");
    const label = r.status === "pass" ? color.green(r.name) : r.status === "warn" ? color.yellow(r.name) : color.red(r.name);
    console.log(`  ${icon} ${label}: ${r.message}`);
  }
  console.log();

  const pass = results.filter((r) => r.status === "pass").length;
  const warn = results.filter((r) => r.status === "warn").length;
  const fail = results.filter((r) => r.status === "fail").length;
  const total = results.length;
  const score = Math.round((pass / total) * 100);

  p.outro(
    `${color.bold(`Project Health Score: ${score}/100`)}\n` +
    `${color.green(`${pass} passed`)}${warn > 0 ? `, ${color.yellow(`${warn} warnings`)}` : ""}${fail > 0 ? `, ${color.red(`${fail} failed`)}` : ""}`
  );
}
