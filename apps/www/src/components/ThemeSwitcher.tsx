"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Card } from "@/../static-ui/ui/card"

interface ThemeVars {
  ":root": Record<string, string>
  dark: Record<string, string>
}

interface ThemeEntry {
  label: string
  color: string
  css: ThemeVars
}

const themes: Record<string, ThemeEntry> = {
  green: {
    label: "Green",
    color: "#22c55e",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.13 0.028 261.69)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.13 0.028 261.69)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.13 0.028 261.69)",
        "--primary": "oklch(0.527 0.154 150.07)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.966 0.022 144.65)",
        "--secondary-foreground": "oklch(0.304 0.062 152.85)",
        "--muted": "oklch(0.966 0.022 144.65)",
        "--muted-foreground": "oklch(0.556 0.034 152.85)",
        "--accent": "oklch(0.966 0.022 144.65)",
        "--accent-foreground": "oklch(0.304 0.062 152.85)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.922 0.018 144.65)",
        "--input": "oklch(0.922 0.018 144.65)",
        "--ring": "oklch(0.527 0.154 150.07)",
      },
      dark: {
        "--background": "oklch(0.13 0.028 261.69)",
        "--foreground": "oklch(0.985 0.002 247.86)",
        "--card": "oklch(0.13 0.028 261.69)",
        "--card-foreground": "oklch(0.985 0.002 247.86)",
        "--popover": "oklch(0.13 0.028 261.69)",
        "--popover-foreground": "oklch(0.985 0.002 247.86)",
        "--primary": "oklch(0.527 0.154 150.07)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.268 0.054 152.85)",
        "--secondary-foreground": "oklch(0.985 0.002 247.86)",
        "--muted": "oklch(0.268 0.054 152.85)",
        "--muted-foreground": "oklch(0.708 0.034 152.85)",
        "--accent": "oklch(0.268 0.054 152.85)",
        "--accent-foreground": "oklch(0.985 0.002 247.86)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.268 0.054 152.85)",
        "--input": "oklch(0.268 0.054 152.85)",
        "--ring": "oklch(0.527 0.154 150.07)",
      },
    },
  },
  blue: {
    label: "Blue",
    color: "#3b82f6",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.13 0.028 261.69)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.13 0.028 261.69)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.13 0.028 261.69)",
        "--primary": "oklch(0.546 0.245 262.88)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.946 0.054 262.88)",
        "--secondary-foreground": "oklch(0.278 0.069 262.88)",
        "--muted": "oklch(0.946 0.054 262.88)",
        "--muted-foreground": "oklch(0.556 0.04 262.88)",
        "--accent": "oklch(0.946 0.054 262.88)",
        "--accent-foreground": "oklch(0.278 0.069 262.88)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.922 0.022 262.88)",
        "--input": "oklch(0.922 0.022 262.88)",
        "--ring": "oklch(0.546 0.245 262.88)",
      },
      dark: {
        "--background": "oklch(0.13 0.028 261.69)",
        "--foreground": "oklch(0.985 0.002 247.86)",
        "--card": "oklch(0.13 0.028 261.69)",
        "--card-foreground": "oklch(0.985 0.002 247.86)",
        "--popover": "oklch(0.13 0.028 261.69)",
        "--popover-foreground": "oklch(0.985 0.002 247.86)",
        "--primary": "oklch(0.546 0.245 262.88)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.278 0.069 262.88)",
        "--secondary-foreground": "oklch(0.985 0.002 247.86)",
        "--muted": "oklch(0.278 0.069 262.88)",
        "--muted-foreground": "oklch(0.708 0.04 262.88)",
        "--accent": "oklch(0.278 0.069 262.88)",
        "--accent-foreground": "oklch(0.985 0.002 247.86)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.278 0.069 262.88)",
        "--input": "oklch(0.278 0.069 262.88)",
        "--ring": "oklch(0.546 0.245 262.88)",
      },
    },
  },
  zinc: {
    label: "Zinc",
    color: "#a1a1aa",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.141 0.005 285.82)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.141 0.005 285.82)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.141 0.005 285.82)",
        "--primary": "oklch(0.141 0.005 285.82)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.967 0.001 286.38)",
        "--secondary-foreground": "oklch(0.21 0.006 285.88)",
        "--muted": "oklch(0.967 0.001 286.38)",
        "--muted-foreground": "oklch(0.552 0.016 285.94)",
        "--accent": "oklch(0.967 0.001 286.38)",
        "--accent-foreground": "oklch(0.21 0.006 285.88)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.92 0.004 286.32)",
        "--input": "oklch(0.92 0.004 286.32)",
        "--ring": "oklch(0.141 0.005 285.82)",
      },
      dark: {
        "--background": "oklch(0.141 0.005 285.82)",
        "--foreground": "oklch(0.985 0 0)",
        "--card": "oklch(0.141 0.005 285.82)",
        "--card-foreground": "oklch(0.985 0 0)",
        "--popover": "oklch(0.141 0.005 285.82)",
        "--popover-foreground": "oklch(0.985 0 0)",
        "--primary": "oklch(1 0 0)",
        "--primary-foreground": "oklch(0.141 0.005 285.82)",
        "--secondary": "oklch(0.274 0.006 286.03)",
        "--secondary-foreground": "oklch(0.985 0 0)",
        "--muted": "oklch(0.274 0.006 286.03)",
        "--muted-foreground": "oklch(0.705 0.015 286.07)",
        "--accent": "oklch(0.274 0.006 286.03)",
        "--accent-foreground": "oklch(0.985 0 0)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.274 0.006 286.03)",
        "--input": "oklch(0.274 0.006 286.03)",
        "--ring": "oklch(0.871 0.006 286.29)",
      },
    },
  },
  slate: {
    label: "Slate",
    color: "#94a3b8",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.129 0.042 264.7)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.129 0.042 264.7)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.129 0.042 264.7)",
        "--primary": "oklch(0.129 0.042 264.7)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.968 0.007 264.5)",
        "--secondary-foreground": "oklch(0.208 0.042 265.76)",
        "--muted": "oklch(0.968 0.007 264.5)",
        "--muted-foreground": "oklch(0.554 0.046 257.42)",
        "--accent": "oklch(0.968 0.007 264.5)",
        "--accent-foreground": "oklch(0.208 0.042 265.76)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.929 0.013 255.51)",
        "--input": "oklch(0.929 0.013 255.51)",
        "--ring": "oklch(0.129 0.042 264.7)",
      },
      dark: {
        "--background": "oklch(0.129 0.042 264.7)",
        "--foreground": "oklch(0.984 0.003 247.86)",
        "--card": "oklch(0.129 0.042 264.7)",
        "--card-foreground": "oklch(0.984 0.003 247.86)",
        "--popover": "oklch(0.129 0.042 264.7)",
        "--popover-foreground": "oklch(0.984 0.003 247.86)",
        "--primary": "oklch(1 0 0)",
        "--primary-foreground": "oklch(0.129 0.042 264.7)",
        "--secondary": "oklch(0.279 0.041 260.03)",
        "--secondary-foreground": "oklch(0.984 0.003 247.86)",
        "--muted": "oklch(0.279 0.041 260.03)",
        "--muted-foreground": "oklch(0.704 0.04 256.79)",
        "--accent": "oklch(0.279 0.041 260.03)",
        "--accent-foreground": "oklch(0.984 0.003 247.86)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.279 0.041 260.03)",
        "--input": "oklch(0.279 0.041 260.03)",
        "--ring": "oklch(0.871 0.006 286.29)",
      },
    },
  },
  gaming: {
    label: "Gaming",
    color: "#ec4899",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.09 0.02 300)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.09 0.02 300)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.09 0.02 300)",
        "--primary": "oklch(0.623 0.265 340.32)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.685 0.235 215.78)",
        "--secondary-foreground": "oklch(1 0 0)",
        "--muted": "oklch(0.92 0.02 300)",
        "--muted-foreground": "oklch(0.5 0.05 300)",
        "--accent": "oklch(0.685 0.235 215.78)",
        "--accent-foreground": "oklch(1 0 0)",
        "--destructive": "oklch(0.637 0.237 25.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.85 0.03 300)",
        "--input": "oklch(0.85 0.03 300)",
        "--ring": "oklch(0.623 0.265 340.32)",
      },
      dark: {
        "--background": "oklch(0.09 0.02 300)",
        "--foreground": "oklch(0.985 0.002 247.86)",
        "--card": "oklch(0.09 0.02 300)",
        "--card-foreground": "oklch(0.985 0.002 247.86)",
        "--popover": "oklch(0.09 0.02 300)",
        "--popover-foreground": "oklch(0.985 0.002 247.86)",
        "--primary": "oklch(0.623 0.265 340.32)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.685 0.235 215.78)",
        "--secondary-foreground": "oklch(1 0 0)",
        "--muted": "oklch(0.2 0.04 300)",
        "--muted-foreground": "oklch(0.6 0.06 300)",
        "--accent": "oklch(0.685 0.235 215.78)",
        "--accent-foreground": "oklch(1 0 0)",
        "--destructive": "oklch(0.637 0.237 25.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.25 0.04 300)",
        "--input": "oklch(0.25 0.04 300)",
        "--ring": "oklch(0.685 0.235 215.78)",
      },
    },
  },
  cyberpunk: {
    label: "Cyberpunk",
    color: "#eab308",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.07 0.04 280)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.07 0.04 280)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.07 0.04 280)",
        "--primary": "oklch(0.905 0.22 116.35)",
        "--primary-foreground": "oklch(0.07 0.04 280)",
        "--secondary": "oklch(0.6 0.27 230)",
        "--secondary-foreground": "oklch(1 0 0)",
        "--muted": "oklch(0.9 0.04 280)",
        "--muted-foreground": "oklch(0.5 0.06 280)",
        "--accent": "oklch(0.6 0.27 230)",
        "--accent-foreground": "oklch(1 0 0)",
        "--destructive": "oklch(0.637 0.237 25.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.8 0.06 280)",
        "--input": "oklch(0.8 0.06 280)",
        "--ring": "oklch(0.905 0.22 116.35)",
      },
      dark: {
        "--background": "oklch(0.07 0.04 280)",
        "--foreground": "oklch(0.985 0.002 247.86)",
        "--card": "oklch(0.07 0.04 280)",
        "--card-foreground": "oklch(0.985 0.002 247.86)",
        "--popover": "oklch(0.07 0.04 280)",
        "--popover-foreground": "oklch(0.985 0.002 247.86)",
        "--primary": "oklch(0.905 0.22 116.35)",
        "--primary-foreground": "oklch(0.07 0.04 280)",
        "--secondary": "oklch(0.6 0.27 230)",
        "--secondary-foreground": "oklch(1 0 0)",
        "--muted": "oklch(0.15 0.06 280)",
        "--muted-foreground": "oklch(0.6 0.08 280)",
        "--accent": "oklch(0.6 0.27 230)",
        "--accent-foreground": "oklch(1 0 0)",
        "--destructive": "oklch(0.637 0.237 25.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.2 0.08 280)",
        "--input": "oklch(0.2 0.08 280)",
        "--ring": "oklch(0.905 0.22 116.35)",
      },
    },
  },
  modern: {
    label: "Modern",
    color: "#14b8a6",
    css: {
      ":root": {
        "--background": "oklch(1 0 0)",
        "--foreground": "oklch(0.13 0.02 240)",
        "--card": "oklch(1 0 0)",
        "--card-foreground": "oklch(0.13 0.02 240)",
        "--popover": "oklch(1 0 0)",
        "--popover-foreground": "oklch(0.13 0.02 240)",
        "--primary": "oklch(0.6 0.18 195)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.96 0.02 195)",
        "--secondary-foreground": "oklch(0.25 0.04 195)",
        "--muted": "oklch(0.96 0.02 195)",
        "--muted-foreground": "oklch(0.55 0.03 195)",
        "--accent": "oklch(0.96 0.02 195)",
        "--accent-foreground": "oklch(0.25 0.04 195)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.92 0.02 195)",
        "--input": "oklch(0.92 0.02 195)",
        "--ring": "oklch(0.6 0.18 195)",
      },
      dark: {
        "--background": "oklch(0.13 0.02 240)",
        "--foreground": "oklch(0.985 0.002 247.86)",
        "--card": "oklch(0.13 0.02 240)",
        "--card-foreground": "oklch(0.985 0.002 247.86)",
        "--popover": "oklch(0.13 0.02 240)",
        "--popover-foreground": "oklch(0.985 0.002 247.86)",
        "--primary": "oklch(0.6 0.18 195)",
        "--primary-foreground": "oklch(1 0 0)",
        "--secondary": "oklch(0.22 0.04 195)",
        "--secondary-foreground": "oklch(0.985 0.002 247.86)",
        "--muted": "oklch(0.22 0.04 195)",
        "--muted-foreground": "oklch(0.65 0.04 195)",
        "--accent": "oklch(0.22 0.04 195)",
        "--accent-foreground": "oklch(0.985 0.002 247.86)",
        "--destructive": "oklch(0.577 0.245 27.33)",
        "--destructive-foreground": "oklch(1 0 0)",
        "--border": "oklch(0.22 0.04 195)",
        "--input": "oklch(0.22 0.04 195)",
        "--ring": "oklch(0.6 0.18 195)",
      },
    },
  },
}

