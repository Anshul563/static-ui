import fs from "fs-extra";
import path from "path";

const UI_DIR = path.resolve(process.cwd(), "../ui/src");
const REGISTRY_META = path.join(process.cwd(), "registry.json");
const BLOCKS_DIR = path.join(process.cwd(), "src/blocks");
const TEMPLATES_DIR = path.join(process.cwd(), "src/templates");
const OUTPUT_DIR = path.join(process.cwd(), "dist");

const COMPONENT_DEPENDENCY_OVERRIDES: Record<string, string[]> = {
  button: ["@base-ui/react", "class-variance-authority"],
  badge: ["class-variance-authority"],
  dialog: ["@base-ui/react"],
  checkbox: ["@base-ui/react"],
  popover: ["@base-ui/react"],
  "dropdown-menu": ["@base-ui/react"],
  tabs: ["@base-ui/react"],
  avatar: ["@base-ui/react"],
  progress: ["@base-ui/react"],
  tooltip: ["@base-ui/react"],
  spinner: [],
  breadcrumb: [],
  pagination: [],
  label: [],
  input: [],
  textarea: [],
  "input-group": [],
  card: [],
  "aspect-ratio": [],
  alert: [],
  "alert-dialog": ["@base-ui/react"],
  "input-otp": [],
  "radio-group": ["@base-ui/react"],
  sidebar: [],
  toast: [],
  sonner: [],
  "scroll-area": ["@base-ui/react"],
  table: [],
  "number-field": ["@base-ui/react"],
  toggle: ["@base-ui/react", "class-variance-authority"],
  "toggle-group": ["@base-ui/react"],
  select: ["@base-ui/react"],
  skeleton: [],
  typography: [],
  carousel: [],
  "hover-card": ["@base-ui/react"],
  calendar: [],
  drawer: ["@base-ui/react"],
  "context-menu": ["@base-ui/react"],
  separator: [],
  kbd: [],
  collapsible: ["@base-ui/react"],
  slider: ["@base-ui/react"],
  switch: ["@base-ui/react"],
};

interface RegistryMetadata {
  name: string;
  version: string;
  description: string;
  categories: Record<string, { label: string; description: string }>;
  components: RegistryEntry[];
  blocks: RegistryEntry[];
  templates: RegistryEntry[];
}

interface RegistryEntry {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: string[];
  categories?: string[];
}

interface BuildItem {
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { name: string; content: string }[];
}

async function buildRegistry() {
  try {
    await fs.ensureDir(OUTPUT_DIR);

    const meta: RegistryMetadata = await fs.readJson(REGISTRY_META);

    const buildItems: BuildItem[] = [];

    // --- UI components ---
    if (!(await fs.pathExists(UI_DIR))) {
      throw new Error(`UI source directory not found at: ${UI_DIR}`);
    }

    const uiFiles = await fs.readdir(UI_DIR);
    for (const file of uiFiles) {
      if (!file.endsWith(".tsx")) continue;

      const rawName = path.basename(file, ".tsx");
      const normalizedName = rawName.toLowerCase();
      const filePath = path.join(UI_DIR, file);
      const content = await fs.readFile(filePath, "utf8");
      const dependencies = COMPONENT_DEPENDENCY_OVERRIDES[normalizedName] || ["@base-ui/react"];

      const metaEntry = meta.components.find((c) => c.name === normalizedName);

      buildItems.push({
        name: normalizedName,
        type: "components:ui",
        dependencies,
        registryDependencies: metaEntry?.registryDependencies ?? [],
        files: [{ name: file, content }],
      });
    }

    // --- Blocks ---
    if (await fs.pathExists(BLOCKS_DIR)) {
      const blockFiles = await fs.readdir(BLOCKS_DIR);
      for (const file of blockFiles) {
        if (!file.endsWith(".tsx")) continue;

        const rawName = path.basename(file, ".tsx");
        const filePath = path.join(BLOCKS_DIR, file);
        const content = await fs.readFile(filePath, "utf8");
        const metaEntry = meta.blocks.find((b) => b.name === rawName);

        buildItems.push({
          name: rawName,
          type: "components:block",
          dependencies: metaEntry?.dependencies ?? [],
          registryDependencies: metaEntry?.registryDependencies ?? [],
          files: [{ name: `blocks/${file}`, content }],
        });
      }
    }

    // --- Templates ---
    if (await fs.pathExists(TEMPLATES_DIR)) {
      const templateFiles = await fs.readdir(TEMPLATES_DIR);
      for (const file of templateFiles) {
        if (!file.endsWith(".tsx")) continue;

        const rawName = path.basename(file, ".tsx");
        const filePath = path.join(TEMPLATES_DIR, file);
        const content = await fs.readFile(filePath, "utf8");
        const metaEntry = meta.templates.find((t) => t.name === rawName);

        buildItems.push({
          name: rawName,
          type: "components:template",
          dependencies: metaEntry?.dependencies ?? [],
          registryDependencies: metaEntry?.registryDependencies ?? [],
          files: [{ name: `templates/${file}`, content }],
        });
      }
    }

    await fs.outputJson(path.join(OUTPUT_DIR, "index.json"), buildItems, { spaces: 2 });

    console.log(
      `\u2705 Registry generated from @static-ui/ui! (${buildItems.length} items: UI components + blocks + templates)`,
    );
  } catch (error) {
    console.error("\u274c Failed to build registry:", error);
    process.exit(1);
  }
}

buildRegistry();
