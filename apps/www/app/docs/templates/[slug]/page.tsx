import TemplateDetailClient from "./client"

const TEMPLATES_SLUGS = ["marketing", "dashboard", "auth"]
const TEMPLATES_META: Record<string, { name: string; description: string }> = {
  marketing: { name: "Marketing", description: "Full marketing landing page with hero, features, and pricing sections" },
  dashboard: { name: "Dashboard", description: "Full dashboard template with sidebar navigation and analytics" },
  auth: { name: "Auth", description: "Authentication pages template with login and register modes" },
}

export function generateStaticParams() {
  return TEMPLATES_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const meta = TEMPLATES_META[slug]
  if (!meta) return {}
  return {
    title: `${meta.name} - Static UI Templates`,
    description: meta.description,
    openGraph: {
      title: `${meta.name} - Static UI Templates`,
      description: meta.description,
    },
  }
}

export default function TemplateDetailPage() {
  return <TemplateDetailClient />
}
