import { existsSync, readFileSync } from "fs"
import { dirname, resolve } from "path"
import { fileURLToPath } from "url"
import { describe, expect, it } from "vitest"

const __dirname = dirname(fileURLToPath(import.meta.url))
const registryPath = resolve(__dirname, "../dist/index.json")

describe("registry validation", () => {
  it("registry dist file exists", () => {
    expect(existsSync(registryPath)).toBe(true)
  })

  it("registry contains valid JSON", () => {
    const content = readFileSync(registryPath, "utf8")
    const registry = JSON.parse(content)
    expect(Array.isArray(registry)).toBe(true)
    expect(registry.length).toBeGreaterThan(0)
  })

  it("all components have required fields", () => {
    const content = readFileSync(registryPath, "utf8")
    const registry = JSON.parse(content)
    for (const item of registry) {
      expect(item.name).toBeDefined()
      expect(item.type).toBeDefined()
      expect(item.files).toBeDefined()
      expect(Array.isArray(item.files)).toBe(true)
    }
  })

  it("no duplicate component names", () => {
    const content = readFileSync(registryPath, "utf8")
    const registry = JSON.parse(content)
    const names = registry.map((i: { name: string }) => i.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })
})
