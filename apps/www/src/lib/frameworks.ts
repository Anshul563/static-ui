

export type FrameworkStatus = "stable" | "beta" | "planned"

export interface Framework {
  name: string
  slug: string
  status: FrameworkStatus
  autoDetect: boolean
  website: string
  description: string
  icon: string
  gradient: string
  detectionBadge: string
}

export type FrameworkCategory = {
  title: string
  phase: number
  status: FrameworkStatus
  items: Framework[]
}

export const frameworks: Framework[] = [
  {
    name: "Next.js",
    slug: "nextjs",
    status: "stable",
    autoDetect: true,
    website: "https://nextjs.org",
    description: "React framework with server components, routing, and SSR.",
    icon: "./icons/nextdotjs.svg",
    gradient: "from-primary to-emerald-400",
    detectionBadge: "✓ Auto Detect",
  },
  {
    name: "React",
    slug: "react",
    status: "stable",
    autoDetect: true,
    website: "https://react.dev",
    description: "The industry-standard UI library for building interfaces.",
    icon: "./icons/react.svg",
    gradient: "from-primary to-emerald-400",
    detectionBadge: "✓ Auto Detect",
  },
  {
    name: "Vue",
    slug: "vue",
    status: "beta",
    autoDetect: true,
    website: "https://vuejs.org",
    description: "Progressive framework for building SPAs with ease.",
    icon: "./icons/vue.svg",
    gradient: "from-blue-400 to-blue-600",
    detectionBadge: "✓ Auto Detect",
  },
  {
    name: "Nuxt",
    slug: "nuxt",
    status: "beta",
    autoDetect: true,
    website: "https://nuxt.com",
    description: "Hybrid Vue framework with file-based routing and SSR.",
    icon: "./icons/nuxt.svg",
    gradient: "from-blue-400 to-blue-600",
    detectionBadge: "✓ Auto Detect",
  },
  {
    name: "SolidJS",
    slug: "solid",
    status: "planned",
    autoDetect: false,
    website: "https://solidjs.com",
    description: "Reactive UI library with fine-grained updates.",
    icon: "./icons/solidjs.svg",
    gradient: "from-neutral-600 to-neutral-500",
    detectionBadge: "Coming Soon",
  },
  {
    name: "Svelte",
    slug: "svelte",
    status: "planned",
    autoDetect: false,
    website: "https://svelte.dev",
    description: "Compiler-driven UI framework with minimal boilerplate.",
    icon: "./icons/svelte.svg",
    gradient: "from-neutral-600 to-neutral-500",
    detectionBadge: "Coming Soon",
  },
  {
    name: "Astro",
    slug: "astro",
    status: "planned",
    autoDetect: false,
    website: "https://astro.build",
    description: "All-in-one web framework for content-driven sites.",
    icon: "./icons/astro.svg",
    gradient: "from-neutral-600 to-neutral-500",
    detectionBadge: "Coming Soon",
  },
  {
    name: "Remix",
    slug: "remix",
    status: "planned",
    autoDetect: false,
    website: "https://remix.run",
    description: "Full-stack web framework with nested routing.",
    icon: "./icons/remix.svg",
    gradient: "from-neutral-600 to-neutral-500",
    detectionBadge: "Coming Soon",
  },
]

export const frameworkCategories: FrameworkCategory[] = [
  {
    title: "Phase 1",
    phase: 1,
    status: "stable",
    items: frameworks.filter((f) => f.status === "stable"),
  },
  {
    title: "Phase 2",
    phase: 2,
    status: "beta",
    items: frameworks.filter((f) => f.status === "beta"),
  },
  {
    title: "Phase 3",
    phase: 3,
    status: "planned",
    items: frameworks.filter((f) => f.status === "planned" && ["SolidJS", "Svelte"].includes(f.name)),
  },
  {
    title: "Phase 4",
    phase: 4,
    status: "planned",
    items: frameworks.filter((f) => f.status === "planned" && ["Astro", "Remix"].includes(f.name)),
  },
]

export const statusConfig: Record<FrameworkStatus, { label: string; color: string; bgColor: string; borderColor: string }> = {
  stable: {
    label: "Stable",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
  beta: {
    label: "Beta",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  planned: {
    label: "Coming Soon",
    color: "text-neutral-500",
    bgColor: "bg-neutral-500/10",
    borderColor: "border-neutral-500/20",
  },
}
