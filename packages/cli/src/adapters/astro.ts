import type { FrameworkAdapter } from "./types.js";

export const astroAdapter: FrameworkAdapter = {
  id: "astro",
  label: "Astro",
  detect(deps: Record<string, string>) {
    if (deps["astro"]) return 100;
    return 0;
  },
  getVersion(deps) {
    return deps["astro"];
  },
  getCssPath() {
    return ["src/styles/globals.css", "src/globals.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/src/styles/globals.css`;
  },
  getConfigPaths() {
    return ["astro.config.mjs", "astro.config.ts"];
  },
  getComponentExtension() {
    return ".astro";
  },
  getComponentDir(projectRoot: string) {
    return `${projectRoot}/src/components/static-ui`;
  },
  getUtilsExtension() {
    return ".ts";
  },
  getUtilsImportPath() {
    return "@/lib/utils";
  },
  getPackageManager(projectRoot: string) {
    return "npm";
  },
  getInstallCommand(pm: string, deps: string[]) {
    return `${pm} ${pm === "npm" ? "install" : "add"} ${deps.join(" ")}`;
  },
};
