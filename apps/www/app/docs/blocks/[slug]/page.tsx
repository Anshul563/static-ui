import BlockDetailClient from "./client"

const BLOCKS_SLUGS = [
  "dashboard-01", "dashboard-02", "login-01", "login-02",
  "pricing-01", "pricing-02", "hero-01", "hero-02",
  "feature-01", "feature-02",
]

const BLOCKS_META: Record<string, { name: string; description: string }> = {
  "dashboard-01": { name: "Dashboard 01", description: "Full dashboard layout with sidebar, header, and stats" },
  "dashboard-02": { name: "Dashboard 02", description: "Analytics dashboard variant with charts" },
  "login-01": { name: "Login 01", description: "Clean login form with email and password" },
  "login-02": { name: "Login 02", description: "Login form with social auth providers" },
  "pricing-01": { name: "Pricing 01", description: "Three-tier pricing card layout" },
  "pricing-02": { name: "Pricing 02", description: "Pricing table with feature comparison" },
  "hero-01": { name: "Hero 01", description: "Centered hero section with CTA buttons" },
  "hero-02": { name: "Hero 02", description: "Split hero section with image and text" },
  "feature-01": { name: "Feature 01", description: "Three-column feature grid" },
  "feature-02": { name: "Feature 02", description: "Alternating feature section with icons" },
}

export function generateStaticParams() {
  return BLOCKS_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = BLOCKS_META[slug]
  if (!meta) return {}
  return {
    title: `${meta.name} - Static UI Blocks`,
    description: meta.description,
    openGraph: {
      title: `${meta.name} - Static UI Blocks`,
      description: meta.description,
    },
  }
}

export default function BlockDetailPage() {
  return <BlockDetailClient />
}
