"use client"

import React from "react"
import { Globe, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/../static-ui/ui/card"

export interface ProjectData {
  title: string
  description: string
  gradient: string
  tags: string[]
  websiteUrl?: string
  githubUrl?: string
  author?: string
  screenshot?: string
}

export function ProjectCard({
  project,
  isPlaceholder = false,
}: {
  project: ProjectData
  isPlaceholder?: boolean
}) {
  return (
    <Card className="group transition-all">
      <div
        className={`h-40 w-full bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:16px_16px]" />
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="relative z-10 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/60 backdrop-blur-sm">
            <Sparkles className="mr-1.5 inline-block h-3 w-3 text-white/40" />
            {isPlaceholder ? "Coming Soon" : "Preview"}
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground truncate">{project.title}</h3>
            {project.author && (
              <p className="text-[10px] text-muted-foreground mt-0.5">by {project.author}</p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            )}
            {project.websiteUrl && (
              <Link
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  )
}
