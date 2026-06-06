import { notFound } from "next/navigation"
import { registryBySlug } from "@/lib/registry"
import ComponentDetailClient from "./client"

export function generateStaticParams() {
  return Object.keys(registryBySlug).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = registryBySlug[slug]
  if (!meta) return {}
  return {
    title: `${meta.name} - Static UI`,
    description: meta.description,
  }
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const meta = registryBySlug[slug]
  if (!meta) notFound()
  return <ComponentDetailClient slug={slug} />
}
