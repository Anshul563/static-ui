"use client"

import { useEffect, useState, useCallback } from "react"
import { Terminal as TerminalIcon } from "lucide-react"

interface Line {
  text: string
  type: "command" | "success" | "info" | "output"
  delay: number
}

const lines: Line[] = [
  { text: "npx @static-ui/cli init", type: "command", delay: 0 },
  { text: "✓ package.json detected", type: "success", delay: 600 },
  { text: "✓ Framework detected: Next.js", type: "success", delay: 1200 },
  { text: "✓ TypeScript detected", type: "success", delay: 1800 },
  { text: "✓ Tailwind detected", type: "success", delay: 2400 },
  { text: "✓ Static UI configured", type: "success", delay: 3000 },
  { text: "Ready to build.", type: "output", delay: 3600 },
]

const totalDuration = 4200

export function FrameworkTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [showCursor, setShowCursor] = useState(true)

  const runAnimation = useCallback(() => {
    setVisibleLines([])
    lines.forEach((line) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, lines.indexOf(line)])
      }, line.delay)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(runAnimation, 500)
    return () => clearTimeout(timer)
  }, [runAnimation])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const restartInterval = setInterval(() => {
      runAnimation()
    }, totalDuration + 3000)
    return () => clearInterval(restartInterval)
  }, [runAnimation])

  const getLineContent = (line: Line, index: number) => {
    if (line.type === "command") {
      return (
        <span className="flex items-center gap-2">
          <span className="text-neutral-400 select-none">$</span>
          <span className="text-white">{line.text}</span>
        </span>
      )
    }
    if (line.type === "success") {
      return <span className="text-[#22c55e]">{line.text}</span>
    }
    return <span className="text-neutral-400">{line.text}</span>
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-[#050505] overflow-hidden shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-neutral-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/80" />
        <span className="ml-2 text-[11px] text-neutral-600 font-mono">terminal</span>
      </div>

      <div className="p-4 font-mono text-xs leading-relaxed min-h-[200px]">
        <div className="flex items-center gap-2 text-neutral-500 mb-3">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>Framework Auto Detection</span>
        </div>

        {lines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 transition-opacity duration-200 ${
              visibleLines.includes(index) ? "opacity-100" : "opacity-0"
            }`}
          >
            {getLineContent(line, index)}
          </div>
        ))}

        {visibleLines.length >= lines.length && (
          <span
            className={`inline-block w-2 h-4 bg-neutral-300 ml-0.5 transition-opacity ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  )
}
