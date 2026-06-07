import type { FrameworkAdapter } from "./types.js";

export const nuxtAdapter: FrameworkAdapter = {
  id: "nuxt",
  label: "Nuxt",
  detect(deps: Record<string, string>) {
    if (deps["nuxt"]) return 100;
    return 0;
  },
  getVersion(deps) {
    return deps["nuxt"];
  },
  getCssPath() {
    return ["assets/css/main.css", "src/assets/css/main.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/assets/css/main.css`;
  },
  getConfigPaths() {
    return ["nuxt.config.ts", "nuxt.config.js"];
  },
  getComponentExtension() {
    return ".vue";
  },
  getComponentDir(projectRoot: string) {
    return `${projectRoot}/components/static-ui`;
  },
  getUtilsExtension() {
    return ".ts";
  },
  getUtilsImportPath() {
    return "~/lib/utils";
  },
  getPackageManager(projectRoot: string) {
    return "npm";
  },
  getInstallCommand(pm: string, deps: string[]) {
    return `${pm} ${pm === "npm" ? "install" : "add"} ${deps.join(" ")}`;
  },
};
