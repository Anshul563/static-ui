import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { resolveAlias, getPackageManager, installDependencies } from "../utils/index.js";
import { banner } from "../logger/index.js";
import {
  selectFramework,
  selectLanguage,
  selectLibrary,
  selectTheme,
} from "../prompts/index.js";
import { detectFramework, getAdapterById } from "../adapters/index.js";
import { fetchRegistry, filterRegistryByFramework } from "../registry/index.js";

interface ThemeManifestEntry {
  label: string;
  sansFont: string;
  monoFont: string;
  cssVars: Record<string, string>;
  darkCssVars: Record<string, string>;
}

const THEMES: Record<string, ThemeManifestEntry> = {
  green: {
    label: "Green",
    sansFont: "Geist, system-ui, sans-serif",
    monoFont: "Geist Mono, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.505 0.213 145.6)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)",
      "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)",
      "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)",
      "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.505 0.213 145.6)",
    },
    darkCssVars: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.505 0.213 145.6)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)",
      "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.505 0.213 145.6)",
    },
  },
  blue: {
    label: "Blue",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "JetBrains Mono, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.546 0.245 262.881)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)",
      "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)",
      "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)",
      "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.546 0.245 262.881)",
    },
    darkCssVars: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.546 0.245 262.881)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)",
      "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.546 0.245 262.881)",
    },
  },
  zinc: {
    label: "Zinc",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "JetBrains Mono, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.205 0.042 265.755)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)",
      "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)",
      "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)",
      "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.205 0.042 265.755)",
    },
    darkCssVars: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.985 0 0)",
      "--primary-foreground": "oklch(0.205 0.042 265.755)",
      "--secondary": "oklch(0.269 0.015 286.375)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)",
      "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.439 0.043 257.281)",
    },
  },
  slate: {
    label: "Slate",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "JetBrains Mono, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.129 0.042 264.695)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.129 0.042 264.695)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.129 0.042 264.695)",
      "--primary": "oklch(0.129 0.042 264.695)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.968 0.007 264.518)",
      "--secondary-foreground": "oklch(0.129 0.042 264.695)",
      "--muted": "oklch(0.968 0.007 264.518)",
      "--muted-foreground": "oklch(0.554 0.046 257.417)",
      "--accent": "oklch(0.968 0.007 264.518)",
      "--accent-foreground": "oklch(0.129 0.042 264.695)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.929 0.013 255.508)",
      "--input": "oklch(0.929 0.013 255.508)",
      "--ring": "oklch(0.129 0.042 264.695)",
    },
    darkCssVars: {
      "--background": "oklch(0.129 0.042 264.695)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.129 0.042 264.695)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.129 0.042 264.695)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.985 0 0)",
      "--primary-foreground": "oklch(0.129 0.042 264.695)",
      "--secondary": "oklch(0.279 0.041 260.031)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.279 0.041 260.031)",
      "--muted-foreground": "oklch(0.704 0.04 256.788)",
      "--accent": "oklch(0.279 0.041 260.031)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.279 0.041 260.031)",
      "--input": "oklch(0.279 0.041 260.031)",
      "--ring": "oklch(0.704 0.04 256.788)",
    },
  },
  gaming: {
    label: "Gaming (Neon)",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "Fira Code, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(0 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.15 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.15 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.72 0.22 150)",
      "--primary-foreground": "oklch(0 0 0)",
      "--secondary": "oklch(0.25 0 0)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.25 0 0)",
      "--muted-foreground": "oklch(0.6 0 0)",
      "--accent": "oklch(0.72 0.22 290)",
      "--accent-foreground": "oklch(0 0 0)",
      "--destructive": "oklch(0.7 0.25 20)",
      "--destructive-foreground": "oklch(0 0 0)",
      "--border": "oklch(0.3 0 0)",
      "--input": "oklch(0.3 0 0)",
      "--ring": "oklch(0.72 0.22 150)",
    },
    darkCssVars: {
      "--background": "oklch(0 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.15 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.15 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.72 0.22 150)",
      "--primary-foreground": "oklch(0 0 0)",
      "--secondary": "oklch(0.25 0 0)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.25 0 0)",
      "--muted-foreground": "oklch(0.6 0 0)",
      "--accent": "oklch(0.72 0.22 290)",
      "--accent-foreground": "oklch(0 0 0)",
      "--destructive": "oklch(0.7 0.25 20)",
      "--destructive-foreground": "oklch(0 0 0)",
      "--border": "oklch(0.3 0 0)",
      "--input": "oklch(0.3 0 0)",
      "--ring": "oklch(0.72 0.22 150)",
    },
  },
  cyberpunk: {
    label: "Cyberpunk",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "Fira Code, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(0.1 0.03 280)",
      "--foreground": "oklch(0.95 0 0)",
      "--card": "oklch(0.15 0.05 280)",
      "--card-foreground": "oklch(0.95 0 0)",
      "--popover": "oklch(0.15 0.05 280)",
      "--popover-foreground": "oklch(0.95 0 0)",
      "--primary": "oklch(0.75 0.25 60)",
      "--primary-foreground": "oklch(0.1 0 0)",
      "--secondary": "oklch(0.25 0.05 280)",
      "--secondary-foreground": "oklch(0.95 0 0)",
      "--muted": "oklch(0.25 0.05 280)",
      "--muted-foreground": "oklch(0.6 0.02 280)",
      "--accent": "oklch(0.65 0.3 320)",
      "--accent-foreground": "oklch(0.95 0 0)",
      "--destructive": "oklch(0.7 0.25 20)",
      "--destructive-foreground": "oklch(0.95 0 0)",
      "--border": "oklch(0.3 0.08 280)",
      "--input": "oklch(0.3 0.08 280)",
      "--ring": "oklch(0.75 0.25 60)",
    },
    darkCssVars: {
      "--background": "oklch(0.1 0.03 280)",
      "--foreground": "oklch(0.95 0 0)",
      "--card": "oklch(0.15 0.05 280)",
      "--card-foreground": "oklch(0.95 0 0)",
      "--popover": "oklch(0.15 0.05 280)",
      "--popover-foreground": "oklch(0.95 0 0)",
      "--primary": "oklch(0.75 0.25 60)",
      "--primary-foreground": "oklch(0.1 0 0)",
      "--secondary": "oklch(0.25 0.05 280)",
      "--secondary-foreground": "oklch(0.95 0 0)",
      "--muted": "oklch(0.25 0.05 280)",
      "--muted-foreground": "oklch(0.6 0.02 280)",
      "--accent": "oklch(0.65 0.3 320)",
      "--accent-foreground": "oklch(0.95 0 0)",
      "--destructive": "oklch(0.7 0.25 20)",
      "--destructive-foreground": "oklch(0.95 0 0)",
      "--border": "oklch(0.3 0.08 280)",
      "--input": "oklch(0.3 0.08 280)",
      "--ring": "oklch(0.75 0.25 60)",
    },
  },
  modern: {
    label: "Modern",
    sansFont: "Inter, system-ui, sans-serif",
    monoFont: "JetBrains Mono, ui-monospace, monospace",
    cssVars: {
      "--background": "oklch(1 0 0)",
      "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)",
      "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)",
      "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.45 0.24 277)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)",
      "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)",
      "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)",
      "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.45 0.24 277)",
    },
    darkCssVars: {
      "--background": "oklch(0.145 0 0)",
      "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)",
      "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)",
      "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.68 0.22 277)",
      "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)",
      "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)",
      "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)",
      "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)",
      "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)",
      "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.68 0.22 277)",
    },
  },
};

