import * as p from "@clack/prompts";
import color from "picocolors";
import fs from "fs-extra";
import path from "path";
import { readStaticConfig } from "../utils/index.js";

const THEME_CSS_VARS: Record<string, { label: string; sans: string; mono: string; light: Record<string, string>; dark: Record<string, string> }> = {
  green: {
    label: "Green",
    sans: "Geist, system-ui, sans-serif",
    mono: "Geist Mono, ui-monospace, monospace",
    light: {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.505 0.213 145.6)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)", "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)", "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)", "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.505 0.213 145.6)",
    },
    dark: {
      "--background": "oklch(0.145 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.505 0.213 145.6)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)", "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)", "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.505 0.213 145.6)",
    },
  },
  blue: {
    label: "Blue",
    sans: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
    light: {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.546 0.245 262.881)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)", "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)", "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)", "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.546 0.245 262.881)",
    },
    dark: {
      "--background": "oklch(0.145 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.546 0.245 262.881)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)", "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)", "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.546 0.245 262.881)",
    },
  },
  zinc: {
    label: "Zinc",
    sans: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
    light: {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.205 0.042 265.755)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)", "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)", "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)", "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.205 0.042 265.755)",
    },
    dark: {
      "--background": "oklch(0.145 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.985 0 0)", "--primary-foreground": "oklch(0.205 0.042 265.755)",
      "--secondary": "oklch(0.269 0.015 286.375)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)", "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)", "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.439 0.043 257.281)",
    },
  },
  slate: {
    label: "Slate",
    sans: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
    light: {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.129 0.042 264.695)",
      "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.129 0.042 264.695)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.129 0.042 264.695)",
      "--primary": "oklch(0.129 0.042 264.695)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.968 0.007 264.518)", "--secondary-foreground": "oklch(0.129 0.042 264.695)",
      "--muted": "oklch(0.968 0.007 264.518)", "--muted-foreground": "oklch(0.554 0.046 257.417)",
      "--accent": "oklch(0.968 0.007 264.518)", "--accent-foreground": "oklch(0.129 0.042 264.695)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.929 0.013 255.508)", "--input": "oklch(0.929 0.013 255.508)",
      "--ring": "oklch(0.129 0.042 264.695)",
    },
    dark: {
      "--background": "oklch(0.129 0.042 264.695)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.129 0.042 264.695)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.129 0.042 264.695)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.985 0 0)", "--primary-foreground": "oklch(0.129 0.042 264.695)",
      "--secondary": "oklch(0.279 0.041 260.031)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.279 0.041 260.031)", "--muted-foreground": "oklch(0.704 0.04 256.788)",
      "--accent": "oklch(0.279 0.041 260.031)", "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.279 0.041 260.031)", "--input": "oklch(0.279 0.041 260.031)",
      "--ring": "oklch(0.704 0.04 256.788)",
    },
  },
  gaming: {
    label: "Gaming",
    sans: "Inter, system-ui, sans-serif",
    mono: "Fira Code, ui-monospace, monospace",
    light: {
      "--background": "oklch(0 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.15 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.15 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.72 0.22 150)", "--primary-foreground": "oklch(0 0 0)",
      "--secondary": "oklch(0.25 0 0)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.25 0 0)", "--muted-foreground": "oklch(0.6 0 0)",
      "--accent": "oklch(0.72 0.22 290)", "--accent-foreground": "oklch(0 0 0)",
      "--destructive": "oklch(0.7 0.25 20)", "--destructive-foreground": "oklch(0 0 0)",
      "--border": "oklch(0.3 0 0)", "--input": "oklch(0.3 0 0)",
      "--ring": "oklch(0.72 0.22 150)",
    },
    dark: {
      "--background": "oklch(0 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.15 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.15 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.72 0.22 150)", "--primary-foreground": "oklch(0 0 0)",
      "--secondary": "oklch(0.25 0 0)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.25 0 0)", "--muted-foreground": "oklch(0.6 0 0)",
      "--accent": "oklch(0.72 0.22 290)", "--accent-foreground": "oklch(0 0 0)",
      "--destructive": "oklch(0.7 0.25 20)", "--destructive-foreground": "oklch(0 0 0)",
      "--border": "oklch(0.3 0 0)", "--input": "oklch(0.3 0 0)",
      "--ring": "oklch(0.72 0.22 150)",
    },
  },
  cyberpunk: {
    label: "Cyberpunk",
    sans: "Inter, system-ui, sans-serif",
    mono: "Fira Code, ui-monospace, monospace",
    light: {
      "--background": "oklch(0.1 0.03 280)", "--foreground": "oklch(0.95 0 0)",
      "--card": "oklch(0.15 0.05 280)", "--card-foreground": "oklch(0.95 0 0)",
      "--popover": "oklch(0.15 0.05 280)", "--popover-foreground": "oklch(0.95 0 0)",
      "--primary": "oklch(0.75 0.25 60)", "--primary-foreground": "oklch(0.1 0 0)",
      "--secondary": "oklch(0.25 0.05 280)", "--secondary-foreground": "oklch(0.95 0 0)",
      "--muted": "oklch(0.25 0.05 280)", "--muted-foreground": "oklch(0.6 0.02 280)",
      "--accent": "oklch(0.65 0.3 320)", "--accent-foreground": "oklch(0.95 0 0)",
      "--destructive": "oklch(0.7 0.25 20)", "--destructive-foreground": "oklch(0.95 0 0)",
      "--border": "oklch(0.3 0.08 280)", "--input": "oklch(0.3 0.08 280)",
      "--ring": "oklch(0.75 0.25 60)",
    },
    dark: {
      "--background": "oklch(0.1 0.03 280)", "--foreground": "oklch(0.95 0 0)",
      "--card": "oklch(0.15 0.05 280)", "--card-foreground": "oklch(0.95 0 0)",
      "--popover": "oklch(0.15 0.05 280)", "--popover-foreground": "oklch(0.95 0 0)",
      "--primary": "oklch(0.75 0.25 60)", "--primary-foreground": "oklch(0.1 0 0)",
      "--secondary": "oklch(0.25 0.05 280)", "--secondary-foreground": "oklch(0.95 0 0)",
      "--muted": "oklch(0.25 0.05 280)", "--muted-foreground": "oklch(0.6 0.02 280)",
      "--accent": "oklch(0.65 0.3 320)", "--accent-foreground": "oklch(0.95 0 0)",
      "--destructive": "oklch(0.7 0.25 20)", "--destructive-foreground": "oklch(0.95 0 0)",
      "--border": "oklch(0.3 0.08 280)", "--input": "oklch(0.3 0.08 280)",
      "--ring": "oklch(0.75 0.25 60)",
    },
  },
  modern: {
    label: "Modern",
    sans: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, monospace",
    light: {
      "--background": "oklch(1 0 0)", "--foreground": "oklch(0.145 0 0)",
      "--card": "oklch(1 0 0)", "--card-foreground": "oklch(0.145 0 0)",
      "--popover": "oklch(1 0 0)", "--popover-foreground": "oklch(0.145 0 0)",
      "--primary": "oklch(0.45 0.24 277)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.965 0.001 286.375)", "--secondary-foreground": "oklch(0.205 0.042 265.755)",
      "--muted": "oklch(0.965 0.001 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.965 0.001 286.375)", "--accent-foreground": "oklch(0.205 0.042 265.755)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.922 0.004 286.375)", "--input": "oklch(0.922 0.004 286.375)",
      "--ring": "oklch(0.45 0.24 277)",
    },
    dark: {
      "--background": "oklch(0.145 0 0)", "--foreground": "oklch(0.985 0 0)",
      "--card": "oklch(0.145 0 0)", "--card-foreground": "oklch(0.985 0 0)",
      "--popover": "oklch(0.145 0 0)", "--popover-foreground": "oklch(0.985 0 0)",
      "--primary": "oklch(0.68 0.22 277)", "--primary-foreground": "oklch(0.985 0 0)",
      "--secondary": "oklch(0.269 0.015 286.375)", "--secondary-foreground": "oklch(0.985 0 0)",
      "--muted": "oklch(0.269 0.015 286.375)", "--muted-foreground": "oklch(0.705 0.015 286.067)",
      "--accent": "oklch(0.269 0.015 286.375)", "--accent-foreground": "oklch(0.985 0 0)",
      "--destructive": "oklch(0.577 0.245 27.325)", "--destructive-foreground": "oklch(0.985 0 0)",
      "--border": "oklch(0.269 0.015 286.375)", "--input": "oklch(0.269 0.015 286.375)",
      "--ring": "oklch(0.68 0.22 277)",
    },
  },
};

