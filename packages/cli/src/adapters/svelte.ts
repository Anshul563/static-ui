import type { FrameworkAdapter } from "./types.js";

export const svelteAdapter: FrameworkAdapter = {
  id: "svelte",
  label: "Svelte",
  detect(deps: Record<string, string>) {
    if (deps["svelte"] && deps["@sveltejs/kit"]) return 0;
    if (deps["svelte"]) return 80;
    return 0;
  },
  getVersion(deps) {
    return deps["svelte"];
  },
  getCssPath() {
    return ["src/app.css", "app.css", "src/global.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/src/app.css`;
  },
  getConfigPaths() {
    return ["svelte.config.js", "vite.config.ts"];
  },
  getComponentExtension() {
    return ".svelte";
  },
  getComponentDir(projectRoot: string) {
    return `${projectRoot}/src/lib/components/static-ui`;
  },
  getUtilsExtension() {
    return ".ts";
  },
  getUtilsImportPath() {
    return "$lib/utils";
  },
  getPackageManager(projectRoot: string) {
    return "npm";
  },
  getInstallCommand(pm: string, deps: string[]) {
    return `${pm} ${pm === "npm" ? "install" : "add"} ${deps.join(" ")}`;
  },
};
