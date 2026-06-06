import ThemeDetailClient from "./client"

const THEMES_SLUGS = ["green", "blue", "zinc", "slate", "gaming", "cyberpunk", "modern"]
const THEMES_META: Record<string, { name: string; description: string }> = {
  green: { name: "Green", description: "Fresh and clean green accent theme" },
  blue: { name: "Blue", description: "Professional blue accent theme" },
  zinc: { name: "Zinc", description: "Neutral and minimal zinc theme" },
  slate: { name: "Slate", description: "Cool gray slate theme" },
  gaming: { name: "Gaming", description: "Vibrant neon gaming theme" },
  cyberpunk: { name: "Cyberpunk", description: "Bold cyberpunk dystopian theme" },
  modern: { name: "Modern", description: "Sleek modern teal theme" },
}

export function generateStaticParams() {
  return THEMES_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = THEMES_META[slug]
  if (!meta) return {}
  return {
    title: `${meta.name} Theme - Static UI`,
    description: meta.description,
    openGraph: {
      title: `${meta.name} Theme - Static UI`,
      description: meta.description,
    },
  }
}

export default function ThemeDetailPage() {
  return <ThemeDetailClient />
}
