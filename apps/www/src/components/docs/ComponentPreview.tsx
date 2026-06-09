"use client"

import { Component, useState, type ReactNode } from "react"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"
import { Card } from "@/../static-ui/ui/card"
import { CodeBlock } from "@/components/CodeBlock"
import { examples } from "@/lib/examples"

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

interface ComponentPreviewProps {
  slug: string
  source: string | null
}

export function ComponentPreview({ slug, source }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview")

  const LivePreview = dynamic(
    () =>
      (examples[slug as keyof typeof examples]?.() as Promise<Record<string, unknown>>)?.then(
        (mod) => ({
          default: (mod.default ?? Object.values(mod)[0]) as React.ComponentType,
        })
      ) ??
      Promise.resolve({
        default: () => (
          <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
            <p className="text-xs font-medium">Preview not available</p>
          </div>
        ),
      }),
    { loading: () => <LoadingIndicator />, ssr: false }
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-1">
        <div className="flex gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab("preview")}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "preview"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`pb-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === "code"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Code
          </button>
        </div>
      </div>

      <Card className="bg-card min-h-75 flex-row items-center justify-center p-6 relative ">
        {activeTab === "preview" ? (
          <ErrorBoundary
            fallback={
              <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
                <p className="text-xs font-medium text-muted-foreground">Failed to load preview</p>
                <p className="text-[10px] text-muted-foreground">
                  The component may have unresolved dependencies
                </p>
              </div>
            }
          >
            <div className="flex items-center justify-center w-full">
              <LivePreview />
            </div>
          </ErrorBoundary>
        ) : source ? (
          <CodeBlock code={source} language="tsx" showLineNumbers />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
            <p className="text-xs font-medium text-muted-foreground">Source code not available</p>
          </div>
        )}
      </Card>
    </div>
  )
}

function LoadingIndicator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <p className="text-[10px] font-medium tracking-wide">Loading component...</p>
    </div>
  )
}
