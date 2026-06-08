"use client"

import { getCommand, type CommandType } from "@/lib/package-manager"
import { usePackageManager } from "@/lib/package-manager-context"

interface DynamicCommandProps {
  type: CommandType
  slug?: string
}

export function DynamicCommand({ type, slug }: DynamicCommandProps) {
  const { packageManager } = usePackageManager()
  return <>{getCommand(type, packageManager, slug)}</>
}
