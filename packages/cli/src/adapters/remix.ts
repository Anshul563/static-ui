import type { FrameworkAdapter } from "./types.js";

export const remixAdapter: FrameworkAdapter = {
  id: "remix",
  label: "Remix",
  detect(deps: Record<string, string>) {
    if (deps["@remix-run/react"]) return 100;
    if (deps["remix"]) return 80;
    return 0;
  },
  getVersion(deps) {
    return deps["@remix-run/react"] || deps["remix"];
  },
  getCssPath() {
    return ["app/globals.css", "app/styles/globals.css", "src/globals.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/app/globals.css`;
  },
  getConfigPaths() {
    return ["remix.config.js", "vite.config.ts"];
  },
  getComponentExtension() {
    return ".tsx";
  },
  getComponentDir(projectRoot: string) {
    return `${projectRoot}/app/components/static-ui`;
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
