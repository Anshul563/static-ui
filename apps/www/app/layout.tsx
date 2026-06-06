import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Static UI - Unstyled Component Primitives",
    template: "%s - Static UI",
  },
  description: "Copy, paste, and fully own every line of code. An atomic unstyled component engine for Next.js and Tailwind CSS v4.",
  openGraph: {
    title: "Static UI - Unstyled Component Primitives",
    description: "Copy, paste, and fully own every line of code. An atomic unstyled component engine for Next.js and Tailwind CSS v4.",
    url: "https://static-ui.dev",
    siteName: "Static UI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Static UI - Unstyled Component Primitives",
    description: "Copy, paste, and fully own every line of code.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src={`${process.env.NEXT_PUBLIC_PLAUSIBLE_URL || "https://plausible.io"}/js/script.js`}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
