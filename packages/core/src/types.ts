export type FrameworkId =
  | "react"
  | "nextjs"
  | "vue"
  | "nuxt"
  | "solid"
  | "svelte"
  | "astro"
  | "remix";

export interface ComponentSchema {
  name: string;
  description: string;
  category: string;
  frameworks: FrameworkId[];
  props: ComponentProp[];
  dependencies: Record<FrameworkId, string[]>;
  tailwindClasses: string;
  slots: ComponentSlot[];
  variants: Record<string, ComponentVariantDefinition>;
}

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description?: string;
  required?: boolean;
}

export interface ComponentSlot {
  name: string;
  description?: string;
  required?: boolean;
}

export interface ComponentVariantDefinition {
  values: Record<string, string>;
  default: string;
}

export interface GeneratedComponent {
  framework: FrameworkId;
  name: string;
  content: string;
  extension: string;
  dependencies: string[];
}
