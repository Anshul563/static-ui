"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import { renderCodeBlock, type CodeBlockOptions } from "@/lib/code-highlighter"

const languageLabels: Record<string, string> = {
  tsx: "TSX",
  typescript: "TypeScript",
  javascript: "JavaScript",
  jsx: "JSX",
  css: "CSS",
  json: "JSON",
  bash: "Bash",
  html: "HTML",
  markdown: "Markdown",
  yaml: "YAML",
}

export interface CodeBlockProps extends CodeBlockOptions {
  filename?: string
  copyable?: boolean
}

export function CodeBlock({
  code,
  language,
  filename,
  highlightLines,
  showLineNumbers,
  copyable = true,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    renderCodeBlock({ code, language, highlightLines, showLineNumbers }).then(
      (result) => {
        if (!cancelled) setHtml(result)
      },
    )
    return () => {
      cancelled = true
    }
  }, [code, language, highlightLines, showLineNumbers])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative overflow-hidden rounded-xl ring-1 ring-foreground/10" style={{ backgroundColor: "var(--shiki-background, #0d1117)" }}>
      {(filename || copyable) && (
        <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
          {filename ? (
            <span className="truncate text-xs text-muted-foreground font-mono">
              {filename}
            </span>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center rounded-md border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {languageLabels[language] || language}
            </span>
            {copyable && (
              <button
                onClick={handleCopy}
                aria-label={copied ? "Copied" : "Copy code"}
                className="flex items-center gap-1 rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <span className="hidden sm:inline text-primary">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
      <div
        className="overflow-x-auto [scrollbar-width:thin]"
        role="region"
        aria-label={`${languageLabels[language] || language} code block`}
      >
        {html ? (
          <div
            className="shiki-code-wrapper"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="shiki !bg-transparent p-4 font-mono text-sm leading-relaxed text-foreground whitespace-pre overflow-x-auto">{code}</pre>
        )}
      </div>
    </div>
  )
}
