import type { ComponentSchema } from "../types.js";

export const buttonSchema: ComponentSchema = {
  name: "button",
  description: "A clickable element that triggers an action",
  category: "actions",
  frameworks: ["react", "nextjs", "vue", "nuxt", "solid", "svelte"],
  props: [
    { name: "variant", type: "'default' | 'outline' | 'destructive'", default: "default", description: "Button visual style" },
    { name: "size", type: "'default' | 'sm' | 'lg'", default: "default", description: "Button size" },
    { name: "disabled", type: "boolean", default: "false", description: "Whether the button is disabled" },
    { name: "children", type: "React.ReactNode", description: "Button content", required: true },
  ],
  dependencies: {
    react: ["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge"],
    nextjs: ["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge"],
    vue: ["class-variance-authority", "clsx", "tailwind-merge"],
    nuxt: ["class-variance-authority", "clsx", "tailwind-merge"],
    solid: ["clsx", "tailwind-merge"],
    svelte: ["clsx", "tailwind-merge"],
    astro: [],
    remix: ["@base-ui/react", "class-variance-authority", "clsx", "tailwind-merge"],
  },
  tailwindClasses: "inline-flex items-center justify-center font-medium rounded-md text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[focus-visible]:ring-offset-2",
  slots: [
    { name: "root", description: "The button element itself" },
  ],
  variants: {
    variant: {
      values: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      default: "default",
    },
    size: {
      values: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
      default: "default",
    },
  },
};
