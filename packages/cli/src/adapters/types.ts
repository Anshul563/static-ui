export type FrameworkId =
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt"
  | "solid"
  | "svelte"
  | "astro"
  | "remix";

export interface FrameworkInfo {
  id: FrameworkId;
  label: string;
  detected: boolean;
  version?: string;
}

export interface FrameworkAdapter {
  id: FrameworkId;
  label: string;
  detect(deps: Record<string, string>, projectRoot: string): number;
  getVersion?(deps: Record<string, string>): string | undefined;
  getCssPath(projectRoot: string): string[];
  getThemeCssPath(projectRoot: string): string;
  getConfigPaths(): string[];
  getComponentExtension(): string;
  getComponentDir(projectRoot: string, alias?: string): string;
  getUtilsExtension(): string;
  getUtilsImportPath(): string;
  getPackageManager(projectRoot: string): string;
  getInstallCommand(pm: string, deps: string[]): string;
}

export interface DetectionResult {
  framework: FrameworkAdapter;
  version?: string;
  isTypeScript: boolean;
  hasTailwind: boolean;
}

export const ALL_FRAMEWORKS: FrameworkId[] = [
  "react",
  "nextjs",
  "vue",
  "nuxt",
  "solid",
  "svelte",
  "astro",
  "remix",
];
