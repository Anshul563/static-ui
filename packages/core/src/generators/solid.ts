import type { ComponentSchema, GeneratedComponent } from "../types.js";

export function generateSolidComponent(schema: ComponentSchema): GeneratedComponent {
  const variantEntries = schema.variants
    ? Object.entries(schema.variants).map(([name, v]) => {
        const entries = Object.entries(v.values).map(([k, cls]) => `    ${k}: "${cls}"`).join(",\n");
        return `const ${schema.name}${capitalize(name)} = {\n${entries},\n  } as const;`;
      }).join("\n\n")
    : "";

  const variantFn = schema.variants
    ? `function get${capitalize(schema.name)}Classes(props: ${capitalize(schema.name)}Props) {
    const classes = ["${schema.tailwindClasses}"];
    ${Object.entries(schema.variants).map(([name, v]) => {
      return `if (props.${name}) classes.push(${schema.name}${capitalize(name)}[props.${name}]);`;
    }).join("\n    ")}
    return cn(...classes);
  }`
    : "";

  const content = `import type { ComponentProps } from "solid-js"
import { cn } from "@/lib/utils"

${variantEntries}

export interface ${capitalize(schema.name)}Props {
  variant?: "${Object.keys(schema.variants?.variant?.values || {}).join('" | "')}"
  size?: "${Object.keys(schema.variants?.size?.values || {}).join('" | "')}"
  disabled?: boolean
  class?: string
  children?: any
}

${variantFn}

export function ${capitalize(schema.name)}(props: ${capitalize(schema.name)}Props) {
  return (
    <button
      class={get${capitalize(schema.name)}Classes(props)}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
`;

  return {
    framework: "solid",
    name: schema.name,
    content,
    extension: ".tsx",
    dependencies: schema.dependencies.solid,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