function buildCssContent(theme: ThemeManifestEntry, themeName: string): string {
  const lightVars = Object.entries(theme.cssVars).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  const darkVars = Object.entries(theme.darkCssVars).map(([k, v]) => `  ${k}: ${v};`).join("\n");

  return `@import "tailwindcss";

/* Static UI - Theme: ${themeName.toUpperCase()} */
/* Font Sans: ${theme.sansFont} */
/* Font Mono: ${theme.monoFont} */

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: ${theme.sansFont};
  --font-mono: ${theme.monoFont};

  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);

  --radius: 0.5rem;
}

:root {
${lightVars}
}

.dark {
${darkVars}
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }

  :root {
    --chart-1: oklch(0.646 0.222 41.116);
    --chart-2: oklch(0.6 0.118 184.704);
    --chart-3: oklch(0.398 0.07 227.392);
    --chart-4: oklch(0.828 0.189 84.429);
    --chart-5: oklch(0.769 0.188 70.08);
  }

  .dark {
    --chart-1: oklch(0.488 0.243 264.376);
    --chart-2: oklch(0.696 0.17 162.48);
    --chart-3: oklch(0.769 0.188 70.08);
    --chart-4: oklch(0.627 0.265 303.9);
    --chart-5: oklch(0.645 0.246 16.439);
  }
}`;
}

