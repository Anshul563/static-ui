import fs from "fs-extra";
import path from "path";

export const REGISTRY_URL = "https://unpkg.com/@static-ui/registry@latest/dist/index.json";

export interface RegistryFile {
  name: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  dependencies: string[];
  files: RegistryFile[];
}

export async function fetchRegistry(url?: string): Promise<RegistryItem[]> {
  const registryUrl = url || REGISTRY_URL;
  try {
    const response = await fetch(registryUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as RegistryItem[];
  } catch {
    const fallbackPath = path.resolve(process.cwd(), "../registry/dist/index.json");
    if (await fs.pathExists(fallbackPath)) {
      return (await fs.readJson(fallbackPath)) as RegistryItem[];
    }
    throw new Error("Failed to fetch registry and no fallback available.");
  }
}

export function getComponent(name: string, registry: RegistryItem[]): RegistryItem | undefined {
  return registry.find((item) => item.name.toLowerCase() === name.toLowerCase());
}
