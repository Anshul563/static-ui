import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { createMetadata } from "@/lib/seo"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = createMetadata()

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
