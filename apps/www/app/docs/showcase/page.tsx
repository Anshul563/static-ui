import React from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { createMetadata } from "@/lib/seo"
import { Card } from "@/../static-ui/ui/card"

export const metadata = createMetadata({
  title: "Showcase",
  description: "Projects and applications built with Static UI. Get inspired and share your own.",
  path: "/docs/showcase",
})
import { ProjectCard, type ProjectData } from "@/components/ProjectCard"

const projects: ProjectData[] = [
  {
    title: "SaaS Dashboard",
    description: "A full-featured analytics dashboard with real-time data visualization, user management, and billing integration built entirely with Static UI primitives.",
    gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/20",
    tags: ["Next.js", "Dashboard", "Analytics"],
  },
  {
    title: "E-Commerce Storefront",
    description: "Modern product catalog with dynamic filtering, cart management, and a streamlined checkout flow using Static UI's input and dialog components.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
    tags: ["Next.js", "E-Commerce", "Storefront"],
  },
  {
    title: "Marketing Landing Page",
    description: "Conversion-optimized landing page with animated hero sections, testimonial carousels, and interactive pricing tables.",
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    tags: ["Marketing", "Landing", "Animations"],
  },
  {
    title: "Developer Portfolio",
    description: "Personal portfolio site showcasing projects with a clean, minimal design. Features a dark theme toggle and smooth page transitions.",
    gradient: "from-pink-500/20 via-purple-500/10 to-fuchsia-500/20",
    tags: ["Portfolio", "Minimal", "Dark Theme"],
  },
  {
    title: "Project Management Tool",
    description: "Kanban-style project management app with drag-and-drop columns, task assignment, and real-time collaboration features.",
    gradient: "from-cyan-500/20 via-sky-500/10 to-blue-500/20",
    tags: ["Productivity", "Kanban", "Collab"],
  },
  {
    title: "Auth & Admin Panel",
    description: "Complete authentication system with role-based access control, user administration, and audit logging interfaces.",
    gradient: "from-lime-500/20 via-green-500/10 to-emerald-500/20",
    tags: ["Auth", "Admin", "RBAC"],
  },
]

export default function DocsShowcasePage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Community</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Showcase</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Projects and applications built with Static UI. Submit your own to be featured here.
        </p>
      </div>

      <hr className="border-border my-2" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} isPlaceholder />
        ))}
      </div>

      <Card className="mt-8 bg-card p-6 text-center space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Built something with Static UI?
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
          We would love to feature your project. Submit a pull request to our showcase directory
          or share your work with the community.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="https://github.com/Anshul563/static-ui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-4 text-xs font-medium text-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            Submit on GitHub
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </Link>
        </div>
      </Card>
    </div>
  )
}
