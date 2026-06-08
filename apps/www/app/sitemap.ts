import type { MetadataRoute } from "next"
import { registryBySlug } from "@/lib/registry"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staticui.online"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1 },
    {
      url: `${siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/docs/installation`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/cli`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/docs/components`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/docs/blocks`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/templates`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/themes`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/docs/showcase`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  const componentRoutes = Object.keys(registryBySlug).map((slug) => ({
    url: `${siteUrl}/docs/components/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  return [...staticRoutes, ...componentRoutes]
}
