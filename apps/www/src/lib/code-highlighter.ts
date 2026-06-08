import { createCssVariablesTheme } from "shiki/core"

const cssTheme = createCssVariablesTheme({
  name: "static-ui",
  variablePrefix: "--shiki-",
})

let highlighter: any = null

async function getHighlighter() {
  if (!highlighter) {
    const { createHighlighter } = await import("shiki")
    const { bundledLanguages } = await import("shiki")
    
    highlighter = await createHighlighter({
      themes: [cssTheme],
      langs: [
        bundledLanguages.tsx,
        bundledLanguages.typescript,
        bundledLanguages.javascript,
        bundledLanguages.jsx,
        bundledLanguages.css,
        bundledLanguages.bash,
        bundledLanguages.json,
        bundledLanguages.html,
        bundledLanguages.markdown,
        bundledLanguages.yaml,
      ],
    })
  }
  return highlighter
}

export async function highlightToHtml(code: string, lang: string): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, { lang, theme: "static-ui" })
}

function parseHighlightLines(input: string | undefined): Set<number> {
  if (!input) return new Set()
  const lines = new Set<number>()
  input.split(",").forEach((part) => {
    const range = part.trim().split("-").map(Number)
    if (range.length === 1 && !isNaN(range[0])) {
      lines.add(range[0])
    } else if (range.length === 2 && !isNaN(range[0]) && !isNaN(range[1])) {
      for (let i = range[0]; i <= range[1]; i++) lines.add(i)
    }
  })
  return lines
}

export interface CodeBlockOptions {
  code: string
  language: string
  highlightLines?: string
  showLineNumbers?: boolean
}

export async function renderCodeBlock(options: CodeBlockOptions): Promise<string> {
  const { code, language, highlightLines, showLineNumbers } = options
  const html = await highlightToHtml(code, language)
  const highlightSet = parseHighlightLines(highlightLines)

  let lineIndex = 0
  const modified = html.replace(/<span class="line">/g, () => {
    lineIndex++
    const parts: string[] = []
    if (showLineNumbers) {
      parts.push(`<span class="line-number">${String(lineIndex).padStart(3, " ")}</span>`)
    }
    const hlClass = highlightSet.has(lineIndex) ? " line highlighted" : ""
    parts.push(`<span class="line${hlClass}">`)
    return parts.join("")
  })

  return modified
}
