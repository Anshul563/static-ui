"use client"
import { Progress } from "@static-ui/ui"
import { useState, useEffect } from "react"
export default function ProgressDemo() {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setValue(v => Math.min(v + 10, 100)), 500)
    return () => clearInterval(timer)
  }, [])
  return <Progress value={value} className="w-60" />
}
