import type { FrameworkAdapter } from "./types.js";

export const vueAdapter: FrameworkAdapter = {
  id: "vue",
  label: "Vue",
  detect(deps: Record<string, string>) {
    if (deps["vue"] && deps["nuxt"]) return 0;
    if (deps["vue"]) {
      const score = deps["vite"] || deps["@vitejs/plugin-vue"] ? 95 : 80;
      return score;
    }
    return 0;
  },
  getVersion(deps) {
    return deps["vue"];
  },
  getCssPath() {
    return ["src/assets/main.css", "src/assets/css/main.css", "src/styles/globals.css", "src/App.vue"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/src/assets/main.css`;
  },
  getConfigPaths() {
    return ["vite.config.ts", "vite.config.js"];
  },
  getComponentExtension() {
    return ".vue";
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
