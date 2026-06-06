import { notFound } from "next/navigation"
import { registryBySlug } from "@/lib/registry"
import { createMetadata } from "@/lib/seo"
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
  return createMetadata({
    title: meta.name,
    description: meta.description,
    path: `/docs/components/${slug}`,
  })
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
