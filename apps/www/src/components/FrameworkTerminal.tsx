"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Terminal as TerminalIcon } from "lucide-react"
import { Card } from "@/../static-ui/ui/card"

interface Line {
  text: string
  type: "command" | "success" | "info" | "output"
  delay: number
}

const lines: Line[] = [
  { text: "pnpm dlx static-ui init", type: "command", delay: 0 },
  { text: "✓ package.json detected", type: "success", delay: 600 },
  { text: "✓ Framework detected: Next.js", type: "success", delay: 1200 },
  { text: "✓ TypeScript detected", type: "success", delay: 1800 },
  { text: "✓ Tailwind detected", type: "success", delay: 2400 },
  { text: "✓ Static UI configured", type: "success", delay: 3000 },
  { text: "Ready to build.", type: "output", delay: 3600 },
]

export function FrameworkTerminal() {
  const [visibleLines, setVisibleLines] = useState<number[]>([])
  const [typedChars, setTypedChars] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<"idle" | "typing" | "executing" | "done">("idle")
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const runAnimation = useCallback(() => {
    setVisibleLines([])
    setTypedChars(0)
    setPhase("typing")
  }, [])

  useEffect(() => {
    const timer = setTimeout(runAnimation, 500)
    return () => clearTimeout(timer)
  }, [runAnimation])

  useEffect(() => {
    if (phase === "typing") {
      intervalRef.current = setInterval(() => {
        setTypedChars((prev) => {
          if (prev >= lines[0].text.length) {
            if (intervalRef.current) clearInterval(intervalRef.current)
            setPhase("executing")
            setVisibleLines([0])
            return prev
          }
          return prev + 1
        })
      }, 50)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [phase])

  useEffect(() => {
    if (phase === "executing") {
      lines.slice(1).forEach((line, i) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i + 1])
          if (i === lines.slice(1).length - 1) {
            setTimeout(() => setPhase("done"), 200)
          }
        }, line.delay)
      })
    }
  }, [phase])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (phase === "done") {
      const restartTimeout = setTimeout(() => {
        runAnimation()
      }, 3000)
      return () => clearTimeout(restartTimeout)
    }
  }, [phase, runAnimation])

  return (
    <Card className="shadow-2xl overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-card/50">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 text-[11px] text-muted-foreground font-mono">terminal</span>
      </div>

      <div className="p-4 font-mono text-xs leading-relaxed min-h-50 bg-card/30">
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>Framework Auto Detection</span>
        </div>

        <div className="flex items-center gap-2 mb-1">
          <span className="text-muted-foreground select-none">$</span>
          <span className="text-chart-2">
            {lines[0].text.slice(0, typedChars)}
            {(phase === "typing" || (phase === "idle" && typedChars === 0)) && (
              <span className="inline-block w-2 h-4 bg-chart-2 ml-0.5 align-middle animate-typing-cursor" />
            )}
          </span>
        </div>

        {lines.slice(1).map((line, index) => {
          const lineIndex = index + 1
          return (
            <div
              key={lineIndex}
              className={`mb-1 transition-all duration-300 ${
                visibleLines.includes(lineIndex)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2"
              }`}
            >
              {line.type === "success" && <span className="text-chart-2">{line.text}</span>}
              {line.type === "output" && <span className="text-muted-foreground">{line.text}</span>}
            </div>
          )
        })}

        {phase === "done" && (
          <span
            className={`inline-block w-2 h-4 bg-foreground ml-0.5 align-middle transition-opacity ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </Card>
  )
}
