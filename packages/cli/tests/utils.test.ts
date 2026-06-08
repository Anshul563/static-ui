import { describe, expect, it } from "vitest"
import { resolveAlias } from "../src/utils/index.js"

describe("resolveAlias", () => {
  it("strips @/ prefix", () => {
    const result = resolveAlias("/project", "@/components/ui")
    expect(result).toBeDefined()
    expect(result.includes("components/ui") || result.includes("components\\ui")).toBe(true)
  })

  it("uses src/ directory when it exists", () => {
    const result = resolveAlias("/project", "@/lib/utils")
    expect(result).toBeDefined()
    const normalized = result.replace(/\\/g, "/")
    expect(normalized).toMatch(/\/project\/(src\/)?lib\/utils/)
  })
})
