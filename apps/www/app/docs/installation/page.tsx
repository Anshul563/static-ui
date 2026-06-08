"use client"

import { Card } from "@/components/ui/card"
import { CodeBlock } from "@/components/CodeBlock"

export default function DocsInstallationPage() {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">Getting Started</p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Installation</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          How to configure and initialize the Static UI code generation workspace engine inside your project.
        </p>
      </div>

      <hr className="border-border my-2" />

      {/* Step 1 */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-muted border border-border text-[10px] font-bold text-muted-foreground">1</span>
          Run the Initialization Script
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed pl-8">
          Execute our public scoped setup binary framework to prompt your visual layout manager and generate your system canvas configuration profile file.
        </p>
        
        <div className="pl-8 mt-2">
          <CodeBlock code="npx @static-ui/cli init" language="bash" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-3 mt-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-muted border border-border text-[10px] font-bold text-muted-foreground">2</span>
          Verify Config Schema Generation
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed pl-8">
          The initialization loop generates a <code className="text-foreground text-xs font-mono bg-muted px-1 py-0.5 rounded-sm">static.json</code> mapping configuration at the root of your folder structure. This schema handles your exact utility paths and configuration properties.
        </p>
      </div>

      {/* Step 3 */}
      <div className="space-y-3 mt-4">
        <h3 className="text-lg font-semibold text-foreground tracking-tight flex items-center gap-3">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-muted border border-border text-[10px] font-bold text-muted-foreground">3</span>
          Inject Component Primitives
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed pl-8">
          With your configuration sealed in place, use the <code className="text-foreground text-xs font-mono bg-muted px-1 py-0.5 rounded-sm">add</code> command argument to write code files directly into your specified layouts.
        </p>

        <div className="pl-8 mt-2">
          <CodeBlock code="npx @static-ui/cli add button" language="bash" />
        </div>
      </div>
    </div>
  )
}