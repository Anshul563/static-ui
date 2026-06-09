"use client"

import React from "react"
import { ArrowRight, ExternalLink, Terminal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@static-ui/ui"
import { Card } from "@/../static-ui/ui/card"
import { CommandBlock, DynamicCommand } from "@/components/docs/CommandBlock"

export default function DocsIntroductionPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Getting Started</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Introduction</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Beautifully designed component primitives that you can copy, paste, and completely control
          inside your applications.
        </p>
      </div>

      <hr className="border-border my-2" />

      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Static UI is a modern, unstyled component library built on top of{" "}
          <HoverCard>
            <HoverCardTrigger className="inline-flex items-center justify-center text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
              Base UI
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-sm font-medium text-foreground">Build with Base UI</div>
              <div className="text-xs text-muted-foreground mt-1">
                Base UI is a collection of accessible and customizable React components.
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <Image
                  src="/icons/base-ui.svg"
                  alt="Base UI Components"
                  width={20}
                  height={20}
                  className=""
                />
                <Link
                  href="https://baseui.com/"
                  target="_blank"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Learn More <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          and styled with  <HoverCard>
            <HoverCardTrigger className="inline-flex items-center justify-center text-sm font-medium text-foreground cursor-pointer hover:bg-accent transition-colors">
              Tailwind CSS v4
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="text-sm font-medium text-foreground"> Styled with Tailwind CSS</div>
              <div className="text-xs text-muted-foreground mt-1">
                Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.
              </div>
              <div className="flex items-center justify-between gap-2 mt-4">
                <Image
                  src="/icons/tailwind-css.svg"
                  alt="Tailwind CSS"
                  width={20}
                  height={20}
                  className=""
                />
                <Link
                  href="https://tailwindcss.com/"
                  target="_blank"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Learn More <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </HoverCardContent>
          </HoverCard>. Every
          component is designed to be copied, pasted, and fully customized — giving you complete
          control over your codebase.
        </p>

        <p>
          Unlike traditional component libraries that ship as npm dependencies with locked-in
          styles, Static UI gives you the source code directly. You own every line, can modify every
          style, and never worry about breaking changes from upstream updates.
        </p>

        <Card className="bg-card/40 p-6 backdrop-blur-md mt-6">
          <div className="flex items-start gap-4">
            <Terminal className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Quick Start</h3>
              <p className="text-xs text-muted-foreground">
                Initialize Static UI in your project with a single command:
              </p>
              <CommandBlock type="init" />
              <p className="text-xs text-muted-foreground">
                Then add any component:{" "}
                <code className="text-primary">
                  <DynamicCommand type="add" slug="button" />
                </code>
              </p>
            </div>
          </div>
        </Card>
      </div>

      <hr className="border-border my-2" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/installation"
          className="group flex-row items-center justify-between bg-card/40 p-5 transition-all"
        >
          <div>
            <h3 className="text-sm font-medium text-foreground">Installation</h3>
            <p className="mt-1 text-xs text-muted-foreground">Set up Static UI in your project</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
        <Link
          href="/docs/components"
          className="group flex-row items-center justify-between bg-card/40 p-5 transition-all"
        >
          <div>
            <h3 className="text-sm font-medium text-foreground">Components</h3>
            <p className="mt-1 text-xs text-muted-foreground">Browse the component library</p>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
      </div>
    </div>
  )
}
