"use client"

import React, { useState } from "react"
// 1. Importing your TRUE production component from your local code workspace folder
import { Button } from "@static-ui/ui"
import { CodeBlock } from "@/components/CodeBlock"
import { CommandBlock } from "@/components/docs/CommandBlock"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card } from "@/components/ui/card"

export default function ButtonDocsPage() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  const buttonCodeString = `import { Button } from "@/components/static-ui/button"

export default function Demo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Primary Accent</Button>
      <Button variant="outline">Outline Border</Button>
    </div>
  )
}`

  return (
    <div className="flex flex-col gap-8 py-6">
      {/* Header Info Banner */}
      <div className="flex flex-col gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Button</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Button</h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          An interactive anchor element used to trigger actions, handle form submission states, or
          fire navigation links.
        </p>
      </div>

      {/* Interactive Showcase Frame */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-1">
          <div className="flex gap-4 text-xs font-medium">
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "preview" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "code" ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* View Canvas Box */}
        <Card className="bg-background min-h-65 flex-row items-center justify-center p-6 relative bg-[radial-gradient(#161616_1px,transparent_1px)] bg-size-[16px_16px]">
          {activeTab === "preview" ? (
            <div className="animate-fadeIn gap-4 flex">
              {/* RENDERING THE TRUE COMPONENT DIRECTLY */}
              <Button variant={"default"}>Primary </Button>
              <Button variant={"outline"}>Outline</Button>
              <Button variant={"destructive"}>Destructive</Button>
            </div>
          ) : (
            <CodeBlock code={buttonCodeString} language="tsx" showLineNumbers />
          )}
        </Card>
      </div>

      {/* Terminal Command Utility Box */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Installation</h3>
        <p className="text-xs text-muted-foreground">
          Inject this raw primitive directly into your code layers via the CLI bundle:
        </p>

        <CommandBlock type="add" slug="button" />
      </div>
    </div>
  )
}
