import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://staticui.online"

export const siteConfig = {
  name: "Static UI",
  tagline: "Beautiful React Components powered by Base UI.",
  description:
    "An atomic, unstyled component engine. Copy, paste, and fully customize raw component blueprints directly inside your layout workspaces. No rigid package dependencies.",
  url: siteUrl,
  ogImage: `${siteUrl}/og.png`,
  keywords: [
    "react ui library",
    "base ui",
    "react components",
    "tailwind css",
    "typescript ui",
    "design system",
    "unstyled components",
    "headless ui",
  ],
  author: "Static UI",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Anshul563/static-ui",
}

export function createMetadata(overrides?: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const title = overrides?.title ? `${overrides.title} - ${siteConfig.name}` : siteConfig.name
  const description = overrides?.description || siteConfig.description
  const url = overrides?.path ? `${siteConfig.url}${overrides.path}` : siteConfig.url
  const ogImage = overrides?.ogImage || siteConfig.ogImage

  return {
    title,
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: overrides?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    icons: {
      icon: "/favicon.ico",
    },
  }
}
