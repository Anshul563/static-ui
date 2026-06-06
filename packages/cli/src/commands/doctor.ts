import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { readStaticConfig } from "../utils/index.js";
import { fetchRegistry } from "../registry/index.js";

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

  const deps = { ...(pkg as Record<string, unknown>)["dependencies"] as Record<string, string> || {}, ...(pkg as Record<string, unknown>)["devDependencies"] as Record<string, string> || {} };

  if (deps["react"]) {
    results.push({ name: "React", status: "pass", message: `React ${deps["react"]}` });
  } else {
    results.push({ name: "React", status: "fail", message: "React not found in dependencies" });
  }

  if (deps["tailwindcss"]) {
    results.push({ name: "Tailwind CSS", status: "pass", message: `Tailwind ${deps["tailwindcss"]}` });
  } else {
    results.push({ name: "Tailwind CSS", status: "fail", message: "tailwindcss not installed" });
  }

  let config;
  try {
    config = readStaticConfig(projectRoot);
    results.push({ name: "static.json", status: "pass", message: "Configuration found" });

    const cssPath = path.join(projectRoot, config.aliases.ui.replace(/^@\//, "").replace(/\/static-ui$/, ""), "..", "..");
    const possibleCssFiles = ["src/app/globals.css", "src/styles/globals.css", "app/globals.css", "src/index.css"];
    let foundCss = false;
    for (const f of possibleCssFiles) {
      if (await fs.pathExists(path.join(projectRoot, f))) {
        const content = await fs.readFile(path.join(projectRoot, f), "utf8");
        if (content.includes("@theme inline") || content.includes("--color-background")) {
          foundCss = true;
          results.push({ name: "globals.css", status: "pass", message: `Found at ${f}` });
          break;
        }
      }
    }
    if (!foundCss) {
      results.push({ name: "globals.css", status: "warn", message: "Could not verify Tailwind theme variables in CSS" });
    }
  } catch {
    results.push({ name: "static.json", status: "fail", message: "Not found. Run init first." });
  }

  const tsconfigPath = path.join(projectRoot, "tsconfig.json");
  if (await fs.pathExists(tsconfigPath)) {
    try {
      const tsconfig = await fs.readJson(tsconfigPath);
      const paths_ = (tsconfig.compilerOptions?.paths as Record<string, string[]>) || {};
      const hasAlias = Object.keys(paths_).some((k) => k.startsWith("@"));
      if (hasAlias) {
        results.push({ name: "tsconfig paths", status: "pass", message: "Path aliases configured" });
      } else {
        results.push({ name: "tsconfig paths", status: "warn", message: "No @/ path aliases found" });
      }
    } catch {
      results.push({ name: "tsconfig paths", status: "warn", message: "Could not parse tsconfig.json" });
    }
  } else {
    results.push({ name: "tsconfig paths", status: "warn", message: "No tsconfig.json (JavaScript project)" });
  }

  if (deps["@base-ui/react"]) {
    results.push({ name: "@base-ui/react", status: "pass", message: `v${deps["@base-ui/react"]}` });
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
  p.outro(`${color.green(`${pass} passed`)}${warn > 0 ? `, ${color.yellow(`${warn} warnings`)}` : ""}${fail > 0 ? `, ${color.red(`${fail} failed`)}` : ""}`);
}
