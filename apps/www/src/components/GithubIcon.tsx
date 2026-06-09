"use client"

import { useTheme } from "next-themes"
import Image from "next/image"

interface GithubIconProps {
  size?: number
  className?: string
}

export function GithubIcon({ size = 20, className }: GithubIconProps) {
  const { resolvedTheme } = useTheme()
  const src = resolvedTheme === "dark" ? "/icons/github-white.svg" : "/icons/github.svg"

  return (
    <Image
      src={src}
      alt="GitHub"
      width={size}
      height={size}
      className={className}
    />
  )
}
