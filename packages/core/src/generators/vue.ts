import type { ComponentSchema, GeneratedComponent } from "../types.js";

export function generateVueComponent(schema: ComponentSchema): GeneratedComponent {
  const variantProps = schema.variants
    ? Object.entries(schema.variants).map(([name, v]) => `    ${name}: {
      type: String,
      default: "${v.default}",
      validator: (value: string) => ["${Object.keys(v.values).join('", "')}"].includes(value),
    },`).join("\n")
    : "";

  const variantClasses = schema.variants
    ? Object.entries(schema.variants).map(([name, v]) => {
        const entries = Object.entries(v.values).map(([k, cls]) => `      case "${k}": classes.push("${cls}"); break;`).join("\n");
        return `  const ${name}Classes = computed(() => {
    const classes: string[] = [];
    switch (props.${name}) {
${entries}
    }
    return classes;
  });`;
      }).join("\n\n")
    : "";

  const mergedClasses = schema.variants
    ? `const mergedClasses = computed(() => {
    return cn("${schema.tailwindClasses}", ...${Object.keys(schema.variants).map(v => `${v}Classes.value`).join(", ")});
  });`
    : `const mergedClasses = "${schema.tailwindClasses}";`;

  const content = `<template>
  <button
    :class="mergedClasses"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  variant?: "${Object.keys(schema.variants?.variant?.values || {}).join('" | "')}"
  size?: "${Object.keys(schema.variants?.size?.values || {}).join('" | "')}"
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: "${schema.variants?.variant?.default || "default"}",
  size: "${schema.variants?.size?.default || "default"}",
  disabled: false,
})

${variantClasses}

${mergedClasses}
</script>
`;

  return {
    framework: "vue",
    name: schema.name,
    content,
    extension: ".vue",
    dependencies: schema.dependencies.vue,
  };
}
