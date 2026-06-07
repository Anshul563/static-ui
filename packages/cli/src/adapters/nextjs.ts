import type { FrameworkAdapter } from "./types.js";

export const nextjsAdapter: FrameworkAdapter = {
  id: "nextjs",
  label: "Next.js",
  detect(deps: Record<string, string>) {
    if (deps["next"]) return 100;
    return 0;
  },
  getVersion(deps) {
    return deps["next"];
  },
  getCssPath() {
    return ["app/globals.css", "src/app/globals.css", "styles/globals.css", "src/styles/globals.css"];
  },
  getThemeCssPath(projectRoot: string) {
    return `${projectRoot}/app/globals.css`;
  },
  getConfigPaths() {
    return ["next.config.ts", "next.config.js", "next.config.mjs"];
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