const themeOrder = ["green", "blue", "zinc", "slate", "gaming", "cyberpunk", "modern"]

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState("green")

  const applyTheme = useCallback((key: string) => {
    const theme = themes[key]
    if (!theme) return

    const root = document.documentElement
    const isDark = root.classList.contains("dark")

    const vars = isDark ? theme.css.dark : theme.css[":root"]
    Object.entries(vars).forEach(([prop, val]) => {
      root.style.setProperty(prop, val)
    })

    root.setAttribute("data-theme", key)
    localStorage.setItem("static-ui-theme", key)
    setCurrent(key)
    setOpen(false)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("static-ui-theme")
    if (saved && themes[saved]) {
      applyTheme(saved)
      setCurrent(saved)
    }
  }, [applyTheme])

  useEffect(() => {
    const el = document.documentElement
    const observer = new MutationObserver(() => {
      const saved = localStorage.getItem("static-ui-theme")
      if (!saved) return
      const theme = themes[saved]
      if (!theme) return
      const isDark = el.classList.contains("dark")
      const vars = isDark ? theme.css.dark : theme.css[":root"]
      Object.entries(vars).forEach(([prop, val]) => {
        el.style.setProperty(prop, val)
      })
    })
    observer.observe(el, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
      >
        <span
          className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
          style={{ backgroundColor: themes[current]?.color }}
        />
        <span>{themes[current]?.label}</span>
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <Card className="absolute right-0 top-full mt-1 z-50 w-40 bg-card p-1.5 shadow-xl shadow-black/50">
            {themeOrder.map((key) => {
              const theme = themes[key]
              return (
                <button
                  key={key}
                  onClick={() => applyTheme(key)}
                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs text-foreground hover:bg-accent hover:text-foreground transition-colors cursor-pointer"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="flex-1 text-left">{theme.label}</span>
                  {current === key && (
                    <Check className="h-3 w-3 text-primary" />
                  )}
                </button>
              )
            })}
          </Card>
        </>
      )}
    </div>
  )
}
