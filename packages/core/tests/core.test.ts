import { describe, expect, it } from "vitest"

describe("core utilities", () => {
  it("exports expected modules", async () => {
    const core = await import("../src/index.js")
    expect(core).toBeDefined()
  })
})