function cssVarsToString(vars: Record<string, string>): string {
  return Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join("\n");
}

function generateCss(themeName: string): string {
  const t = THEME_CSS_VARS[themeName];
  return `@import "tailwindcss";

/* Static UI - Theme: ${themeName.toUpperCase()} */

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: ${t.sans};
  --font-mono: ${t.mono};

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
${cssVarsToString(t.light)}
}

.dark {
${cssVarsToString(t.dark)}
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}

export async function themeAction(themeName?: string) {
  if (!themeName) {
    p.cancel("Please specify a theme name: green, blue, zinc, slate, gaming, cyberpunk, modern");
    process.exit(1);
  }

  const normalized = themeName.toLowerCase();

  if (!THEME_CSS_VARS[normalized]) {
    p.cancel(`Unknown theme "${themeName}". Available: ${Object.keys(THEME_CSS_VARS).join(", ")}`);
    process.exit(1);
  }

  const projectRoot = process.cwd();
  let config;
  try {
    config = readStaticConfig(projectRoot);
  } catch {
    p.cancel("static.json not found. Run `init` first.");
    process.exit(1);
  }

  const cssPaths = ["src/app/globals.css", "src/styles/globals.css", "app/globals.css", "src/index.css"];
  let cssPath = "";
  for (const cp of cssPaths) {
    const full = path.join(projectRoot, cp);
    if (await fs.pathExists(full)) {
      cssPath = full;
      break;
    }
  }

  if (!cssPath) {
    p.cancel("Could not find global CSS file.");
    process.exit(1);
  }

  const spin = p.spinner();
  spin.start(`Applying ${normalized} theme...`);

  const css = generateCss(normalized);
  await fs.writeFile(cssPath, css, "utf8");

  config.theme = normalized;
  await fs.writeJson(path.join(projectRoot, "static.json"), config, { spaces: 2 });

  spin.stop(`Theme applied: ${color.green(normalized)}`);

  p.outro(`${color.green("✔")} Theme "${normalized}" applied to ${path.relative(projectRoot, cssPath)}`);
}
