import type { FrameworkAdapter } from "./types.js";

export const solidAdapter: FrameworkAdapter = {
  id: "solid",
  label: "SolidJS",
  detect(deps: Record<string, string>) {
    if (deps["solid-js"]) return 90;
    if (deps["solid-js"] && deps["vite"]) return 100;
    return 0;
  },
  getVersion(deps) {
    return deps["solid-js"];
  },
  getCssPath() {
    return ["src/index.css", "src/App.css", "app.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/src/index.css`;
  },
  getConfigPaths() {
    return ["vite.config.ts", "vite.config.js"];
  },
  getComponentExtension() {
    return ".tsx";
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
