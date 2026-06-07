import type { FrameworkAdapter } from "./types.js";

export const reactAdapter: FrameworkAdapter = {
  id: "react",
  label: "React",
  detect(deps: Record<string, string>) {
    if (deps["react"] && !deps["next"]) return 80;
    if (deps["react"] && (deps["vite"] || deps["@vitejs/plugin-react"] || deps["react-scripts"] || deps["webpack"] || deps["parcel"])) return 90;
    if (deps["react"]) return 60;
    return 0;
  },
  getVersion(deps) {
    return deps["react"];
  },
  getCssPath() {
    return ["src/index.css", "src/App.css", "src/styles/globals.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/src/index.css`;
  },
  getConfigPaths() {
    return ["vite.config.ts", "vite.config.js", "craco.config.js"];
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
