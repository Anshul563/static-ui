import React from "react"
import Link from "next/link"
import { Terminal } from "lucide-react"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Templates",
  description: "Full-page templates composed of multiple blocks and components. Copy and paste entire page layouts.",
  path: "/docs/templates",
})

const templates = [
  { name: "Marketing", slug: "marketing", description: "Full marketing landing page with hero, features, and pricing sections", components: 4 },
  { name: "Dashboard", slug: "dashboard", description: "Full dashboard template with sidebar navigation and analytics", components: 4 },
  { name: "Auth", slug: "auth", description: "Authentication pages template with login and register modes", components: 2 },
]

export default function TemplatesListingPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-neutral-500">Templates</p>
        <h1 className="text-4xl font-bold tracking-tight text-white">Templates</h1>
        <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
          Full-page templates composed of multiple blocks and components. Ready to use as starting points for your pages.
        </p>
      </div>

      <hr className="border-neutral-900 my-2" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Link
            key={template.slug}
            href={`/docs/templates/${template.slug}`}
            className="group flex flex-col rounded-xl border border-neutral-900 bg-[#0a0a0a] p-5 hover:border-neutral-700 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#22c55e]/20 to-[#22c55e]/5 border border-[#22c55e]/20 flex items-center justify-center">
                <span className="text-lg font-bold text-[#22c55e]">{template.name.charAt(0)}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-white group-hover:text-[#22c55e] transition-colors">
                  {template.name}
                </span>
                <span className="block text-[10px] text-neutral-600">{template.components} components</span>
              </div>
            </div>
            <span className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2 mb-3">
              {template.description}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-700 mt-auto">
              <Terminal className="h-2.5 w-2.5" />
              npx @static-ui/cli add {template.slug}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