export async function initAction() {
  banner();
  p.intro(`${color.bgCyan(color.black(" Static UI - Project Initialization "))}`);

  const projectRoot = process.cwd();

  const hasPackageJson = await fs.pathExists(path.join(projectRoot, "package.json"));
  if (!hasPackageJson) {
    p.cancel("package.json not found. Run from your project root.");
    process.exit(1);
  }

  const pkg = await fs.readJson(path.join(projectRoot, "package.json"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  const detection = detectFramework(projectRoot);

  if (detection) {
    const routerType = detection.framework.id === "nextjs"
      ? (await fs.pathExists(path.join(projectRoot, "src/app")) ||
         await fs.pathExists(path.join(projectRoot, "app")))
        ? "App Router"
        : "Pages Router"
      : "N/A";

    p.note(
      `Detected:\n` +
      `${color.green("✓")} package.json detected\n` +
      `${color.green("✓")} Framework detected: ${color.cyan(detection.framework.label)}${detection.version ? ` ${color.dim(detection.version)}` : ""}\n` +
      `${detection.isTypeScript ? color.green("✓") : color.yellow("!")} ${detection.isTypeScript ? "TypeScript detected" : "JavaScript detected"}\n` +
      `${detection.hasTailwind ? color.green("✓") : color.yellow("!")} ${detection.hasTailwind ? "Tailwind detected" : "Tailwind not detected"}`,
      "Project Scan"
    );

    const proceed = await p.confirm({
      message: `Continue with ${detection.framework.label}?`,
    });

    if (p.isCancel(proceed) || !proceed) {
      const manualFramework = await selectFramework();
      const adapter = getAdapterById(manualFramework);
      const language = await selectLanguage();
      const library = await selectLibrary();
      const themeName = await selectTheme();

      await runInit(projectRoot, adapter!.id, routerType, language, library, themeName);
      return;
    }

    const language = detection.isTypeScript ? "typescript" : "javascript";
    const library = "static-ui";
    const themeName = await selectTheme();

    await runInit(projectRoot, detection.framework.id, routerType, language, library, themeName);
  } else {
    p.note(
      `${color.yellow("!")} Could not detect framework.\n` +
      `Please select manually.`,
      "Project Scan"
    );

    const manualFramework = await selectFramework();
    const adapter = getAdapterById(manualFramework);
    const language = await selectLanguage();
    const library = await selectLibrary();
    const themeName = await selectTheme();

    await runInit(projectRoot, adapter!.id, "N/A", language, library, themeName);
  }
}

async function runInit(
  projectRoot: string,
  framework: string,
  routerType: string,
  language: string,
  library: string,
  themeName: string,
) {
  const defaultCssPath = framework === "nextjs" && routerType === "App Router"
    ? "app/globals.css"
    : ["vue", "nuxt"].includes(framework)
      ? "src/assets/main.css"
      : framework === "svelte"
        ? "src/app.css"
        : framework === "solid" || framework === "react"
          ? "src/index.css"
          : framework === "astro"
            ? "src/styles/globals.css"
            : framework === "remix"
              ? "app/globals.css"
              : "src/styles/globals.css";

  const paths = await p.group(
    {
      componentAlias: () =>
        p.text({
          message: "Component import alias:",
          placeholder: "@/components",
          initialValue: "@/components",
        }),
      utilsAlias: () =>
        p.text({
          message: "Utils import alias:",
          placeholder: "@/lib/utils",
          initialValue: "@/lib/utils",
        }),
      tailwindCss: () =>
        p.text({
          message: "Global CSS file path:",
          placeholder: defaultCssPath,
          initialValue: defaultCssPath,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Cancelled.");
        process.exit(0);
      },
    }
  );

  const config = {
    $schema: "https://staticui.dev/schema.json",
    framework,
    routerType,
    language,
    theme: themeName,
    library,
    aliases: {
      components: paths.componentAlias,
      ui: `${paths.componentAlias}/static-ui`,
      utils: paths.utilsAlias,
    },
  };

  const spin = p.spinner();

  spin.start("Writing static.json...");
  await fs.outputJson(path.join(projectRoot, "static.json"), config, { spaces: 2 });
  spin.stop("static.json created!");

  spin.start("Generating utility function...");
  const ext = language === "typescript" ? "ts" : "js";
  const utilsPath = resolveAlias(projectRoot, paths.utilsAlias);
  const utilsFile = utilsPath.endsWith(`.${ext}`) ? utilsPath : `${utilsPath}.${ext}`;
  const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
  await fs.outputFile(utilsFile, utilsContent, "utf8");
  spin.stop(`Created ${path.relative(projectRoot, utilsFile)}`);

  spin.start("Injecting global CSS...");
  const theme = THEMES[themeName];
  const cssContent = buildCssContent(theme, themeName);
  const cssPath = path.join(projectRoot, paths.tailwindCss);
  await fs.outputFile(cssPath, cssContent, "utf8");
  spin.stop(`Updated ${path.relative(projectRoot, cssPath)}`);

  // Fetch registry and install all components
  spin.start("Fetching component registry...");
  let registry;
  try {
    registry = await fetchRegistry();
  } catch (err) {
    spin.stop("Failed to fetch registry.");
    p.cancel(`Registry error: ${(err as Error).message}`);
    process.exit(1);
  }
  spin.stop("Registry loaded!");

  const targetFolder = resolveAlias(projectRoot, config.aliases.ui);
  await fs.ensureDir(targetFolder);
  const frameworkComponents = filterRegistryByFramework(registry, config.framework);

  spin.start("Copying components...");
  const userUtilsAlias = config.aliases.utils;
  const allDeps = new Set<string>();
  for (const component of frameworkComponents) {
    // Skip hooks — they are created separately in the project hooks directory
    if (component.type === "components:hook") {
      if (component.dependencies) {
        for (const dep of component.dependencies) {
          allDeps.add(dep);
        }
      }
      continue;
    }

    for (const file of component.files) {
      let updatedContent = file.content
        .replace(/from\s+"@\/lib\/utils"/g, `from "${userUtilsAlias}"`)

      const dest = path.join(targetFolder, file.name);
      await fs.outputFile(dest, updatedContent, "utf8");
    }

    if (component.dependencies) {
      for (const dep of component.dependencies) {
        allDeps.add(dep);
      }
    }
  }
  spin.stop(`Components copied to ${path.relative(projectRoot, targetFolder)}`);

  // Create hooks/use-mobile.ts
  spin.start("Creating hooks...");
  const hooksDir = resolveAlias(projectRoot, "@/hooks");
  await fs.ensureDir(hooksDir);
  const hookExt = language === "typescript" ? "ts" : "js";
  const useMobileContent = `import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(\`(max-width: \${MOBILE_BREAKPOINT - 1}px)\`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
`;
  await fs.outputFile(path.join(hooksDir, `use-mobile.${hookExt}`), useMobileContent, "utf8");
  spin.stop(`Created ${path.relative(projectRoot, path.join(hooksDir, `use-mobile.${hookExt}`))}`);

  const installDeps = await p.confirm({
    message: "Install dependencies?",
  });

  if (installDeps && !p.isCancel(installDeps)) {
    const deps = ["clsx", "tailwind-merge", ...allDeps];
    spin.start("Installing dependencies...");
    installDependencies(projectRoot, [...new Set(deps)]);
    spin.stop("Dependencies installed!");
  }

  p.outro(`${color.green("Done!")} Static UI initialized with ${color.bold(themeName)} theme for ${config.framework}.`);
}
