import type { ComponentSchema, GeneratedComponent } from "../types.js";

export function generateSvelteComponent(schema: ComponentSchema): GeneratedComponent {
  const variantProps = schema.variants
    ? Object.entries(schema.variants).map(([name, v]) => {
        return `  let ${name}: "${Object.keys(v.values).join('" | "')}" = "${v.default}";`;
      }).join("\n")
    : "";

  const variantClassMap = schema.variants
    ? Object.entries(schema.variants).map(([name, v]) => {
        const mapEntries = Object.entries(v.values).map(([k, cls]) => `      "${k}": "${cls}"`).join(",\n");
        return `  const ${name}Classes: Record<string, string> = {\n${mapEntries},\n  };`;
      }).join("\n\n")
    : "";

  const scriptContent = `<script lang="ts">
  import { cn } from "$lib/utils"

  export let disabled = false;
${variantProps ? "\n" + variantProps : ""}
${variantClassMap ? "\n" + variantClassMap : ""}

  $: classes = cn(
    "${schema.tailwindClasses}",
    ${schema.variants
      ? Object.entries(schema.variants).map(([name]) => `${name}Classes[${name}]`).join(",\n    ")
      : ""}
  );
</script>
`;

  const templateContent = `
<button class={classes} {disabled} on:click>
  <slot />
</button>
`;

  const content = scriptContent + templateContent;

  return {
    framework: "svelte",
    name: schema.name,
    content,
    extension: ".svelte",
    dependencies: schema.dependencies.svelte,
  };
}
