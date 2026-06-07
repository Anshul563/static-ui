import type { ComponentSchema, GeneratedComponent } from "../types.js";

export function generateReactComponent(schema: ComponentSchema): GeneratedComponent {
  const variantsCode = schema.variants ? Object.entries(schema.variants).reduce((acc, [name, variant]) => {
    const entries = Object.entries(variant.values).map(([k, v]) => `        ${k}: "${v}",`).join("\n");
    return `${acc}
    ${name}: {
${entries}
    },
    defaultVariants: {
      ${name}: "${variant.default}",
    },`;
  }, `const ${schema.name}Variants = cva("${schema.tailwindClasses}", {`) + "\n  });" : "";

  const content = `import * as React from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

${variantsCode}

export interface ${capitalize(schema.name)}Props
  extends React.ComponentPropsWithoutRef<typeof BaseButton>,
    VariantProps<typeof ${schema.name}Variants> {}

const ${capitalize(schema.name)} = React.forwardRef<HTMLButtonElement, ${capitalize(schema.name)}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(${schema.name}Variants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

${capitalize(schema.name)}.displayName = "${capitalize(schema.name)}"

export { ${capitalize(schema.name)}, ${schema.name}Variants }
`;

  return {
    framework: "react",
    name: schema.name,
    content,
    extension: ".tsx",
    dependencies: schema.dependencies.react,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
